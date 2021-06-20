displayItem()
displayCartCount()

function getItem() { /** get item from the api based on the itemId from the URL */
    const itemId = window.location.search.substring(1)
    return fetch(`http://localhost:3000/api/furniture/${itemId}`)
    .then((res) => res.json())
    .then((res) => res)
}

async function displayItem() { /** create the item card from the result of api request : item display + varnish and amount selector and the addtocart button */

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
    const amount = document.createElement('input')
    const amountDisplay = document.createElement('span')

    itemDisplay.classList.add('item__display')
    itemName.classList.add('item__display__name')
    itemImg.classList.add('item__display__img')
    itemPrice.classList.add('item__display__price')
    itemDescription.classList.add('item__display__description')
    prevBtn.classList.add('item__display__prevBtn')
    wrapBtn.classList.add('item__display__wrapBtn')
    itemVarnish.classList.add('item__display__wrapBtn__selectVarnish')
    addToCart.classList.add('item__display__wrapBtn__addToCart')
    amount.classList.add('item__display__wrapBtn__amount')
    amountDisplay.classList.add('item__display__wrapBtn__amountDisplay')

    itemName.innerText = item.name
    itemImg.setAttribute('src', item.imageUrl)
    itemPrice.innerText = item.price/100 + '.00 €'
    itemDescription.innerText = item.description
    prevBtn.innerHTML = '<i class="fas fa-times"></i>'
    prevBtn.setAttribute('href', './index.html')
    amount.setAttribute('type', 'range')
    amount.setAttribute('max', '10')
    amount.setAttribute('min', '1')
    amount.setAttribute('value', '1')
    amountDisplay.innerText = 1
    
    amount.addEventListener('input', (e) => { 
        amountDisplay.innerText = amount.value
    })

    item.varnish.map((varnish) => {
        const varnishOpt = document.createElement('option');
        varnishOpt.innerHTML = varnish
        itemVarnish.append(varnishOpt)
    })

    addToCart.innerText = 'Add to Cart'

    addToCart.addEventListener('click', (e) => {

        let cartItem = {
            id : `${window.location.search.substring(1)}`,
            amount : `${amount.value}`,
            name : `${itemName.innerText}`,
            price : `${itemPrice.innerText.substring(0, itemPrice.innerText.length -5)+'00'}`,
            varnish : `${itemVarnish.value}`
        }

        cartItem = JSON.stringify(cartItem)
        const cartItemKey = itemName.innerText + ' ' + itemVarnish.value
        addToCart(cartItemKey, cartItem)
        popup()
        displayCartCount()

        function addToCart (key, item) { /** add or modify the amount and varnish selected of the item in localStorage (= cart) */
            if(localStorage.getItem(key) === null) {
            window.localStorage.setItem(key, item)
            }else{
                let changeAmount = localStorage.getItem(key)
                changeAmount = JSON.parse(changeAmount)
                item = JSON.parse(item)
                changeAmount.amount = Number(changeAmount.amount) + Number(item.amount)
                changeAmount = JSON.stringify(changeAmount)
                window.localStorage.setItem(key, changeAmount)
            }
        }

        function popup () { /** create a popup (that last 2000ms) with the amount and varnish selected when item is added to cart*/
            const popup = document.createElement('div')
            const popupWrap = document.getElementById('popupWrap')
            popup.classList.add('popup')
            popupWrap.append(popup)
            popup.innerText = `${amount.value} ${itemName.innerText} ${itemVarnish.value} added to cart`
            setTimeout(() => {
                popup.remove();
            }, 2000)
        }
    })

    wrapBtn.append(itemVarnish, amount, amountDisplay, addToCart)
    itemDisplay.append(prevBtn, itemName, itemImg, itemPrice, itemDescription, wrapBtn)
    store.append(itemDisplay)
    
}

function displayCartCount() { /** display the amount of item in cart */
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

