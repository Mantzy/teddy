const app = document.getElementById('product-full');



const container = document.createElement('div');
container.setAttribute('class', 'mb-4 row');

app.appendChild(container)

var request = new XMLHttpRequest()
request.open('GET', 'http://localhost:3000/api/teddies', true)
request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
        data.forEach((teddy) => {
            let card = document.createElement('div')
            card.setAttribute('class', 'mb-4 row px-5')

            let figure = document.createElement('figure')
            figure.setAttribute('class', 'col-xl-3 col-md-5 col-lg-3 z-depth-1 rounded mb-3 mb-md-0 view zoom overlay')

            let img = document.createElement('img')
            img.src = teddy.imageUrl
            img.setAttribute('class', 'img-fluid w-100')

            let descriptionDiv = document.createElement('div')
            descriptionDiv.setAttribute('class', 'col-md-7 col-lg-9 col-xl-9')

            let nameDiv = document.createElement('div')
            nameDiv.setAttribute('class', 'col-lg-7 col-xl-7')

            let h5 = document.createElement('h5')
            h5.textContent = teddy.name

            let priceDiv = document.createElement('div')
            priceDiv.setAttribute('class', 'col-lg-5 col-xl-5')

            let button = "<a href='product.html?id=" + teddy._id + "' class='btn btn-primary btn-md mr-1 mb-2'>More information</a>"


            let h6 = document.createElement('h6')
            h6.textContent = `$${teddy.price / 100}.00`
            h6.setAttribute('class', 'mb-3')

            let colors = document.createElement('p')
            colors.textContent = "Colors:" + " " + teddy.colors;
            //  h4.setAttribute('class', 'red')

            let p = document.createElement('p')
            teddy.description = ` ${teddy.description.substring(0, 300)}`
            p.textContent = `${teddy.description}...`
            p.setAttribute('class', 'mb-lg-0')

            let row = document.createElement('div')
            row.setAttribute('class', 'row')



            container.appendChild(card)

            card.appendChild(figure)
            figure.appendChild(img)

            card.appendChild(descriptionDiv)
            descriptionDiv.appendChild(row)
            row.appendChild(nameDiv)

            nameDiv.appendChild(h5)
            nameDiv.appendChild(colors)
            nameDiv.appendChild(p)
            row.appendChild(priceDiv)
            priceDiv.appendChild(h6)
            priceDiv.innerHTML += button



        })
    } else {
        const errorMessage = document.createElement('marquee')
        errorMessage.textContent = `The Teddies are hibernating for the winter`
        app.appendChild(errorMessage)
    }
}

request.send()