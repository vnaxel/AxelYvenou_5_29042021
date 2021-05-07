displayItem()

function getItem() {
    const itemId = window.location.search.substring(1)
    console.log(itemId)
    return fetch(`http://localhost:3000/api/furniture/${itemId}`)
    .then((res) => res.json())
    .then((res) => res)
}

async function displayItem() {

    const store = document.getElementById('store')

    const item = await getItem()

    const itemDisplay = document.createElement('div')
    const itemName = document.createElement('h2')
    const itemImg = document.createElement('img')
    const itemPrice = document.createElement('p')
    const itemDescription = document.createElement('p')
    const prevBtn = document.createElement('a')
    const wrapBtn = document.createElement('div')
    const itemVarnish = document.createElement('select')
    const addToCart = document.createElement('button')

    itemDisplay.classList.add('item__display')
    itemName.classList.add('item__display__name')
    itemImg.classList.add('item__display__img')
    itemPrice.classList.add('item__display__price')
    itemDescription.classList.add('item__display__description')
    prevBtn.classList.add('item__display__prevBtn')
    wrapBtn.classList.add('item__display__wrapBtn')
    itemVarnish.classList.add('item__display__wrapBtn__selectVarnish')
    addToCart.classList.add('item__display__wrapBtn__addToCart')

    itemName.innerText = item.name
    itemImg.setAttribute('src', item.imageUrl)
    itemPrice.innerText = item.price/250 + '0 €'
    itemDescription.innerText = item.description
    prevBtn.innerHTML = '<i class="fas fa-times"></i>'
    prevBtn.setAttribute('href', './index.html')

    item.varnish.map((varnish) => {
        const varnishOpt = document.createElement('option');
        varnishOpt.innerHTML = varnish
        itemVarnish.append(varnishOpt)
    })

    addToCart.innerText = 'Add to cart'
    addToCart.addEventListener('click', doSomethin())  // toDo

    wrapBtn.append(itemVarnish, addToCart)
    itemDisplay.append(prevBtn, itemName, itemImg, itemPrice, itemDescription, wrapBtn)
    store.append(itemDisplay)
    
}

function doSomethin() {}