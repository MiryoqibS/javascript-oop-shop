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

        // Секция "Популярные продукты"
        const sectionPopular = this.createSection("Популярные продукты");
        this.popularProducts = sectionPopular.productsContainer;

        // Секция "Техника"
        const sectionTechnology = this.createSection("Техника");
        this.technologyProducts = sectionTechnology.productsContainer;

        // Секция "Для дома"
        const sectionHouse = this.createSection("Для дома");
        this.houseProducts = sectionHouse.productsContainer;

        // Секция "Продукты"
        const sectionProducts = this.createSection("Продукты питания");
        this.productProducts = sectionProducts.productsContainer;

        // Добавляем секции основной блок каталога
        this.catalogElement.append(
            sectionPopular.section,
            sectionTechnology.section,
            sectionHouse.section,
            sectionProducts.section,
        );

        // Добавляем блок каталог в основную разметку
        this.root.appendChild(this.catalogElement);

        // Рендер продуктов в контейнер
        this.loadProducts()
    }

    createSection(sectionTitle) {
        // Константы для svg элементов
        const SVG_NS = "http://www.w3.org/2000/svg";
        const XLINK_NS = "http://www.w3.org/1999/xlink";

        // Блок Секции
        const section = document.createElement("section");
        section.className = "catalog-section";

        // Заголовок секции
        const title = document.createElement("a");
        title.href = "#";
        title.className = "catalog-section__title";

        const arrowIcon = document.createElementNS(SVG_NS, "svg");
        arrowIcon.setAttribute("width", "24");
        arrowIcon.setAttribute("height", "24");

        const arrowIconUse = document.createElementNS(SVG_NS, "use");
        arrowIconUse.setAttributeNS(XLINK_NS, "xlink:href", `${sprites}#icon-arrow-right`);
        arrowIcon.append(arrowIconUse);

        title.append(sectionTitle);
        title.append(arrowIcon);

        // Продукты для секции
        const products = document.createElement("div");
        products.className = "catalog-section__products";

        // Добавляем дочерние элементы в контейнер секции
        section.append(title, products);

        return { section, productsContainer: products };
    };

    async loadProducts(jsonPath = "/src/data/products.json") {
        try {
            const productsContainer = document.querySelector(".catalog-section__products");

            const response = await fetch(jsonPath);
            const products = await response.json();
            console.log(response);

            products.forEach(productInfo => {
                const product = new Product(productInfo);

                if (productInfo.rating >= 4.6) {
                    const productCard = product.render();
                    this.popularProducts.appendChild(productCard);
                };

                if (productInfo.category.includes("Техника")) {
                    const productCard = product.render();
                    this.technologyProducts.appendChild(productCard);
                };

                if (productInfo.category.includes("Дом")) {
                    const productCard = product.render();
                    this.houseProducts.appendChild(productCard);
                };

                if (productInfo.category.includes("Продукты")) {
                    const productCard = product.render();
                    this.productProducts.appendChild(productCard);
                };
            });
        } catch (error) {
            console.log(error);
        }
    }
}