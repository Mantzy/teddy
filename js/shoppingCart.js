let image = document.getElementById('image')
let teddyName = document.getElementById('teddyName')
let teddyPrice = document.getElementById('teddyPrice')
let teddyColor = document.getElementById('teddyColors')
let teddyQunatity = document.getElementById('teddyQuantity')
let product

//item number in cart
let quantity = JSON.parse(localStorage.getItem('quantity'))
let itemNumberInCart = document.getElementById('itemNumberInCart')
itemNumberInCart.innerHTML = quantity

let productsInCart = JSON.parse(localStorage.getItem('productsInCart'))
console.log(productsInCart)
console.log(quantity)



function deleteProduct(id, qty) {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    let index = cartItems.findIndex(product => product._id == id)

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



function displayCart() {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems);
    let productContainer = document.getElementById('products')
    if (cartItems && productContainer) {
        let output = ''
        let total = 0
        cartItems.forEach(function(teddy) {
            output +=
                `<div class="row mb-4 cartRow" id="products">
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
                                <p class="mb-2 text-muted text-uppercase small" id="teddyColor">Color:${teddy.colors}</p>

                            </div>
                            <div>
                                <div class="def-number-input number-input safari_only mb-0 w-100" id="teddyQuantity">

                                    <input class="quantity" min="1" name="quantity" value="1" type="number">

                                </div>

                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <button type="button" class="card-link-secondary small text-uppercase mr-3 letter-green removeItem" onclick="deleteProduct('${teddy._id}', 1)"><i class="fas fa-trash-alt mr-1"></i> Remove item </button>
                            </div>
                            <p class="mb-0" id="teddyPrice">$${teddy.price / 100}.00<span><strong class="itemPrice"></strong></span></p class="mb-0">
                        </div>
                    </div>
                </div>
            </div>

            `;
            total += teddy.price / 100



        });
        productContainer.innerHTML = output

        let displayTotal = document.getElementById('total');
        displayTotal.innerHTML = `$${total}.00`;

    }

}
displayCart()