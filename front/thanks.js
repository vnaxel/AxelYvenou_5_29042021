displayThanks()

function displayThanks () { /** if there's no processing order for reasons, redirect to the index page. Else display thanks with the orderID, username, totalprice and tableofitems from the processing order */
    if (!sessionStorage.processingOrder) {
        window.location.href = `../index.html`
    }

    const thanks = document.getElementById('thanks')

    const order = JSON.parse(sessionStorage.processingOrder)
    const totalPrice = getTotalOrderPrice()
    const tableOfItems = getTableOfItems()

    const displayThanks = document.createElement('h2')
    const displayOrderId = document.createElement('span')
    const displayTotalPrice = document.createElement('span')

    displayThanks.classList.add('thanks__thanks')
    displayOrderId.classList.add('thanks__orderId')
    displayTotalPrice.classList.add('thanks__totalPrice')

    displayThanks.innerText = `Thanks for your order ${order.contact.firstName}`
    displayOrderId.innerText = `Your order ID is : ${order.orderId}`
    displayTotalPrice.innerText = `Total price : ${totalPrice/100 + ".00 €"}`

    thanks.append(displayThanks, displayOrderId, tableOfItems, displayTotalPrice)

    sessionStorage.removeItem('processingOrder')
}

function getTotalOrderPrice () { /** sum the price of each items in the processing order to get the totalprice */

    const order = JSON.parse(sessionStorage.processingOrder)
    let totalOrderPrice = 0

    order.products.forEach((p) => {
        totalOrderPrice += p.price
    })

    return totalOrderPrice
}

function getTableOfItems () { /** set items from processingOrder to create and display in DOM a resume of the differents items in the processingOrder */

    const tableOfItems = document.createElement('div')
    const displayItemHeader = document.createElement('h2')

    tableOfItems.classList.add('thanks__tableOfItems')
    displayItemHeader.classList.add('thanks__tableOfItems__title')

    displayItemHeader.innerText = "Order resume :"

    tableOfItems.appendChild(displayItemHeader)

    const order = JSON.parse(sessionStorage.processingOrder)
    let namesArray = []
    order.products.forEach((p) => {
        namesArray.push(p.name)
    })
    let setOfNames = new Set(namesArray)
    let namesArraySorted = [...setOfNames]
    let items = []
    namesArraySorted.forEach((i) => {
        let item = {
            name : i,
            counter : 0
        }
        items.push(item)
    })
    items.forEach((item) => {
        namesArray.forEach((value) => {
            if (item.name == value) {
                item.counter += 1
            }
        })
    })
    
    items.forEach((item) => {
        const displayItem = document.createElement('span')
        const itemName = document.createElement('span')
        const itemCounter = document.createElement('span')

        displayItem.classList.add('thanks__tableOfItems__item')
        itemName.classList.add('thanks__tableOfItems__item__name')
        itemCounter.classList.add('thanks__tableOfItems__item__counter')

        itemName.innerText = " " + item.name
        itemCounter.innerText = item.counter
        displayItem.append(itemCounter, itemName)
        tableOfItems.appendChild(displayItem)
    })

    return tableOfItems
}


