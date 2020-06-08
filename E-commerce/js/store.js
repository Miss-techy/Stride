

//if the document is still loading
if (document.readyState == 'loading') {

//add eventListener to the document and run a function called ready 
    document.addEventListener('DOMContentLoaded', ready)

    //if the page done loading
} else {
    //run the ready function
    ready()
}


//create a function to remove an item when a button is clicked
function ready() {

    //get the button attached to the cart items and assign a variable to it
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')

    //loop through all the buttons
    for (var i = 0; i < removeCartItemButtons.length; i++) {

        //assign a variable to whatever element is in the loop currently
        var button = removeCartItemButtons[i]

        //add a click event to remove the cart item
        button.addEventListener('click', removeCartItem)
    }

    //get the class 'car-quantity-input' and assign it a variable
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')

    //loop through the 2
    for (var i = 0; i < quantityInputs.length; i++) {

        //set a variable 'input' to the the current element
        var input = quantityInputs[i]

        //add an EventListener everytime an input changes its value with a function 'quantityChanged'
        input.addEventListener('change', quantityChanged)
    }

    //get the class name 'shop-item-button' and assign it a variable
    var addToCartButtons = document.getElementsByClassName('shop-item-button')

    //loop through the elements
    for (var i = 0; i < addToCartButtons.length; i++) {

        //assign a variable to the current element
        var button = addToCartButtons[i]

        //add a aclick event and an addToCartClicked function
        button.addEventListener('click', addToCartClicked)
    }
    
    //get the first element with the class name btn purchase and add a click event with a function 
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}


//function when an item is purchased
function purchaseClicked() {
    //alert the user
    alert('Thank you for your purchase')

    //delete all the items in the cart
    //get the first element with the class name cart-items
    var cartItems = document.getElementsByClassName('cart-items')[0]

    //while cart items has children
    while (cartItems.hasChildNodes()) {

        //remove the first element
        cartItems.removeChild(cartItems.firstChild)
    }

    //call the function
    updateCartTotal()
}

// function to remove cart item
function removeCartItem(event) {

    //assign a variable to event.target
    var buttonClicked = event.target

    //get the parent element and use the remove function to remove entire cart item
    buttonClicked.parentElement.parentElement.remove()

    //call the updateCartTotal function
    updateCartTotal()
}

//crreate a function when quantity is changed
function quantityChanged(event) {

    //set a variable to the event.target
    var input = event.target

    //check if the valid is valid (if its not a number or less than 1)
    if (isNaN(input.value) || input.value <= 0) {

        //set the input value to 1
        input.value = 1
    }

    //call the function updateCartTotal
    updateCartTotal()
}


//create a function 
function addToCartClicked(event) {

    //assign a variable to event.target
    var button = event.target

    //assign a variable to the parent Element of the button
    var shopItem = button.parentElement.parentElement

    //get the first element of the class name 'shop-item-title' and its inner text and assign it a variable
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText

    //get the first element of the class name 'shop-item-price' and its inner text and assign it a variable
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText

    //get the first element of the class name 'shop-item-image' and its src attribute and assign it a variable
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src

    //call both functions
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}


//create a function with 3 parameters
function addItemToCart(title, price, imageSrc) {

    //create a new element and assign it a variable
    var cartRow = document.createElement('div')

    //add the classList to the cart row 
    cartRow.classList.add('cart-row')

    //get the first element of the class name 'cart-items' and assign it a variable
    var cartItems = document.getElementsByClassName('cart-items')[0]

    //get the name of the cart items
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')

    //loop through the cart item names
    for (var i = 0; i < cartItemNames.length; i++) {

        //if the text current element is equal to the title
        if (cartItemNames[i].innerText == title) {

            //alert the user 
            alert('This item is already added to the cart')

            //return
            return
        }
    }

    //take the content of the cart from the HTML, with back ticks and assign it a variable
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">    
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`

        //set the cartRow.innerHTML to cartRowContents
    cartRow.innerHTML = cartRowContents

    //append cartRow to the end of the cart itemss
    cartItems.append(cartRow)

    //get the fist button with the class name btn danger and add a click event with the function removwCartItem
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)

    //get the first element with the class name cart-quantity-input ann a change event with  a function quantityChanged
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}



//function to update cart total
function updateCartTotal() {

    //get the first element that has the class name 'cart-items' and assign it a variable
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]

    //get the element that has the class name 'cart-row' and assign it a variable
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0

    //loop over the cart rows
    for (var i = 0; i < cartRows.length; i++) {

        //assign a variable to whatever cartRow is on currently
        var cartRow = cartRows[i]

        //get the first element that has the class name 'cart-price' and assign it a variable
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]

        //get the first element with the class name 'cart-quantity-input' and assign it a variable
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]

        //replace the dollar sign with '' and use parseFloat to turn a string into a float(a number with decimals after it) and assign it a var
        var price = parseFloat(priceElement.innerText.replace('$', ''))

        //get the value of the quantity element and assign it a variable
        var quantity = quantityElement.value

        //multipy the price and quantity and add it to the total
        total = total + (price * quantity)
    }

    //rounf the total to the nearest 2 decimal places (multiply the total by 100 and divide it by 100)
    total = Math.round(total * 100) / 100

    //get the first element of class name 'cart-tota;-price' , set the inner text and add the $ sign to the total
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}       
