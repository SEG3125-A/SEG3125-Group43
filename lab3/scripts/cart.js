// Function to remove an item from the cart
function removeItem(cart, index) {
    total -= cart[index].price;
    total = parseFloat(total.toFixed(2));
    if (total < 0) total = 0;
    cart[index].inCart = false;
    cart.splice(index, 1);
    update();
    loadCartPage();
}

function increaseItem(index){
    cart[index].amount++;
    total+= cart[index].price;
    total = parseFloat(total.toFixed(2));
    update();
    console.log(total);

    document.querySelector('.'+cart[index].item+'-quantity').innerHTML = `Quantity: ${cart[index].amount}`;
    document.querySelector('.total').innerHTML = `Total: \$${total.toFixed(2)}`;
}

function decreaseItem(index){
    total -= cart[index].price;
    total = parseFloat(total.toFixed(2));
    update();
    if (total < 0) total = 0;
    if (cart[index].amount > 1) {
        cart[index].amount--;

        console.log(total);

        document.querySelector('.'+cart[index].item+'-quantity').innerHTML = `Quantity: ${cart[index].amount}`;
        document.querySelector('.total').innerHTML = `Total: \$${total.toFixed(2)}`;
    } else {
        removeItem(cart, index);
        console.log('removed')
    }
}

function checkout() {
    const checkout = document.querySelector('#confirmation-grid');

    const items = cart.map(item => `<p>${item.amount}x ${item.item}</p>`).join('');

    checkout.innerHTML = `
    <h2>Checkout</h2>
    <form>
        <h3>Order summary</h3>
        <div class="order-summary">
            <p>Items : ${cart.length}</p>
            <div class="checkout-items"></div>
            <p>Total : \$${total.toFixed(2)}</p>
        </div>
        <h3>Shipping information</h3>
        <div class="shipping-info">
            <p>Full name : ${document.querySelector('#fname').value}</p>
            <p>Email : ${document.querySelector('#email').value}</p>
            <p>Address : ${document.querySelector('#adr').value}, ${document.querySelector('#city').value}, ${document.querySelector('#province').value}</p>
        </div>
        <h3>Payment information</h3>
        <div class="payment-info">
            <p>Billed to card number ending in : ${document.querySelector('#ccnum').value.slice(-4)}</p>
        </div>
        <button onclick="alert('Thank you for shopping at Auto-Cart !')">Checkout</button>
    </form>`;
    document.querySelector('.checkout-items').innerHTML = items;
}