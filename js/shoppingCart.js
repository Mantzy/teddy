let image = document.getElementById('image')
let teddyName = document.getElementById('teddyName')
let teddyPrice = document.getElementById('teddyPrice')
let teddyColor = document.getElementById('teddyColors')
let teddyQunatity = document.getElementById('teddyQuantity')
let product
let quantity = JSON.parse(localStorage.getItem('quantity'))
let itemNumberInCart = document.getElementById('itemNumberInCart')
itemNumberInCart.innerHTML = quantity

let productsInCart = JSON.parse(localStorage.getItem('productsInCart'))
console.log(productsInCart)
console.log(quantity)

teddyQunatity.innerText = quantity
teddyName.innerText = productsInCart.name
teddyPrice.textContent = `
    $${productsInCart.price / 100}.00
    `
image.src = productsInCart.imageUrl




var request = new XMLHttpRequest()
request.open('GET', 'http://localhost:3000/api/teddies', true)
request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(localStorage.getItem('productsInCart'))
    product = data
    if (request.status >= 200 && request.status < 400) {
        image.src = data.imageUrl
        teddyName.textContent = data.name
        teddyDescription.textContent = data.description
        teddyPrice.textContent = `
            $${data.price / 100}.00
            `
        console.log(data.colors)
        data.colors.forEach(element => {
            teddyColor.innerHTML += `<div class="form-check form-check-inline pl-0">
            <input type="radio" id="${element}" class="form-check-input" name="colorRadio" value="${element}">
            <label class="form-check-label small text-uppercase card-link-secondary" for="${element}">${element}</label>
        </div>`


        });


    } else {
        const errorMessage = document.createElement('marquee')
        errorMessage.textContent = `The Teddies are hibernating for the winter`
        app.appendChild(errorMessage)
    }



}