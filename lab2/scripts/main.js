// Unhide home page on load
window.onload = function () {
    const home = document.querySelector('#products');
    home.classList.toggle('hidden');
}

document.addEventListener("DOMContentLoaded", function () {
    loadProductsPage();
});

// Our userObject and saved Preferences
let user = {
    name: 'SEG3125-Group43',
    diet: [],
}

// Contains each productObject that is loaded from our JSON fetch
var items = [];

// Fetch the JSON data
async function loadProductsPage() {

    // Checking if our itemsArray is empty, if it is, fill it with objects from the products.json file
    if (items.length === 0) {

        await fetch("./scripts/products.json")
            .then(response => response.json())
            .then(data => {
                // Serve data into array

                data.forEach(item => {
                    items.push({
                        "item": item.item,
                        "price": item.price,
                        "image": item.image,
                        "diet": item.diet,
                        "displayed": false,
                        "inCart": item.inCart,
                    },
                    )
                })

                // Sort array based on item price 
                items.sort(function (a, b) {
                    return a.price - b.price;
                })

            });
    }

    // Get the product grid element
    const productGrid = document.querySelector('.product-grid');

    // Remove all existing items
    while (productGrid.firstChild) {
        productGrid.firstChild.remove();
    }

    // Loop through the items and update their display
    items.forEach(item => {

        // Filtering based on client dietary choices
        user.diet.forEach(choice => {
            if (item.diet.includes(choice) && item.displayed === false) {

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
                <span class="add-button reveal"><p class="add prod-${item.item}">+</p></span>
                `;
                // Add the item element to the product grid
                productGrid.appendChild(itemElement);

                item.displayed = true;
            }

        })
    })
}

fetch("./scripts/preferences.json")
    .then(response => response.json())
    .then(data => {
        // get diet-selection element
        const dietSelection = document.querySelector('.diet-selection');

        // empty div
        while (dietSelection.firstChild) {
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

    if (sectionId === 'products') {
        loadProductsPage();
    } else {
        items.forEach(item => {
            item.displayed = false;
        })

        if (sectionId === 'cart') {
            loadCartPage();
        }
    }

    // Toggle the section
    sectionElement.classList.toggle('hidden');
}


//TEVIN
function toggleDietaryCheck(dietaryId) {
    if (user.diet.includes(dietaryId)) {
        user.diet = user.diet.filter(choice => {
            return (choice != dietaryId);
        })

    } else {
        user.diet.push(dietaryId);
    }
}


function loadCartPage() {

    total = 0;
    items.forEach(item => {
        if(item.inCart) total+= item.price;
    });

    document.querySelector("#cart-total").innerHTML = `\$${total}`;

    //TODO: Maybe display the items in the cart? Switch the + button to a - button and when clicked change the state so that it is no longer in the cart? Code below was attempting to do that but CSS is messy
    // Get the product grid element
    // const cartGrid = document.querySelector('.cart-grid');

    // // Remove all existing items
    // while (cartGrid.firstChild) {
    //     cartGrid.firstChild.remove();
    // }

    // items.forEach(item => {

    //     if (item.inCart) {
    //         const itemElement = document.createElement('div');
    //         itemElement.className = 'item';

    //         // Set the item's HTML
    //         itemElement.innerHTML = `
    //             <img src="${item.image}" class="image" alt="IMAGE">
    //             <div class="description">
    //             <p class="title">${item.item}</p>
    //             <p class="price">${item.price}</p>
    //             </div>
    //             <span class="remove-button reveal"><p class="remove prod-${item.item}">-</p></span>
    //             `;
    //         // Add the item element to the cart grid
    //         cartGrid.appendChild(itemElement);
    //     }
    // });
}


//EVENT LISTENERS
document.addEventListener("click", function (e) {
    if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
        toggleDietaryCheck(e.target.name);
    }

    if (e.target.classList.contains('add')) {
        e.target.classList.forEach(className => {
            if (className.includes('prod')) {

                itemName = className.substring(5);
                console.log(itemName);

                items.forEach(item => {
                    if (item.item === itemName) {
                        item.inCart = !item.inCart;
                        console.log(item.inCart);
                        return;
                    }
                })
            }
        })
    }
});