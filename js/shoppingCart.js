let image = document.getElementById('image')
let teddyName = document.getElementById('teddyName')
let teddyPrice = document.getElementById('teddyPrice')
let teddyColor = document.getElementById('teddyColors')
let product
let quantity = JSON.parse(localStorage.getItem('quantity'))
if (quantity == null) {
    localStorage.setItem('quantity', 0)
}
productsInCart = JSON.parse(localStorage.getItem('productsInCart'))
console.log(productsInCart)
if (productsInCart == null) {
    localStorage.setItem('productsInCart', '[]')

}

localStorage.setItem('productsInCart', JSON.stringify(myData));


request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
    product = data
    if (request.status >= 200 && request.status < 400) {
        image.src = data.imageUrl
        teddyName.textContent = data.name
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