displayItem()

function getItem() {
    const itemId = window.location.search.substring(1)
    console.log(itemId)
    return fetch(`http://localhost:3000/api/furniture/${itemId}`)
    .then((res) => res.json())
    .then((res) => res)
}

async function displayItem() {
    let item = await getItem()
    console.log(item)
}