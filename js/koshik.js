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
            counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
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
        }

        // Обновляем отображение статуса корзины
        ToogleCartStatus();
        calcCartPrice()
        // Сбрасываем счетчик карточки
        updateCardCounter(productInfo.id, 1);
    }
});

// Обновление статуса корзины
function ToogleCartStatus() {
    const cartEmptyBadge = document.querySelector('[data-cart-empty]');
    if (cartWrapper.children.length > 0) {
        cartEmptyBadge.classList.add('none');
    } else {
        cartEmptyBadge.classList.remove('none');
    }
}

// Обработка изменения количества в карточке или корзине
window.addEventListener('click', function (event) {
    const counterWrapper = event.target.closest('.counter-wrapper');
    if (!counterWrapper) return;

    const counter = counterWrapper.querySelector('[data-counter]');
    const isInCart = !!event.target.closest('.cart-wrapper');

    if (event.target.dataset.action === 'minus') {
        if (parseInt(counter.innerText) > 1) {
            counter.innerText = --counter.innerText;
        } else if (isInCart) {
            // Удаляем товар из корзины, если его количество стало 0
            event.target.closest('.cart-item').remove();
        }
    }


    if (event.target.dataset.action === 'plus') {
        counter.innerText = ++counter.innerText;
    }

    const productId = event.target.closest('[data-id]').dataset.id;

    if (isInCart) {
        // Синхронизация корзина/карточка
        updateCardCounter(productId, parseInt(counter.innerText));
    } else {
        // Синхронизация карточка/корзина
        updateCartCounter(productId, parseInt(counter.innerText));
    }
    calcCartPrice();
    ToogleCartStatus();
});

// Функция для обновления количества в карточке товара
function updateCardCounter(productId, newCounterValue) {
    const card = document.querySelector(`.card[data-id="${productId}"]`);
    if (card) {
        const cardCounter = card.querySelector('[data-counter]');
        cardCounter.innerText = newCounterValue;
    }
}

// Функция для обновления количества в корзине
function updateCartCounter(productId, newCounterValue) {
    const cartItem = cartWrapper.querySelector(`.cart-item[data-id="${productId}"]`);
    if (cartItem) {
        const cartCounter = cartItem.querySelector('[data-counter]');
        cartCounter.innerText = newCounterValue;
    } else if (newCounterValue > 0) {
        // Если товара нет в корзине, добавляем его
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

        // Удаляем товар из корзины
        cartItem.remove();

        // Сбрасываем счетчик в карточке
        updateCardCounter(productId, 1);

        // Обновляем статус корзины и общую стоимость
        ToogleCartStatus();
        calcCartPrice();
    }
});