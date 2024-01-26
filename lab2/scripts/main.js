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

// Define the current page number and the number of items per page
let currentPage = 1;
let itemsPerPage = 6;

// Contains each productObject that is loaded from our JSON fetch
var items = [];

// Contains all products that are in the cart
var cart = [];

var total = 0;

const sortPriceCheckbox = document.querySelector('#sort-price');

// Fetch the JSON data
async function loadProductsPage(criteria = 'price', order = 'asc') {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

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
                    });
                });
            });
    }

    // Sort the items
    sort(items, criteria, order);

    // Filter the items
    const filteredItems = filterItems(items);

    // Get a certain number of items to display
    const itemsToDisplay = filteredItems.slice(start, end);

    // Get the product grid element
    const productGrid = document.querySelector('.product-grid');

    // Remove all existing items
    while (productGrid.firstChild) {
        productGrid.firstChild.remove();
        productGrid.setAttribute("style", " ");
    }

    itemsToDisplay.forEach(item => {
        displayItem(item);
    });

    // Check if productGrid is empty or has no elements
    if (!productGrid.firstChild) {
        productGrid.setAttribute("style", "display: flex; justify-content: center; align-items: center; font-family: 'Roboto', sans-serif; font-size: 1.2em; position: relative; top: -100px;");
        productGrid.innerHTML = `There are no items that match your dietary choices.`;
    } else {
        // Update the page numbers
        updatePageNumbers(filteredItems);
    }
    console.log(items);
}

function sort(items, criteria, order) {
    if (criteria === 'item') {
        if (order === 'asc') {
            items.sort((a, b) => a.item.localeCompare(b.item));
        } else {
            items.sort((a, b) => b.item.localeCompare(a.item));
        }
    } else if (criteria === 'price') {
        if (order === 'asc') {
            items.sort((a, b) => a.price - b.price);
        } else {
            items.sort((a, b) => b.price - a.price);
        }
    } else if (criteria === 'diet') {
        if (order === 'asc') {
            items.sort((a, b) => a.diet - b.diet);
        } else {
            items.sort((a, b) => b.diet - a.diet);
        }
    }
}

function filterItems(items) {
    return items.filter(item => {
        // Filtering based on client dietary choices
        return user.diet.length === 0 || item.diet.some(choice => user.diet.includes(choice));
    });
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

// Update the page numbers
function updatePageNumbers(items) {
    const totalPages = getTotalPages(items);

    // Clear the page numbers
    document.querySelector('.page-numbers').innerHTML = '';

    // Add the page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageNumberElement = document.createElement('button');
        pageNumberElement.textContent = i;
        pageNumberElement.addEventListener('click', () => {
            currentPage = i;
            loadProductsPage();
        });
        pageNumberElement.setAttribute("style", "position: relative; bottom: 100px; border: none; margin-right: 7px; background-color: transparent; color: " + (i === currentPage ? "green" : "#000") + "; font-size: 1.2em; font-family: 'Roboto', sans-serif; cursor: pointer; margin: 0 5px;")
        document.querySelector('.page-numbers').appendChild(pageNumberElement);
    }
}

// Calculate the total number of pages
function getTotalPages(items) {
    return Math.ceil(items.length / itemsPerPage);
}

function calculateItemsPerPage() {
    const matchingItems = items.filter(item => item.diet.some(choice => user.diet.includes(choice)));
    return Math.ceil(matchingItems.length / 2);
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
        handleSortChange();
        window.onchange = function() {
            window.scrollTo({top: document.getElementById('product-grid').offsetTop, behavior: 'smooth'});
        };
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
    currentPage = 1;
}

// Function to load the cart page content
function loadCartPage() {
    var empty = true;

    items.forEach(item => {
        if(item.inCart) {
            empty = false;
            total+= item.price
            total = parseFloat(total.toFixed(2));
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
        `<div class="cart-bottom">
            <div class="cart-item">
                <p class="total">Total: \$${total}</p
            </div>
        </div>
        <div class="checkout">
            <button class="checkout-button" onclick="alert('Thank you for shopping at Auto-Cart !')">Checkout</button>
        </div>
        ` 
    }
    
}

//EVENT LISTENER
document.addEventListener("click", function (e) {
    if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox' && !e.target.parentElement.classList.contains('sorter-options')) {
        toggleDietaryCheck(e.target.name);
    }
    handleSortChange();
    loadProductsPage();
    if (e.target.classList.contains('add')) {
        e.target.classList.forEach(className => {
            if (className.includes('prod')) {

                itemName = className.substring(5);
                console.log(itemName);

                items.forEach(item => {
                    handleSortChange();
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

    // Add event listeners
    sortPriceCheckbox.addEventListener('change', handleSortChange());
});

document.querySelector('#items-per-page').addEventListener('change', function(e) {
    itemsPerPage = parseInt(e.target.value);
    currentPage = 1; 
    loadProductsPage(); 
});

function handleSortChange() {
    // Determine the sorting criteria and order
    let order = sortPriceCheckbox.checked ? 'desc' : 'asc';

    // Call the loadProductsPage function with the sorting criteria and order
    loadProductsPage('price', order);
}

window.addEventListener('change', function (e) {
    if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox' && e.target.parentElement.classList.contains('sorter-options')) {
        const sortPriceCheckbox = document.querySelector('#sort-price');
        // Determine the sorting criteria and order
        let order = sortPriceCheckbox.checked ? 'desc' : 'asc';

        // Call the loadProductsPage function with the sorting criteria and order
        loadProductsPage(criteria, order);
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
    total = parseFloat(total.toFixed(2));
    if (total < 0) total = 0;
    cart[index].inCart = false;
    cart.splice(index, 1);
    loadCartPage();
}

// Function to increase the amount of one item in cart
function increaseItem(index){
    cart[index].amount++;
    total+= cart[index].price;
    total = parseFloat(total.toFixed(2));
    console.log(total);

    document.querySelector('.'+cart[index].item+'-quantity').innerHTML = `Quantity: ${cart[index].amount}`;
    document.querySelector('.total').innerHTML = `Total: \$${total}`;
}

// Function to decrease the amount of one item in cart
function decreaseItem(index){
    total -= cart[index].price;
    total = parseFloat(total.toFixed(2));
    if (total < 0) total = 0;
    if (cart[index].amount > 1) {
        cart[index].amount--;

        console.log(total);

        document.querySelector('.'+cart[index].item+'-quantity').innerHTML = `Quantity: ${cart[index].amount}`;
        document.querySelector('.total').innerHTML = `Total: \$${total}`;
    } else {
        removeItem(cart, index);
        console.log('removed')
    }

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
