
let shopElement = document.getElementById('shop');
let mainCartElement = document.getElementById('main-cart-icon');
let cartCloseElement = document.getElementById('cart-close-icon');
let cartSectionElement = document.getElementById('cart-section');
let cartItemsElement = document.getElementById('cart-items');
let menuCartNumberElement = document.querySelector('.cart-number');
let checkoutButton = document.getElementById('checkout-btn');
let cartActionElement = document.querySelector('.cart-action');
let itemCountElement = document.getElementById('item-count');
let totalPriceElement = document.getElementById('sub-total-price');
let typeAllElement = document.getElementById('type-all');

mainCartElement.addEventListener('click', () => {
    cartSectionElement.classList.remove('cart-remove');
    cartSectionElement.classList.add('cart-section');
});

cartCloseElement.addEventListener('click', () => {
    cartSectionElement.classList.remove('cart-section')
    cartSectionElement.classList.add('cart-remove');
});

document.addEventListener('DOMContentLoaded', () => {

    typeAllElement.style.borderBottom = "2px solid red";
    typeAllElement.style.fontSize = "23px";

    if(JSON.parse(localStorage.getItem('cart'))){
        updateCartFromLocalSorage();
    }else {
        cartArray=[]
    }

});

/*Generate Each item in the shop panel*/
let generateShopItem = (type) => {
    let filteredProducts = type === "All" ? products : products.filter(product => product.type === type);

    shopElement.innerHTML = filteredProducts.map((item) => {
        const sizes = item.size.map((size) => {
            return `<option value=${size}>${size}</option>`;
        }).join("");

        const colors = item.color.map((color) => {
            return `<option value=${color}>${color}</option>`;
        }).join("");

        return `
        <div class="item" data-item-id="${item.id}">
            <img src=${item.src} alt="seashell" class="product-image">
            <div class="details">
                <h3 class="product-title">${item.title}</h3>
                <p class="product-description">${item.description}</p>
                <div class="product-option">
                    <div class="color">
                        <label>Color</label>
                        <select class="color-select">${colors}</select>
                    </div>
                    <div class="size">
                        <label>Size</label>
                        <select class="size-select">${sizes}</select>
                    </div>
                    <div class="qty">
                        <label class="stock-label">Instock :</label>
                        <div class="instock">${item.quantities[item.size[0]][item.color[0]]}</div>
                    </div>
                </div>
                <div class="price-and-button">
                    <h2><span>$</span><span class="price">${item.prices[item.size[0]][item.color[0]]}</span></h2>
                    <div class="add-to-cart">
                        <button class="btn-add-cart"><i class="bi bi-cart-check-fill"></i>Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>`;
    }).join("");

    // Attach event listeners for color and size changes
    attachChangeEventListeners();
    addtachAddtoCatButtonEventListner();
    updateInstockLabels();
    disableCheckount();
}

// Update instock and price when size or color changes
function attachChangeEventListeners() {
    document.querySelectorAll('.color-select, .size-select').forEach((select) => {
        select.addEventListener('change', (event) => {
            const item = event.target.closest('.item');
            const color = item.querySelector('.color-select').value;
            const size = item.querySelector('.size-select').value;
            const currentID = item.dataset.itemId;
            const selectedItem = products.find(item => item.id == currentID);
            let instock = item.querySelector('.instock').textContent = selectedItem.quantities[size][color];
            let price = item.querySelector('.price').textContent = selectedItem.prices[size][color];
            updateInstockLabels();
        });
    });
}

// Update shop items when type is clicked
const selectedTypeElement = document.querySelectorAll('#type-all, #type-scuba, #type-craft,#type-shell');
selectedTypeElement.forEach((selectType) => {
    selectType.addEventListener('click', (event) => {
        let type = event.target.innerText;
        generateShopItem(type);

        // Highlight the clicked type and remove highlight from others
        selectedTypeElement.forEach(element => {
            element.style.borderBottom = "none";
            element.style.fontSize = "20px";
        });
        event.target.style.borderBottom = "2px solid red";
        event.target.style.fontSize = "23px";
    });
});

