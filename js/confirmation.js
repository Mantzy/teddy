let url = window.location.href
let newURL = new URL(url)
let response = newURL.searchParams.get('orderId')
let total = newURL.searchParams.get('total')

let confirmation = document.getElementById('confirmation')
confirmation.innerHTML = `<p class="px-5 font-weight-bold">Your order number: ${response} <br>
Total amount to pay: $${total} </p>`