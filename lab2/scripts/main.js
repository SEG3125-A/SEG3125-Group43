// Unhide home page on load
document.addEventListener("DOMContentLoaded", function () {
    const home = document.querySelector('#products');
    home.classList.toggle('hidden');
    resetInputs();
    loadProductsPage();
    loadCartPage();
    });

// Our userObject and saved Preferences
let user = {
    name: 'SEG3125-Group43',
    diet: [],
}

// Contains each productObject that is loaded from our JSON fetch
var items = [];

// Contains all products that are in the cart
var cart = [];

var total = 0;


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
                    })
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

    items.forEach((item) => {
        // Filtering based on client dietary choices
        if (user.diet.length === 0 || (item.diet.some((choice) => user.diet.includes(choice)))) {
            displayItem(item);
        }
        // Remove user.diet.length === 0 to display only items which match the user's dietary choices
    });
    console.log(items)
}

// Function to display a single item on product page
function displayItem(item) {
    // Get the product grid element
    const productGrid = document.querySelector('.product-grid');

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
    <span class="add-button reveal">
        <p class="add prod-${item.item}">${item.inCart ? "-" : "+"}</p>
    </span>
    `;

    // Add the item element to the product grid
    productGrid.appendChild(itemElement);

    item.displayed = true;
}

// Function to show or hide a section, also loads content appropriately
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
// Function to control the dietary checkboxes
function toggleDietaryCheck(dietaryId) {
    if (user.diet.includes(dietaryId)) {
        user.diet = user.diet.filter(choice => {
            return (choice != dietaryId);
        })

    } else {
        user.diet.push(dietaryId);
    }
}

// Function to load the cart page content
function loadCartPage() {
    var empty = true;

    items.forEach(item => {
        if(item.inCart) {
            empty = false;
            total+= item.price
            item.amount=+1
            if(!cart.includes(item)) cart.push(item);
        };
    });

    // Check if cart is empty, otherwise display total
    if(empty) {
        // Display a message when the cart is empty
        document.querySelector('.cart-grid').innerHTML = "Your cart is empty!";
    } else {
        // Clear existing items in the cart
        document.querySelector('.cart-grid').innerHTML = '';

        cart.forEach(item => {
        // Moved cart-total inside the cart-grid div
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        const identifier = item.item.replace(/\W/g, '_');

        // Set the item's HTML
        itemElement.innerHTML = 
        `
        <img src="${item.image}" alt="IMAGE" class="image">
        <p class="name">${item.item}</p>
        <p class="price">Price: \$${item.price}</p>
        <p class="${identifier}-quantity quantity">Quantity: ${item.amount}</p>
        <button class="item-add-button" onclick="increaseItem(${index = cart.findIndex(i => i.item === item.item)})">+</button>
        <button class="item-remove-button" onclick="decreaseItem(${index = cart.findIndex(i => i.item === item.item)})">-</button> 
        `
        document.querySelector('.cart-grid').appendChild(itemElement);
        })
        document.querySelector('.cart-grid').innerHTML += 
        `<div class="cart-item">
            <p class="total">Total: \$${total}</p
        </div>
        ` 
    }
    
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
                        loadProductsPage();
                        console.log(item.inCart);
                        return;
                    }
                })
            }
        })
    }
});

// Function to clear all inputs to fix navigation 
function resetInputs() {
    const inputs = document.querySelectorAll('input');

    inputs.forEach((input) => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            // Reset checkboxes and radio buttons to their default checked state
            input.checked = input.defaultChecked;
        }
    });
}

// Function to remove an item from the cart
function removeItem(cart, index) {
    total -= cart[index].price;
    if (total < 0) total = 0;
    cart[index].inCart = false;
    cart.splice(index, 1);
    loadCartPage();
}

// Function to increase the amount of one item in cart
function increaseItem(index){
    cart[index].amount++;
    total+= cart[index].price;
    console.log(total);

    document.querySelector('.'+cart[index].item+'-quantity').innerHTML = `Quantity: ${cart[index].amount}`;
    document.querySelector('.total').innerHTML = `Total: \$${total}`;
}

// Function to decrease the amount of one item in cart
function decreaseItem(index){
    total -= cart[index].price;
    if (total < 0) total = 0;
    if (cart[index].amount > 1) {
        cart[index].amount--;
    } else {
        removeItem(cart, index);
        console.log('removed')
    }

    console.log(total);

    cart.length == 0 ? null : document.querySelector('.total').innerHTML = `Total: \$${total}`;
}

// Fetching content
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
