const cartWrapper = document.querySelector('.cart-wrapper');

// Обробка "Додати в корзину"
window.addEventListener('click', function (event) {
    if (event.target.hasAttribute('data-cart')) {
        const card = event.target.closest('.card');

        const productInfo = {
            id: card.dataset.id,
            imgSrc: card.querySelector('.product-img').getAttribute('src'),
            title: card.querySelector('.item-title').innerText,
            itemsInBox: card.querySelector('[data-items-in-box]').innerText,
            weight: card.querySelector('.price__weight').innerText,
            price: card.querySelector('.price__currency').innerText,
            counter: card.querySelector('[data-counter]').innerText
        };

        const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);

        if (itemInCart) {
            const counterElement = itemInCart.querySelector('[data-counter]');
            const newCounterValue = parseInt(counterElement.innerText) + 1;
        
            counterElement.innerText = newCounterValue;
        
        } else {
            const cartItemHTML = `
                <div class="cart-item" data-id="${productInfo.id}">
                    <div class="cart-item__top">
                        <div class="cart-item__img">
                            <img src="${productInfo.imgSrc}" alt="${productInfo.title}">
                        </div>
                        <div class="cart-item__desc">
                            <div class="cart-item__title">${productInfo.title}</div>
                            <div class="cart-item__weight">${productInfo.itemsInBox} / ${productInfo.weight}</div>
                            <div class="cart-item__details">
                                <div class="items items--small counter-wrapper">
                                    <div class="items__control" data-action="minus">-</div>
                                    <div class="items__current" data-counter>${productInfo.counter}</div>
                                    <div class="items__control" data-action="plus">+</div>
                                </div>
                                <div class="price">
                                    <div class="price__currency">${productInfo.price}</div>
                                </div>
                                <button class="btn btn-danger btn-sm remove-item">×</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        
            cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);
        
            // Синхронізуємо з карткою товару
            updateCardCounter(productInfo.id, parseInt(productInfo.counter));
        }
        calcCartPrice()
    }
    ToogleCartStatus();
});

// Оновлення статусу корзини
function ToogleCartStatus() {
    const cartEmptyBadge = document.querySelector('[data-cart-empty]');
    const orderButton = document.querySelector('#order-form .btn-primary'); 

    if (cartWrapper.children.length > 0) {
        cartEmptyBadge.classList.add('none');
        orderButton.disabled = false; 
    } else {
        cartEmptyBadge.classList.remove('none');
        orderButton.disabled = true; 
    }
}


//Зміна лічільника для каруселі та корзини
window.addEventListener('click', function (event) {
    const counterWrapper = event.target.closest('.counter-wrapper');
    if (!counterWrapper) return;

    const counter = counterWrapper.querySelector('[data-counter]');
    const isInCart = !!event.target.closest('.cart-wrapper');

    if (event.target.dataset.action === 'minus') {
        if (parseInt(counter.innerText) > 1) {
            counter.innerText = --counter.innerText;
        } else if (isInCart) {
            event.target.closest('.cart-item').remove();
        }
    }


    if (event.target.dataset.action === 'plus') {
        counter.innerText = ++counter.innerText;
    }

    const productId = event.target.closest('[data-id]').dataset.id;

    //Синхронізація лічильників в каруселі і магазині
    if (isInCart) {
        updateCardCounter(productId, parseInt(counter.innerText));
    } else {
        updateCartCounter(productId, parseInt(counter.innerText));
    }
    calcCartPrice();
    ToogleCartStatus();
});

function updateCardCounter(productId, newCounterValue) {
    const card = document.querySelector(`.card[data-id="${productId}"]`);
    if (card) {
        const cardCounter = card.querySelector('[data-counter]');
        cardCounter.innerText = newCounterValue;
    }
}

function updateCartCounter(productId, newCounterValue) {
    const cartItem = cartWrapper.querySelector(`.cart-item[data-id="${productId}"]`);
    if (cartItem) {
        const cartCounter = cartItem.querySelector('[data-counter]');
        cartCounter.innerText = newCounterValue;
    } else if (newCounterValue > 0) {
        const card = document.querySelector(`.card[data-id="${productId}"]`);
        if (card) {
            const productInfo = {
                id: card.dataset.id,
                imgSrc: card.querySelector('.product-img').getAttribute('src'),
                title: card.querySelector('.item-title').innerText,
                itemsInBox: card.querySelector('[data-items-in-box]').innerText,
                weight: card.querySelector('.price__weight').innerText,
                price: card.querySelector('.price__currency').innerText,
                counter: newCounterValue
            };

            const cartItemHTML = `
                <div class="cart-item" data-id="${productInfo.id}">
                    <div class="cart-item__top">
                        <div class="cart-item__img">
                            <img src="${productInfo.imgSrc}" alt="${productInfo.title}">
                        </div>
                        <div class="cart-item__desc">
                            <div class="cart-item__title">${productInfo.title}</div>
                            <div class="cart-item__weight">${productInfo.itemsInBox} / ${productInfo.weight}</div>
                            <div class="cart-item__details">
                                <div class="items items--small counter-wrapper">
                                    <div class="items__control" data-action="minus">-</div>
                                    <div class="items__current" data-counter>${productInfo.counter}</div>
                                    <div class="items__control" data-action="plus">+</div>
                                </div>
                                <div class="price">
                                    <div class="price__currency">${productInfo.price}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);
        }
    }
    ToogleCartStatus();
}
function calcCartPrice() {
    const cartItems = cartWrapper.querySelectorAll('.cart-item');
    const totalPriceEl = document.querySelector('.total-price');
    let totalPrice = 0;

    cartItems.forEach(item => {
        const priceElement = item.querySelector('.price__currency');
        const amountElement = item.querySelector('[data-counter]');

        const price = parseInt(priceElement.innerText.replace(/\D/g, ''));
        const amount = parseInt(amountElement.innerText);

        totalPrice += price * amount;
    });

    totalPriceEl.innerText = `${totalPrice}`;
}


cartWrapper.addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-item')) {
        const cartItem = event.target.closest('.cart-item');
        const productId = cartItem.dataset.id;
        cartItem.remove();
        updateCardCounter(productId, 1);
        ToogleCartStatus();
        calcCartPrice();
    }
});