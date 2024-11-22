// Utility function to fetch cart data from the server
async function fetchCartFromServer(userId) {
    const response = await fetch(`/cart/${userId}`);
    return await response.json();
}

// Utility function to send a POST request to the server to add a book to the cart
async function addBookToServer(userId, bookId) {
    await fetch('/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, bookId })
    });
}

// Utility function to send a DELETE request to the server to remove a book from the cart
async function removeBookFromServer(userId, bookId) {
    await fetch(`/cart/${userId}/${bookId}`, {
        method: 'DELETE'
    });
}

// Cart object to hold in-memory data
export let cart = [];

// Function to fetch the cart and synchronize with the UI
export async function loadCart(userId) {
    cart = await fetchCartFromServer(userId);

    let count = 0;
    cart.forEach(book => {
        count += book.quantity;
    });

    document.querySelector('.js-item-count').innerHTML = count;
}

// Function to add a book to the cart
export async function addToCart(userId, bookId, button) {
    await addBookToServer(userId, bookId);
    cart = await fetchCartFromServer(userId);

    // Update the UI
    let count = 0;
    cart.forEach(book => {
        count += book.quantity;
    });

    document.querySelector('.js-item-count').innerHTML = count;

    // Show confirmation message
    const addedMessage = button.previousElementSibling;
    addedMessage.style.opacity = 1;

    setTimeout(() => {
        addedMessage.style.opacity = 0;
    }, 1000);
}

// Function to remove a book from the cart
export async function removeFromCart(userId, bookId) {
    await removeBookFromServer(userId, bookId);
    cart = await fetchCartFromServer(userId);

    console.log("Updated cart after removal:", cart);
}
