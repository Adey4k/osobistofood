document.addEventListener('DOMContentLoaded', function () {
    ToogleCartStatus();
    const modal = document.getElementById('order-modal');
    const orderButton = document.querySelector('#order-form .btn-primary'); // Кнопка "Замовити"
    const closeModal = modal.querySelector('.close');
    const orderDetails = document.getElementById('order-details');

    // Функція для заповнення модального вікна
    function updateOrderDetails() {
        const cartItems = document.querySelectorAll('.cart-item');
        const totalPrice = document.querySelector('.total-price').innerText;
        const deliveryCost = document.querySelector('.delivery-cost').innerText;
    
        let orderHTML = `<h4>Ваше замовлення:</h4><ul class="list-group mb-3">`;
    
        cartItems.forEach(item => {
            const title = item.querySelector('.cart-item__title').innerText;
            const counter = parseInt(item.querySelector('[data-counter]').innerText);
            const pricePerItem = parseInt(item.querySelector('.price__currency').innerText.replace(/\D/g, ''));
            const totalItemPrice = pricePerItem * counter; // Рассчитываем итоговую цену для позиции
    
            orderHTML += `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${title} (${counter} шт.) 
                    <span>${pricePerItem} грн. (${totalItemPrice} грн.)</span>
                </li>`;
        });
    
        orderHTML += `</ul>
            <p><strong>Доставка:</strong> ${deliveryCost}</p>
            <p><strong>Загальна сума:</strong> ${totalPrice} грн.</p>`;
    
        orderDetails.innerHTML = orderHTML;
    }

    // Відкриття модального вікна
    orderButton.addEventListener('click', function (event) {
        event.preventDefault();
        updateOrderDetails();
        modal.style.display = 'block';
    });

    // Закриття модального вікна
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Закриття форми при натисканні на пустий простір
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

// Відправка форми
modal.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); 
    alert('Замовлення прийнято! Дякуємо!');
    const orderForm = modal.querySelector('form'); 
    orderForm.reset(); 
    modal.style.display = 'none'; 
    cartWrapper.innerHTML = '';
    ToogleCartStatus();
    const totalPrice = document.querySelector('.total-price');
    totalPrice.innerText = '0';
});
});
