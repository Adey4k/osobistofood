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
