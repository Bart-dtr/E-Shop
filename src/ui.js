const buttons = [...document.querySelectorAll('[data-name]')], basketUl = document.querySelector('.basket-list'),
    buyAllBtn = document.querySelector('.buy-all-in-basket'), basket = new Basket(), createBasketUi = () => {

        basketUl.innerText = '';

        const removeItem = event => {
            const id = Number(event.target.dataset.id);
            basket.remove(id);
            createBasketUi();
        };

        for (const {id,text} of basket.getBasketSummary()) {


            const newLi = document.createElement('li');
            newLi.innerText = text;
            newLi.addEventListener('click',removeItem);
            newLi.dataset.id = id;
            basketUl.appendChild(newLi);
        }
        const basketTotalValue = basket.getTotalValue();
        buyAllBtn.innerText = `Submit your order for ${basketTotalValue.toFixed(2)} zł.`;

        if (basketTotalValue > 0) {
            buyAllBtn.disabled = false;
        } else {
            buyAllBtn.disabled = true;
        }
    }, addProductToBasket = event => {
        const name = event.target.dataset.name;
        const price = Number(event.target.dataset.price);

        const newProduct = new Product(name, price);
        basket.add(newProduct);
        basket.getBasketSummary();
        createBasketUi();

    };

   const buyAllProducts = () => {
       const basketTotalValue = basket.getTotalValue();
       alert(`Value of purchased products ${basketTotalValue.toFixed(2)}zł.`);
        basket.clear();
       createBasketUi();
    };


for (const button of buttons) {
    button.addEventListener('click', addProductToBasket);
}



buyAllBtn.addEventListener('click', buyAllProducts);

createBasketUi();

