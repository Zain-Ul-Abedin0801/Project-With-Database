import {cart , addToCart} from './Cart.js';
import {fantasybooks} from './Books.js';


let booksHTML ='';

fantasybooks.forEach((book) => {   

    
    booksHTML += 

    `
    <div class="book-info">
                <img class="book-image" src="${book.image}" alt="Book Image">
                <div class="info">
                    <p class="title">${book.title}</p>
                    <p style="margin: 0;">
                        <span>by </span><span class="author"><strong>${book.author}</strong></span>
                    </p>
                    <p class="stats">
                        ${book.stats}
                    </p>
                    <p class="price">
                        $ ${book.price}
                    </p>
                  <span class="added" id="addedMessage">Added to Cart &#10004; </span>
                    <button class="cart-button js-cart-button"
                    data-book-id="${book.id}" id="addToCartButton">
                        Add to Cart
                    </button>
                      

                </div>
            </div>

    `;



    }
);

document.querySelector('.js-rack').innerHTML = booksHTML;


document.querySelectorAll('.js-cart-button')
.forEach((button) => {
button.addEventListener('click' , ()=> {
    const bookId = button.dataset.bookId;

    addToCart(bookId, button) ;
    


});
});

