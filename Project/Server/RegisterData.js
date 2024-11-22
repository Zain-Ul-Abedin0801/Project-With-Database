const Fastify = require('fastify');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const fastify = Fastify({ logger: true });

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'enchanted'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});

// Registration Endpoint
fastify.post('/register', async (request, reply) => {
    const { firstName, lastName, username, password, dateOfBirth, country, gender } = request.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    db.query(
        'INSERT INTO Users (firstName, lastName, username, password, dateOfBirth, country, gender) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [firstName, lastName, username, hashedPassword, dateOfBirth, country, gender],
        (err) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return reply.code(400).send({ message: 'Username already exists' });
                }
                return reply.code(500).send(err);
            }
            reply.send({ message: 'User registered successfully' });
        }
    );
});

// Login Endpoint
fastify.post('/login', async (request, reply) => {
    const { username, password } = request.body;

    // Check if user exists
    db.query(
        'SELECT * FROM Users WHERE username = ?',
        [username],
        async (err, results) => {
            if (err) return reply.code(500).send(err);

            if (results.length === 0) {
                return reply.code(400).send({ message: 'Invalid username or password' });
            }

            const user = results[0];

            // Compare passwords
            const isValidPassword = await bcrypt.compare(password, user.password);

            if (!isValidPassword) {
                return reply.code(400).send({ message: 'Invalid username or password' });
            }

            reply.send({ message: 'Login successful', userId: user.id });
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
