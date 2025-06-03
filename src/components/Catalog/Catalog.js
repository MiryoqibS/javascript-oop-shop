import "./Catalog.scss";
import sprites from "/public/sprites.svg";
import { Product } from "../Product/Product.js";

export class Catalog {
    constructor(root) {
        this.root = root;
        this.catalogElement = document.createElement("div");
    }

    render() {
        this.catalogElement.className = "catalog container";

        // Популярные товары
        const popularProducts = document.createElement("div");
        popularProducts.className = "catalog-section";
        popularProducts.innerHTML = `
        <a href="#" class="catalog-section__title">
            Популярное
            <svg width="24" height="24">
                <use href="${sprites}#icon-arrow-right"/>
            </svg>
        </a>

        <div class="catalog-section__products"></div>
        `;

        this.catalogElement.append(popularProducts);

        this.root.appendChild(this.catalogElement);

        // Рендер продуктов в контейнер
        this.loadProducts()
    }

    async loadProducts(jsonPath = "/src/data/products.json") {
        try {
            const productsContainer = document.querySelector(".catalog-section__products");

            const response = await fetch(jsonPath);
            const products = await response.json();
            console.log(response);

            products.forEach(productInfo => {
                const product = new Product(productInfo);
                const productCard = product.render();
                productsContainer.appendChild(productCard);
            });
        } catch (error) {
            console.log(error);
        }
    }
}