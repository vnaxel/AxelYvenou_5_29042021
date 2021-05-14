displayThanks()

function displayThanks () {
    if (!sessionStorage.processingOrder) {
        window.location.href = `../index.html`
    }

    const ty = document.getElementById('ty')

    const order = JSON.parse(sessionStorage.processingOrder)

    const totalPrice = getTotalOrderPrice()

    const tableOfItems = getTableOfItems()

    const displayThanks = document.createElement('h2')
    const displayOrderId = document.createElement('span')
    const displayTotalPrice = document.createElement('span')

    displayThanks.classList.add('ty__thanks')
    displayOrderId.classList.add('ty__orderId')
    displayTotalPrice.classList.add('ty__totalPrice')

    displayThanks.innerText = `Thanks for your order ${order.contact.firstName}`
    displayOrderId.innerText = `Your order ID is : ${order.orderId}`
    displayTotalPrice.innerText = `Total price : ${totalPrice/100 + ".00 €"}`

    ty.append(displayThanks, displayOrderId, tableOfItems, displayTotalPrice)

    sessionStorage.removeItem('processingOrder')
}

function getTotalOrderPrice () {

    const order = JSON.parse(sessionStorage.processingOrder)
    let totalOrderPrice = 0

    order.products.forEach((p) => {
        totalOrderPrice += p.price
    })

    console.log(totalOrderPrice)
    return totalOrderPrice
}

function getTableOfItems () {

    const tableOfItems = document.createElement('div')
    const displayItemHeader = document.createElement('h2')

    tableOfItems.classList.add('ty__tableOfItems')
    displayItemHeader.classList.add('ty__tableOfItems__title')

    displayItemHeader.innerText = "Order resume :"

    tableOfItems.appendChild(displayItemHeader)

    const order = JSON.parse(sessionStorage.processingOrder)
    let namesArray = []
    order.products.forEach((p) => {
        namesArray.push(p.name)
    })
    let SetOfNames = new Set(namesArray)
    let NamesArraySorted = [...SetOfNames]
    let items = []
    NamesArraySorted.forEach((i) => {
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

        displayItem.classList.add('ty__tableOfItems__item')
        itemName.classList.add('ty__tableOfItems__item__name')
        itemCounter.classList.add('ty__tableOfItems__item__counter')

        itemName.innerText = " " + item.name
        itemCounter.innerText = item.counter
        displayItem.append(itemCounter, itemName)
        tableOfItems.appendChild(displayItem)
    })

    return tableOfItems
}


