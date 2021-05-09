const cart = document.getElementById('cart')

displayCart()

function displayCart () {
    if (window.localStorage.length === 0) {
        cart.innerHTML = "Panier vide"
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
                if (amountSelector.value == 0) {
                    localStorage.removeItem(key)
                    displayItem.remove()
                    return
                }
                let changeAmount = localStorage.getItem(key)
                changeAmount = JSON.parse(changeAmount)
                changeAmount.amount = amountSelector.value
                changeAmount = JSON.stringify(changeAmount)
                window.localStorage.setItem(key, changeAmount)
                cart.innerHTML = ""
                displayCart()
            })

            deleteBtn.addEventListener('click', (e) => {
                localStorage.removeItem(key)
                e.stopPropagation()
                displayItem.remove()
                cart.innerHTML = ""
                displayCart()
            })

            displayItemName.innerText = item.name + ' ' + item.varnish
            displayItemUnitPrice.innerText = item.price/100 + ".00 €"
            displayItemTotalPrice.innerText = item.price*item.amount/100 + ".00 €"
            deleteBtn.innerHTML = '<i class="fas fa-times"></i>'
            displayItem.append(displayItemName, amountSelector, displayItemUnitPrice, displayItemTotalPrice, deleteBtn)
            cart.append(displayItem)
        })
    }
}

// console.log(window.localStorage)