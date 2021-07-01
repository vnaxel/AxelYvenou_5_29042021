const cart = document.getElementById('cart')

displayCart()

function displayCart () { /** display the items in cart (localStorage) with modificator re-callin this function when used*/
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

        function displayOrderTotalPrice () { /** sum the price of items in cart to get the total */
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

// ---- Visual validation for form -----

    const nameRegEx = /^[a-zA-Z]'?[-a-zA-Z]+$/
    const addressRegEx = /^[a-zA-Z0-9\s,'-.]/
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const firstName = document.getElementById('firstName')
    const lastName = document.getElementById('lastName')
    const address = document.getElementById('address')
    const city = document.getElementById('city')
    const email = document.getElementById('email')

    const firstNameLabel = document.getElementById('label__firstName')
    const lastNameLabel = document.getElementById('label__lastName')
    const addressLabel = document.getElementById('label__address')
    const cityLabel = document.getElementById('label__city')
    const emailLabel = document.getElementById('label__email')

    const orderForm = document.getElementById('orderForm')

    orderForm.addEventListener('input', (e) => { 
       if ( nameRegEx.test(firstName.value) === true &
            nameRegEx.test(lastName.value) === true &
            addressRegEx.test(address.value) === true &
            nameRegEx.test(city.value) === true &
            emailRegEx.test(email.value) === true &
            window.localStorage.length !== 0) {
                orderBtn.style.background='yellowgreen'
            } else {
                orderBtn.style.background='grey'
            }
    })

    firstName.addEventListener('input', (e) => { 
        if (nameRegEx.test(firstName.value) === false) {
            firstNameLabel.style.color="red"
        } else {
            firstNameLabel.style.color="black"
        }
    })

    lastName.addEventListener('input', (e) => { 
        if (nameRegEx.test(lastName.value) === false) {
            lastNameLabel.style.color="red"
        } else {
            lastNameLabel.style.color="black"
        }
    })

    address.addEventListener('input', (e) => { 
        if (addressRegEx.test(address.value) === false) {
            addressLabel.style.color="red"
        } else {
            addressLabel.style.color="black"
        }
    })

    city.addEventListener('input', (e) => { 
        if (nameRegEx.test(city.value) === false) {
            cityLabel.style.color="red"
        } else {
            cityLabel.style.color="black"
        }
    })

    email.addEventListener('input', (e) => { 
        if (emailRegEx.test(email.value) === false) {
            emailLabel.style.color="red"
        } else {
            emailLabel.style.color="black"
        }
    })

//    ---- Visual validation for form ends here-----

const orderBtn = document.getElementById('order')

orderBtn.addEventListener('click', (e) => { /** calls order function if checkOrder returns true */
    e.preventDefault()
    let check = checkOrder()
    switch (check) {
        case false :
            break
        case true :
            order()
            break
    }
})

function getContact () { /** get and create the contact object from the form */

    const firstName = document.getElementById('firstName').value
    const lastName = document.getElementById('lastName').value
    const address = document.getElementById('address').value
    const city = document.getElementById('city').value
    const email = document.getElementById('email').value

    const contact = {
        firstName : firstName,
        lastName : lastName,
        address : address,
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

// mecanichal validation for form
function checkOrder () {

    const contact = getContact()

    if (window.localStorage.length === 0) {
        // alert("there is no item in your cart")
        return false
    }
    if (nameRegEx.test(contact.firstName) === false) {
        // alert("firstName is invalid")
        return false
    }
    if (nameRegEx.test(contact.lastName) === false) {
        // alert("lastName is invalid")
        return false
    }
    if (addressRegEx.test(contact.address) === false) {
        // alert("address is invalid")
        return false
    }
    if (nameRegEx.test(contact.city) === false) {
        // alert("city is invalid")
        return false
    }
    if (emailRegEx.test(contact.email) === false) {
        // alert("email is invalid")
        return false
    }
    return true
}



function order () {
    
    postOrder()
    
/** create and posts order Object then redirect to the thanks.html page with the orderId from the result of the request*/
    async function postOrder () {
        const contact = getContact()
        const products = getProductIds()
        const order = {
            contact: contact,
            products: products
        }
        return fetch(`${apiUrl}/api/furniture/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(res => {
            localStorage.clear()
            sessionStorage.setItem('processingOrder', JSON.stringify(res))
            window.location.href = `thanks.html?${res.orderId}`
        })
    }
}
