let image = document.getElementById('image')
let teddyName = document.getElementById('teddyName')
let teddyPrice = document.getElementById('teddyPrice')
let teddyColor = document.getElementById('teddyColors')
let teddyQunatity = document.getElementById('teddyQuantity')
let product

//item number in cart
const updateCart = () => {
    let quantity = JSON.parse(localStorage.getItem('quantity'))
    let itemNumberInCart = document.getElementById('itemNumberInCart')
    itemNumberInCart.innerHTML = quantity

    let productsInCart = JSON.parse(localStorage.getItem('productsInCart'))
}

updateCart()

let quantity = JSON.parse(localStorage.getItem('quantity'))
let itemNumberInCart = document.getElementById('itemNumberInCart')
itemNumberInCart.innerHTML = quantity

let productsInCart = JSON.parse(localStorage.getItem('productsInCart'))
console.log(productsInCart)
console.log(quantity)


//delete product from cart
function deleteProduct(_id, qty) {
    let cartItems = localStorage.getItem('productsInCart')

    cartItems = JSON.parse(cartItems)
    let index = cartItems.findIndex(product => product.id == _id)
    qty = cartItems[index].productQty
    let quantity = localStorage.getItem('quantity')
    localStorage.setItem('quantity', quantity - qty)
    if (index != -1) {

        cartItems.splice(index, 1)
    }
    if (cartItems.length == 0) {
        cartItems = []
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems))

    displayCart()
        //item number in cart
    let quantityCart = JSON.parse(localStorage.getItem('quantity'))
    let itemNumberInCart = document.getElementById('itemNumberInCart')
    itemNumberInCart.innerHTML = quantityCart
}


//display products in cart
function displayCart() {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems);
    let productContainer = document.getElementById('products')
    if (cartItems && productContainer) {
        let output = ''
        let total = 0
        cartItems.forEach(function(teddy) {
            output +=
                `<div class="row mb-4 cartRow px-5" id="products">
                <div class="col-md-5 col-lg-3 col-xl-3">
                    <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                        <img class="img-fluid w-100" src="${teddy.imageUrl}" alt="Teddy">

                    </div>
                </div>
                <div class="col-md-7 col-lg-9 col-xl-9">
                    <div>
                        <div class="d-flex justify-content-between">
                            <div>
                                <h5 id="teddyName">${teddy.name}</h5>
                                

                            </div>
                            <div>
                                <div class="def-number-input number-input safari_only mb-0 w-100" id="teddyQuantity">

                                <i class="far fa-minus-square m-2" onclick="decreaseNumber('${teddy.id}')"></i> ${teddy.productQty}<i class="far fa-plus-square m-2" onclick="increaseNumber('${teddy.id}')"></i>

                                </div>

                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <button type="button" class="card-link-secondary small text-uppercase mr-3 letter-green removeItem" onclick="deleteProduct('${teddy.id}', 1)"><i class="fas fa-trash-alt mr-1"></i> Remove item </button>
                            </div>
                            <p class="mb-0" id="teddyPrice">$${teddy.price / 100}.00<span><strong class="itemPrice"></strong></span></p class="mb-0">
                        </div>
                    </div>
                </div>
            </div>

            `;
            total += teddy.price / 100 * teddy.productQty



        });
        productContainer.innerHTML = output

        let displayTotal = document.getElementById('total')
        displayTotal.innerHTML = `${total}.00`;

    }

}
displayCart()
updateCart()

//increase product number
function increaseNumber(id) {
    let productList = JSON.parse(localStorage.getItem('productsInCart'))
    let productId = productList.findIndex(o => o.id == id)
    let teddyNumber = localStorage.getItem('quantity')
    teddyNumber = parseInt(teddyNumber)
    if (productId != -1) {
        productList[productId].productQty += 1
        localStorage.setItem('quantity', teddyNumber + 1)
    }
    localStorage.setItem('productsInCart', JSON.stringify(productList))
    displayCart()
    updateCart()

}

//decrease product number
function decreaseNumber(id) {
    let productList = JSON.parse(localStorage.getItem('productsInCart'))
    let productId = productList.findIndex(o => o.id == id)
    let teddyNumber = localStorage.getItem('quantity')
    teddyNumber = parseInt(teddyNumber)
    if (productId != -1) {
        if (productList[productId].productQty == 1) {
            localStorage.setItem('quantity', teddyNumber - 1)
            productList.splice(productId, 1)
        } else {
            productList[productId].productQty -= 1
            localStorage.setItem('quantity', teddyNumber - 1)
        }
    }
    localStorage.setItem('productsInCart', JSON.stringify(productList))
    displayCart()
    updateCart()


}

//validate email
function ValidateEmail(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        return (true)
    }

    return (false)
}


// post customer details
//const postDetails = () => {
let postDetails = document.getElementById('orderButton')
postDetails.addEventListener('click', () => {
    //getting the details
    let data = {}
    const contact = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        address: document.getElementById('street').value,
        city: document.getElementById('city').value,
        email: document.getElementById('emailAddress').value
    }

    //getting the product ID-s from local storage
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    products = []
    cartItems.forEach((product) => {
        products.push(product.id)
    })

    //checking if all details are valid
    if (contact.firstName != "" && contact.lastName != "" && contact.address != "" && contact.city != "" && ValidateEmail(contact.email) != false) {
        /*data = {
                contact: contact,
                products: products
            }
            // XMLhttp request to post the data back to the server
        const http = new XMLHttpRequest();
        const url = 'http://localhost:3000/api/teddies/order';
        http.open('POST', url);
        http.setRequestHeader('Content-Type', 'application/json')
            
       

        //const response = http.responseText
       

        //when the post request is succesfull, retrieve the order ID
        //send the order ID with the total cost of the product through URL to the confirmation page ( window.location.href)

       // http.send(JSON.stringify({ contact: contact, products: products }));
        // http.onload = () => {

        //  if (http.status >= 200 && http.status < 300) {
        //      window.location.href = 'order.html?total=' + document.getElementById('total').innerHTML + '&response=' + response

        //  }
        //}*/
        const xhr = new XMLHttpRequest();

        // listen for `load` event
        xhr.onload = () => {

            // print JSON response
            if (xhr.status >= 200 && xhr.status < 300) {
                localStorage.clear()
                    // parse JSON
                const response = JSON.parse(xhr.responseText);
                console.log(response);
                window.location.href = 'order.html?total=' + document.getElementById('total').innerHTML + '&orderId=' + response.orderId;


            }
        };



        // open request
        xhr.open('POST', 'http://localhost:3000/api/teddies/order');

        // set `Content-Type` header
        xhr.setRequestHeader('Content-Type', 'application/json');


        // send rquest with JSON payload
        xhr.send(JSON.stringify({ contact: contact, products: products }));


    } else if (contact.firstName != "" && contact.lastName != "" && contact.address != "" && contact.city != "" && ValidateEmail(contact.email) == false) {
        alert('Please use a valid e-mail address!')
    } else {
        alert('Please fill all the fields!')
    }


})





//console.log(data)
//}

// order button
//let makeOrder = document.getElementById('order')
//makeOrder.addEventListener('click', postDetails)