// Unhide home page on load
window.onload = function() {
    const home = document.querySelector('#products');
    home.classList.toggle('hidden');
}

// Fetch the JSON data
fetch("./scripts/products.json")
    .then(response => response.json())
    .then(data => {
        // Serve data into array
        var items = [];
        data.forEach(item => {
            items.push({"item" : item.item, "price" : item.price, "image" : item.image})
        })

        // Sort array based on item price 
        items.sort(function(a,b){
            return a.price - b.price;
        })

        // Get the product grid element
        const productGrid = document.querySelector('.product-grid');

        // Remove all existing items
        while (productGrid.firstChild) {
            productGrid.firstChild.remove();
        }

        // Loop through the items
        items.forEach(item => {
            // Create a new item element
            const itemElement = document.createElement('div');
            itemElement.className = 'item';

            // Set the item's HTML
            itemElement.innerHTML = `
            <img src="${item.image}" class="image" alt="IMAGE">
            <div class="description">
            <p class="title">${item.item}</p>
            <p class="price">${item.price}</p>
            </div>
            <span class="add-button reveal"><p>+</p></span>
        `

        // Add the item element to the product grid
        productGrid.appendChild(itemElement);
        })
});

fetch("./scripts/preferences.json")
.then(response => response.json())
.then(data => {
    // get diet-selection element
    const dietSelection = document.querySelector('.diet-selection');

    // empty div
    while(dietSelection.firstChild) {
        dietSelection.firstChild.remove();
    }

    data.forEach(item => {
        const diet = document.createElement('div');

        diet.innerHTML = `
            <input type="checkbox" id="${item}" name="${item}" value="${item}">
            <label for="${item}">${item}</label>
        `;

        // Add each item to the selection list
        dietSelection.appendChild(diet);
    })

})

function toggleSection(sectionId) {
    // Toggle hidden for every other section
    const allSections = document.querySelectorAll('.content .section');
    allSections.forEach((sec) => { 
        if (!sec.classList.contains('hidden')) {
            sec.classList.add('hidden');
        }
    });
    
    // Get the section element
    const sectionElement = document.querySelector(`#${sectionId}`);

    // Toggle the section
    sectionElement.classList.toggle('hidden');
}