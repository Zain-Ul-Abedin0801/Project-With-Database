

import {cart , removefromcart} from './Cart.js';
import {books} from './Books.js';



const today = dayjs();
const sevenday = today.add(7, 'days');
const sevendaydelivery = sevenday.format('dddd , MMMM D');
const threeday = today.add(3, 'days');
const threedaydelivery = threeday.format('dddd , MMMM D');
const oneday = today.add(1, 'days');
const onedaydelivery = oneday.format('dddd , MMMM D');


let cartsummaryHTML ='';
cart.forEach((cartitem)=>{

    const bookId = cartitem.bookId;

    let matchingbook;

    books.forEach((book) =>{

        if(book.id === Number(bookId))
        {
            matchingbook=book;

        }
    });

    cartsummaryHTML +=

    
        `
                 <div class="cart-item-container 
                 js-cart-item-container-${matchingbook.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingbook.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingbook.title}
                </div>
                <div class="product-price">
                 ${matchingbook.price}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartitem.quantity}</span>
                  </span>
                   <span class="update-quantity-link">
                    Update
                  </span>
                  <span class="delete-quantity-link 
                  js-delete-book" data-book-id="${matchingbook.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingbook.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${sevendaydelivery}
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingbook.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${threedaydelivery}
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingbook.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${onedaydelivery}
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;

    }
);

document.querySelector('.js-cart-summary').innerHTML = cartsummaryHTML;
document.querySelectorAll('.js-delete-book')
.forEach((link) =>
{
  link.addEventListener('click' , () =>
  {

    const bookId=link.dataset.bookId;
    removefromcart(bookId);
   // console.log(cart);

   const container = document.querySelector(
    `.js-cart-item-container-${bookId}`

  );
  container.remove();


  });

});
