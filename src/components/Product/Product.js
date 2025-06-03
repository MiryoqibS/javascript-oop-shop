import "./Product.scss";
import sprites from "/public/sprites.svg";
import { LocalStorageUtil } from "../../utils/LocalStorageUtil";

export class Product {
    constructor(product) {
        this.id = product.id;
        this.description = product.description;
        this.category = product.category;
        this.price = product.price;
        this.title = product.title;
        this.image = product.image;
        this.isOriginal = product.isOriginal || false;
        this.rating = product.rating;

        this.storage = new LocalStorageUtil();
    }

    render() {
        const productElement = document.createElement("article");
        productElement.className = "catalog-section__product product";
        productElement.innerHTML = `
            <div class="product__header">
                <img src="${this.image}" class="product__image"/>
                ${this.isOriginal ? ` 
                <span class="product__original">
                    <svg width="12" height="12">
                        <use href="${sprites}#icon-verify"/>
                    </svg>
                    Оригинал
                </span>` : ""}
            </div>
            <div class="product__body">
                <p class="product__price">${this.price} ₽</p>
                <h3 class="product__title">${this.title}</h3>
                <div class="product__rating">
                    <svg width="12" height="12">
                        <use href="${sprites}#icon-star"/>
                    </svg>
                    <p>${this.rating}</p>
                </div>
                <button 
                    class="product__button button button--secondary button--outline">
                    ${this.storage.getFromStorage("cart").includes(this.id) ? "Удалить с корзины" : "В корзину"}</button>
            </div>
        `;

        const button = productElement.querySelector(".product__button");
        button.addEventListener("click", (event) => this.addToCart(event));

        return productElement;
    }


    addToCart(event) {
        let prevProducts = this.storage.getFromStorage("cart");

        if (!Array.isArray(prevProducts)) {
            prevProducts = [];
        };

        if (!prevProducts.includes(this.id)) {
            prevProducts.push(this.id);
            this.storage.saveToStorage("cart", prevProducts);
            event.target.innerHTML = "Удалить с корзины"
        } else {
            const newProducts = prevProducts.filter(id => id !== this.id);
            this.storage.saveToStorage("cart", newProducts);
            event.target.innerHTML = "В корзину"
        };

    }
}