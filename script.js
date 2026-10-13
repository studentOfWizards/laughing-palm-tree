async function getProducts() {
    const response = await fetch('/products.json')
    console.log("HIT1.1")
    if (!response.ok) {
        throw new Error("Error: ", response.status)
    }
    console.log("HIT1.2")
    return response.json()
}

async function showProducts(products) {
    let productGrid = document.getElementById("product-grid")
    products.products.forEach(product => {

        let productContainer = document.createElement("div")
        let productTitle = document.createElement("h2")

        productTitle.textContent = `${product.Name}`
        let productDescription = document.createElement("h3")

        productDescription.textContent = `${product.Description}`
        let productPrice = document.createElement("h3")

        productPrice.textContent = `${product.Price}`
        let productQuantity = document.createElement("h3")
        productQuantity.textContent = `${product.Quantity}`

        productContainer.appendChild(productTitle)
        productContainer.appendChild(productDescription)
        productContainer.appendChild(productPrice)
        productContainer.appendChild(productQuantity)

        productGrid.appendChild(productContainer)
        
    });
}

async function init() {
    try {
        console.log("HIT")
        const products = await getProducts()
        console.log("HIT2")
        if (products.products.length === 0) {
            document.querySelector("#error-display").textContent = `No product data available.`    
        }
        else {
            showProducts(products)
        }
    }
    catch (error) {
        console.log("Error - ", error)
        document.querySelector("#error-display").textContent = `Error - ${error}`
    }

}

init()