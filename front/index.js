displayStore()
displayCartCount()

function getItems () {   /** call the API to get products */
    return fetch('http://localhost:3000/api/furniture')
    .then((res) => res.json())
    .then((res) => res)
}

async function displayStore () {   /** create card display for each product */

    const store = document.getElementById('store')

    let items = await getItems()

    items.map((item) => {

        const itemId = item._id

        const itemCard = document.createElement('a')
        const itemName = document.createElement('h2')
        const itemImg = document.createElement('img')
        const itemPrice = document.createElement('p')
        const itemDescription = document.createElement('p')

        itemCard.classList.add('item')
        itemName.classList.add('item__name')
        itemImg.classList.add('item__img')
        itemPrice.classList.add('item__price')
        itemDescription.classList.add('item__description')

        itemCard.setAttribute('href', `product.html?${itemId}`)
        itemName.innerText = item.name
        itemPrice.innerText = item.price/100 + '.00 €'
        itemImg.setAttribute('src', item.imageUrl)
        itemDescription.innerText = item.description
        itemCard.append(itemName, itemImg, itemPrice, itemDescription)

        store.append(itemCard)
    })
}

function displayCartCount() { /** display the quantity of items in the cart */
    let cartCount = document.getElementById('cartCount')

    if (window.localStorage.length === 0) {
        cartCount.innerText = "0"
    }else{
        let amount = 0
        for (let i = 0; i < localStorage.length; i++) {
          let item = localStorage.getItem(localStorage.key(i))
          item = JSON.parse(item)
          amount += Number(item.amount)
        }
        cartCount.innerText = amount
    }
}