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
    }
})

