const Fastify = require('fastify');
const mysql = require('mysql2');

const fastify = Fastify({ logger: true });

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'bookstore'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});

// Add to cart
fastify.post('/cart', async (request, reply) => {
    const { userId, bookId } = request.body;

    db.query(
        'SELECT * FROM Cart WHERE userId = ? AND bookId = ?',
        [userId, bookId],
        (err, results) => {
            if (err) return reply.code(500).send(err);

            if (results.length > 0) {
                db.query(
                    'UPDATE Cart SET quantity = quantity + 1 WHERE userId = ? AND bookId = ?',
                    [userId, bookId],
                    (err) => {
                        if (err) return reply.code(500).send(err);
                        reply.send({ message: 'Book quantity updated' });
                    }
                );
            } else {
                db.query(
                    'INSERT INTO Cart (userId, bookId, quantity) VALUES (?, ?, 1)',
                    [userId, bookId],
                    (err) => {
                        if (err) return reply.code(500).send(err);
                        reply.send({ message: 'Book added to cart' });
                    }
                );
            }
        }
    );
});

// Remove from cart
fastify.delete('/cart/:userId/:bookId', async (request, reply) => {
    const { userId, bookId } = request.params;

    db.query(
        'DELETE FROM Cart WHERE userId = ? AND bookId = ?',
        [userId, bookId],
        (err) => {
            if (err) return reply.code(500).send(err);
            reply.send({ message: 'Book removed from cart' });
        }
    );
});

// Fetch cart
fastify.get('/cart/:userId', async (request, reply) => {
    const { userId } = request.params;

    db.query(
        'SELECT * FROM Cart WHERE userId = ?',
        [userId],
        (err, results) => {
            if (err) return reply.code(500).send(err);
            reply.send(results);
        }
    );
});

// Start server
fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info(`Server running at ${address}`);
});
