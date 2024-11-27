document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('order-modal');
    const orderButton = document.querySelector('#order-form .btn-primary'); // Кнопка "Замовити"
    const closeModal = modal.querySelector('.close');

    // Открытие модального окна
    orderButton.addEventListener('click', function (event) {
        event.preventDefault(); // Отменяем стандартное поведение кнопки
        modal.style.display = 'block';
    });

    // Закрытие модального окна (крестик)
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Закрытие модального окна при клике на затемненный фон
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Обработка отправки формы
    modal.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault(); // Предотвращаем отправку формы

        // Здесь можно добавить логику для обработки данных формы
        alert('Замовлення прийнято! Дякуємо!');
        modal.style.display = 'none'; // Закрываем модальное окно
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('order-modal');
    const orderButton = document.querySelector('#order-form .btn-primary');
    const closeModal = modal.querySelector('.close');
    const orderDetails = document.getElementById('order-details');

    // Функция для заполнения модального окна
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
    

    // Открытие модального окна
    orderButton.addEventListener('click', function (event) {
        event.preventDefault();
        updateOrderDetails();
        modal.style.display = 'block';
    });

    // Закрытие модального окна
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Закрытие при клике на фон
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Обработка отправки формы
    modal.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();
        alert('Замовлення прийнято! Дякуємо!');
        modal.style.display = 'none';
    });
});