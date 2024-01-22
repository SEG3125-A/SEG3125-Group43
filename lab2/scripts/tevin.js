//TODO: Filtering products based on client's dietary preferences 
//TODO: Cart functionality and display 

let userPreferences = {
    name: 'SEG3125-Group43',
    diet: 'organic',
}

// Item Diet Catagories: organic , vegetarian , glutenFree

// Fetch the JSON data
fetch("./scripts/products.json")
    .then(response => response.json())
    .then(data => {
        // Get the product grid element
        const productGrid = document.querySelector('.product-grid');

        // Remove all existing items
        while (productGrid.firstChild) {
            productGrid.firstChild.remove();
        }

        // Loop through the items
        data.forEach(item => {

            // if (item.diet.includes("glutenFree")) {
            //     console.log('includes!');
            // }

            // Filtering of items based on client's preferences

            item.diet.forEach(choice => {

                if (item.diet.includes(userPreferences.diet)) {
                    // Create a new item element
                    const itemElement = document.createElement('div');
                    itemElement.className = 'item reveal';
    
                    // Set the item's HTML
                    itemElement.innerHTML = `
                    <img src="${item.image}" class="image" alt="IMAGE">
                    <div class="description">
                    <p class="title">${item.item}</p>
                    <p class="price">${item.price}</p>
                    </div>
                    <span class="add-button reveal"><p>+</p></span>
                `;
    
                    // Add the item element to the product grid
                    productGrid.appendChild(itemElement);
                }else{
                    console.log('Product not found in user preferences');
                }
            })

        });
    });