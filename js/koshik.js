const cartWrapper = document.querySelector('.cart-wrapper');

window.addEventListener('click', function (event) {
    if (event.target.hasAttribute('data-cart')) {
        const card = event.target.closest('.card');

        // Збираємо інформацію про товар
        const productInfo = {
            id: card.dataset.id,
            imgSrc: card.querySelector('.product-img').getAttribute('src'),
            title: card.querySelector('.item-title').innerText,
            itemsInBox: card.querySelector('[data-items-in-box]').innerText,
            weight: card.querySelector('.price__weight').innerText,
            price: card.querySelector('.price__currency').innerText,
            counter: card.querySelector('[data-counter]').innerText
        };

        // Перевіряємо, чи є вже такий товар у кошику
        const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);

        if (itemInCart) {
            // Якщо товар вже є у кошику, збільшуємо його кількість
            const counterElement = itemInCart.querySelector('[data-counter]');
            counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
        } else {
            // Якщо товару немає в кошику, додаємо його
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

            // Додаємо товар у кошик
            cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);
        }

        // Оновлюємо статус кошика (порожній/непорожній)
        updateCartStatus();
    }
});

// Функція для оновлення статусу кошика
function updateCartStatus() {
    const cartEmptyBadge = document.querySelector('[data-cart-empty]');
    const cartTotal = document.querySelector('.cart-total');
    const itemsInCart = cartWrapper.querySelectorAll('.cart-item');

    if (itemsInCart.length > 0) {
        cartEmptyBadge.classList.add('d-none');
        cartTotal.classList.remove('d-none');
    } else {
        cartEmptyBadge.classList.remove('d-none');
        cartTotal.classList.add('d-none');
    }
}
