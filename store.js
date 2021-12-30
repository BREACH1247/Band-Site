if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}
function ready(){
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    var book=document.getElementsByClassName('btn-danger').length
    console.log(removeCartItemButtons.length)
    for (var i = 0; i < book; i++){
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem) 
    }

    var quantityInputs=document.getElementsByClassName('cart-quantity-input')
    
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged) 
    }

    var addItemButtons = document.getElementsByClassName('shop-item-button')

    for(var i = 0; i< addItemButtons.length; i++){
        var additem = addItemButtons[i]
        additem.addEventListener('click', addItemButton)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClick)
   
}
function purchaseClick(){
    alert('Thankyou for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    UpdateCartPrice()
}
function addItemtocart(title,price2,image){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = document.getElementsByClassName('cart-item-title')
    for(var i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert('this item is alreaddy added to cart')
            return
        }


        
    }
    var cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image"src=${image} width="50" height="50">
   
        <span  class="cart-item-title">${title}</span>
   </div>
   
    <span class="cart-price cart-column">${price2}</span>
    <div class="cart-item cart-column">
         <input class="cart-quantity-input" type="number" value="1">
          <button class="btn btn-danger cart-quantity-button btn-ram" role="button">REMOVE</button>
    </div>
    `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged)
}

function addItemButton(event){
    var button = event.target
    var shopitem = button.parentElement.parentElement
    var title = shopitem.getElementsByClassName('shop-item-title')[0].innerText
    var price2 = shopitem.getElementsByClassName('shop-item-price')[0].innerText
    var price = parseFloat(price2.replace('$',''))
    var image = shopitem.getElementsByClassName('shop-item-img')[0].src
    console.log(title,price,image)
    addItemtocart(title,price2,image)
    UpdateCartPrice()
}

function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    UpdateCartPrice()

}

function removeCartItem(event){
    var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        UpdateCartPrice()
}

function UpdateCartPrice(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0;
    for(var i = 0;i < cartRows.length;i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
    
        var qunatityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$',''))
        var quantity = qunatityElement.value
        total = total + (price*quantity)

        
    }
    total = Math.round(total*100)/100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}
