displayStore()

function getItems () {
    return fetch('http://localhost:3000/api/furniture')
    .then((res) => res.json())
    .then((res) => res)
}

async function displayStore () {

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
        itemPrice.innerText = item.price/200 + '0 €'
        itemImg.setAttribute('src', item.imageUrl)
        itemDescription.innerText = item.description
        itemCard.append(itemName, itemImg, itemPrice, itemDescription)

        store.append(itemCard)
    })
}