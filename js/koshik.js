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

ToogleCartStatus()
    }
});

function ToogleCartStatus(){
    const cartWrapper=document.querySelector('.cart-wrapper');
    const cartEmptyBadge = document.querySelector('[data-cart-empty]');
    if(cartWrapper.children.length>0){
        cartEmptyBadge.classList.add('none')
    }
    else{
        cartEmptyBadge.classList.remove('none')
    }
}

window.addEventListener('click', function(event){
    const counterWrapper = event.target.closest('.counter-wrapper');
    const counter = counterWrapper.querySelector('[data-counter]');
    if(event.target.dataset.action === 'minus'){
        if (counter.innerText > 0){
            counter.innerText=--counter.innerText;  
    }}
    if(event.target.dataset.action === 'plus'){
        counter.innerText=++counter.innerText;
    }
    if(event.target.closest('.cart-wrapper')&& parseInt(counter.innerText)===0){
        event.target.closest('.cart-item').remove();
        ToogleCartStatus()
    }
})

