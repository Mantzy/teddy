let url = window.location.href
let newURL = new URL(url)
let response = JSON.parse(newURL.searchParams.get('respons'))
let total = JSON.parse(newURL.searchParams.get('total'))

let confirmation = document.getElementById('confirmation')
confirmation.innerHTML = `<p class="px-5 font-weight-bold">Your order number: <br>
Total amount to pay: $${total} </p>`