// Initially load all products
generateShopItem("All");

//Add to Cart Process
let cartArray = JSON.parse(localStorage.getItem('cart'));

//updateCart()
function updateCartFromLocalSorage() {
    localStorage.setItem('cart', JSON.stringify(cartArray))
    renderProductsInCart();
    updateCartCount();
    updateTotalPrice();
    disableCheckount();
    updateInstockLabels();
}


//check items is already exist in Cart Array
function isItemExist(item) {
    return cartArray.some(product => product.uniqueID == item.uniqueID);
}

//update Add to Cart Button when change type
function addtachAddtoCatButtonEventListner() {
    document.querySelectorAll('.btn-add-cart').forEach((btnElement) => {
        btnElement.addEventListener('click', (event) => {
            const clickBtnElement = event.target;
            const item = clickBtnElement.closest('.item');
            const itemId = item.dataset.itemId;
            const size = item.querySelector('.size-select').value;
            const color = item.querySelector('.color-select').value;
            const uniqueID = itemId + "+" + size + "+" + color;

            const selectItem = products.find(item => item.id == itemId);
            const unitPrice = parseInt(selectItem.prices[size][color]);
            const stockCount = parseInt(selectItem.quantities[size][color])

            const productIndexOfProductArray = products.findIndex(item => item.id == itemId)


            let instockount = 1;

            if (stockCount > 0) {
                let newItem = {
                    id: itemId,
                    title: selectItem.title,
                    src: selectItem.src,
                    size: size,
                    color: color,
                    price: parseInt(selectItem.prices[size][color]),
                    qty: 1,
                    uniqueID: uniqueID
                }
                const productInCartArray = cartArray.find(item => item.uniqueID == uniqueID)
                const existItemIndexInCartArray = cartArray.findIndex(item => item.uniqueID == uniqueID);

                if (isItemExist(newItem)) {

                    const updatedQty = productInCartArray.qty + 1;
                    const updatedPrice = unitPrice * updatedQty;
                    newItem = {
                        ...newItem,
                        qty: updatedQty,
                        price: updatedPrice
                    }
                    cartArray[existItemIndexInCartArray] = newItem

                    updateCartFromLocalSorage()

                } else {
                    cartArray.push(newItem);
                    // localStorage.setItem('cart',JSON.stringify(cartArray))
                    updateCartFromLocalSorage()

                }
                renderProductsInCart();
                updateCartCount();
                updateTotalPrice();
                disableCheckount();
                products[productIndexOfProductArray].quantities[size][color] -= 1
                instockount--
                item.querySelector('.instock').textContent = (products[productIndexOfProductArray].quantities[size][color]) - instockount;
                if (((products[productIndexOfProductArray].quantities[size][color]) - instockount) == 0) {
                    updateInstockLabels();
                }
            } else {
                item.querySelector('.instock').textContent = "Out of Stock"
                alert("Out Of Stock")
            }

        })
    })
}

//update instock label and Add to Cart Button after stock is 0
function updateInstockLabels() {
    document.querySelectorAll('.item').forEach((item) => {
        const size = item.querySelector('.size-select').value;
        const color = item.querySelector('.color-select').value;
        const instockElement = item.querySelector('.instock');
        const itemId = item.dataset.itemId;
        const selectedItem = products.find(item => item.id == itemId);
        const instockCount = selectedItem.quantities[size][color];
        const instockLableElement = item.querySelector('.stock-label');
        const btnElement = item.querySelector('.btn-add-cart');

        if (instockCount === 0) {
            instockLableElement.style.display = "none";
            instockElement.textContent = "Out of Stock";
            instockElement.style.color = "red";
            btnElement.style.opacity = "0.5"
            btnElement.style.backgroundColor = "#496989"
            btnElement.style.cursor = "none"
            btnElement.disabled = true;
        } else {
            instockElement.textContent = instockCount;
            instockLableElement.style.display = "block";
            instockElement.style.color = "#496989";
            btnElement.style.opacity = "1"
            btnElement.style.backgroundColor = "#41C9E2"
            btnElement.style.cursor = "pointer"
            btnElement.disabled = false;
        }
    });
}

