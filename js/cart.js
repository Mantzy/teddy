if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    let removeCartItem = document.getElementsByClassName('removeItem')
    console.log(removeCartItem)

    for (var i = 0; i < removeCartItem.length; i++) {
        var button = removeCartItem[i]
        button.addEventListener('click', function(event) {
            var buttonClicked = event.target
            buttonClicked.parentElement.parentElement.parentElement.parentElement.parentElement.remove()
        })
    }

}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('itemContainer')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cartRow')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var cartPrice = cartRow.getElementsByClassName('itemPrice')[0]
        var productQuantity = cartRow.getElementsByClassName('quantity')[0]
        var price = parsFloat(cartPrice.innerText.replace('$', ''))
        var quantity = productQuantity.value
        total = total + (price * quantity)
    }
    document.getElementsByClassName('totalPrice')[0].innerText = total
}