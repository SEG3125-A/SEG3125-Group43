// Function to remove an item from the cart
function removeItem(cart, index) {
    total -= cart[index].price;
    total = parseFloat(total.toFixed(2));
    if (total < 0) total = 0;
    cart[index].inCart = false;
    cart.splice(index, 1);
    loadCartPage();
}

function increaseItem(index){
    cart[index].amount++;
    total+= cart[index].price;
    total = parseFloat(total.toFixed(2));
    console.log(total);

    document.querySelector('.'+cart[index].item+'-quantity').innerHTML = `Quantity: ${cart[index].amount}`;
    document.querySelector('.total').innerHTML = `Total: \$${total.toFixed(2)}`;
}

function decreaseItem(index){
    total -= cart[index].price;
    total = parseFloat(total.toFixed(2));
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