//After stock is 0, Add to Cart button action disable
function renderProductsInCart() {
    return (cartItemsElement.innerHTML = cartArray.map((item) => {
        return `
               <div class="cart-item">
                <div class="remove-item" data-set-id="${item.uniqueID}" onclick="deleteItemInCart('${item.uniqueID}')">
                    <span><i class="bi bi-x"></i></span>
                </div>
                <div class="item-img">
                    <img src="${item.src}" alt="seashell">
                </div>
                <div class="item-desc">
                    <p>${item.title}</p>
                    <div class="option-details">
                        <p>Color :<span>${item.color}</span></p>
                        <p>Size :<span>${item.size}</span></p>
                    </div>
                    <div class="item-qty">
                        <strong><span>$</span>${item.price}</strong>
                        <div class="control-qty">
                            <span class="qty-minus" onclick="mangeCartItem('${item.uniqueID}','minus')">-</span>
                            <span>${item.qty}</span>
                            <span class="qty-plus" onclick="mangeCartItem('${item.uniqueID}','plus')">+</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    }).join(""))
}

//update item count in cart notification
function updateCartCount() {
    let itemCount = 0;
    cartArray.forEach((item) => {
        itemCount += item.qty
    })
    menuCartNumberElement.textContent = itemCount;
    itemCountElement.textContent = itemCount
}

//Update Total Price in cart
function updateTotalPrice() {
    let totalPrice = 0;
    cartArray.forEach((item) => {
        totalPrice += item.price
    })
    totalPriceElement.textContent = totalPrice;
}

//Disable Checkout button if products not available in cart
function disableCheckount() {
    if (itemCountElement.textContent == 0) {
        cartActionElement.style.display = "none"
    } else {
        cartActionElement.style.display = "flex"
    }
}

//Delete item in cart
function deleteItemInCart(uniqueId) {
    const index = cartArray.findIndex(item => item.uniqueID === uniqueId);
    const selectItem = cartArray.find(item => item.uniqueID == uniqueId);
    const qty = selectItem.qty;

    if (index !== -1) {
        cartArray.splice(index, 1);

        const size = selectItem.size;
        const color = selectItem.color;
        const product = products.find(item => item.id === selectItem.id);
        if (product) {
            product.quantities[size][color] += parseInt(qty);
            updateInstockLabels();
        }

        updateCartFromLocalSorage();

        renderProductsInCart();
        updateCartCount();
        updateTotalPrice();
        disableCheckount();
    }
}

//cart item manage
function mangeCartItem(uniqueId, clickIconName) {

    const index = cartArray.findIndex(item => item.uniqueID === uniqueId);
    const selectItem = cartArray.find(item => item.uniqueID == uniqueId);
    let qty = selectItem.qty;
    const size = selectItem.size;
    const color = selectItem.color;

    const product = products.find(item => item.id === selectItem.id);
    let unitPrice = product.prices[size][color];


    if (clickIconName == "plus") {
        if (product.quantities[size][color] > 0) {
            qty += 1;
            cartArray[index] = {
                ...selectItem,
                qty: qty,
                price: unitPrice * qty
            }
            product.quantities[size][color] -= 1;

            updateCartFromLocalSorage();

            updateInstockLabels();
            renderProductsInCart();
            updateCartCount();
            updateTotalPrice();
            disableCheckount();
        }
    } else if (clickIconName == "minus") {
        qty -= 1
        cartArray[index] = {
            ...selectItem,
            qty: qty,
            price: unitPrice * qty
        }
        product.quantities[size][color] += 1;

        updateCartFromLocalSorage();

        updateInstockLabels();
        renderProductsInCart();
        updateCartCount();
        updateTotalPrice();
        disableCheckount();
        if (qty == 0) {
            deleteItemInCart(uniqueId);
        }
    }

}

checkoutButton.addEventListener('click',()=>{

})
