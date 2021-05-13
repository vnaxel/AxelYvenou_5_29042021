const cart = document.getElementById('cart')

displayCart()

function displayCart () {
    if (window.localStorage.length === 0) {
        cart.innerHTML = "cart is empty"
    }else{
        Object.keys(localStorage).map((key) => {
            let item = localStorage.getItem(key)
            item = JSON.parse(item)

            const displayItem = document.createElement('li')
            const displayItemName = document.createElement('span')
            const displayItemUnitPrice = document.createElement('span')
            const displayItemTotalPrice = document.createElement('span')
            const amountSelector = document.createElement('input')
            const deleteBtn = document.createElement('span')

            displayItem.classList.add('listedItem')
            displayItemName.classList.add('listedItemName')
            displayItemUnitPrice.classList.add('listedItemUnitPrice')
            displayItemTotalPrice.classList.add('listedItemTotalPrice')
            amountSelector.classList.add('listedItemAmountSelector')
            deleteBtn.classList.add('listedItemDeleteBtn')

            amountSelector.setAttribute('type', 'number')
            amountSelector.setAttribute('max', '100')
            amountSelector.setAttribute('min', '1')
            amountSelector.setAttribute('value', `${item.amount}`)

            amountSelector.addEventListener('change', () => { 
                if (amountSelector.value == 0 | amountSelector.value === null) {
                    localStorage.removeItem(key)
                    displayItem.remove()
                    displayOrderTotalPrice()
                    if (window.localStorage.length === 0) {
                        cart.innerHTML = "cart is empty"
                    }
                    return
                }
                let changeAmount = localStorage.getItem(key)
                changeAmount = JSON.parse(changeAmount)
                changeAmount.amount = amountSelector.value
                changeAmount = JSON.stringify(changeAmount)
                window.localStorage.setItem(key, changeAmount)
                cart.innerHTML = ""
                displayCart()
                displayOrderTotalPrice()

            })

            deleteBtn.addEventListener('click', () => {
                localStorage.removeItem(key)
                displayItem.remove()
                cart.innerHTML = ""
                displayCart()
                displayOrderTotalPrice()

            })

            displayItemName.innerText = item.name + ' ' + item.varnish
            displayItemUnitPrice.innerText = item.price/100 + ".00 €"
            displayItemTotalPrice.innerText = item.price*item.amount/100 + ".00 €"
            deleteBtn.innerHTML = '<i class="fas fa-times"></i>'
            displayItem.append(displayItemName, amountSelector, displayItemUnitPrice, displayItemTotalPrice, deleteBtn)
            cart.append(displayItem)
        })

        displayOrderTotalPrice()

        function displayOrderTotalPrice () {
            const orderTotalPrice = document.getElementById('orderTotalPrice')
            orderTotalPrice.innerHTML = ""
            let total = 0
            Object.keys(localStorage).map((key) => {
                let item = localStorage.getItem(key)
                item = JSON.parse(item)
                total += item.price*item.amount
            })
            if (total == 0 | total === null) {
                orderTotalPrice.innerHTML = ""
            }else{
                total = total/100 + ".00 €"
                orderTotalPrice.innerHTML = `Order total price : ${total}`
            }
        }
    }
}



//  --- FORM & ORDER ---

const orderBtn = document.getElementById('order')
orderBtn.addEventListener('click', (e) => {
    e.preventDefault()
    order()
})

function order () {
    
    postOrder()

// recupere et cree l'objet contact depuis le formulaire
    function getContact () {

        const firstName = document.getElementById('firstName').value
        const lastName = document.getElementById('lastName').value
        const adress = document.getElementById('adress').value
        const city = document.getElementById('city').value
        const email = document.getElementById('email').value

        const contact = {
            firstName : firstName,
            lastName : lastName,
            address : adress,
            city : city,
            email : email
        }
        return contact
    }
    
// recupere les Id des produit dans le local storage et crée l'objet produits
    function getProductIds () {
        const products = []

        Object.keys(localStorage).map((key) => {
            const product = JSON.parse(localStorage.getItem(key))
            const productId = product.id
            for (let i = 0; i < Number(product.amount); i++) {
            products.push(productId)
            }
        })
        return products
    }

// post l'objet order
    async function postOrder () {
        const contact = getContact()
        const products = getProductIds()
        const order = {
            contact: contact,
            products: products
        }
        console.log(order)
        return fetch("http://localhost:3000/api/furniture/order", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
        })
    }

}
