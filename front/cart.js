const cart = document.getElementById('cart')

displayCart()

function displayCart () {
    if (window.localStorage.length === 0) {
        cart.innerHTML = "Panier vide"
    }else{
     // to Do
    }
}

console.log(window.localStorage)