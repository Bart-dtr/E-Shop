const addProductForm = document.querySelector('.form-add-products');

const nameImput = document.querySelector('[name="product-name"]');
const priceImput = document.querySelector('[name="product-price"]');
const productsUl = document.querySelector('.products-list');

const saveProductsToLocalStorage = (name, price) => {
    const productList = JSON.parse(localStorage.getItem('shop-products')) ?? [];
    productList.push({name,price});
    localStorage.setItem('shop-products', JSON.stringify(productList));
};



const addProductToShop = (name, price) => {
    const newLi = document.createElement('li');
    const newStrong = document.createElement('strong');
    newStrong.innerText = name;
    const newPriceText = document.createTextNode(`-${price.toFixed(2)}`);
    const newBtn = document.createElement('button');

    newBtn.classList.add('btn-buy-product');
    newBtn.dataset.name = name;
    newBtn.dataset.price = String(price);
    newBtn.innerText = 'Buy !';
    newBtn.addEventListener('click', addProductToBasket);

    newLi.appendChild(newStrong);
    newLi.appendChild(newPriceText);
    newLi.appendChild(newBtn);

    productsUl.appendChild(newLi);


};

const loadProductsFromLocalStorage = () => {
    const productList = JSON.parse(localStorage.getItem('shop-products')) ?? [];

    for(const {name, price} of productList) {
        addProductToShop(name, price);
    }
};

const handleAddProductsFormSubmit = event => {
    event.preventDefault();

    const nameFromInput = nameImput.value;
    const priceFromInput = Number(priceImput.value);

    addProductToShop(nameFromInput, priceFromInput);
    saveProductsToLocalStorage(nameFromInput,priceFromInput);
};


addProductForm.addEventListener('submit',handleAddProductsFormSubmit);

loadProductsFromLocalStorage();