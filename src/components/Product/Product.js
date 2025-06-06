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
        // Link for svg elements
        const SVG_NS = "http://www.w3.org/2000/svg";
        const XLINK_NS = "http://www.w3.org/1999/xlink";

        const productElement = document.createElement("article");
        productElement.className = "catalog-section__product product";

        // Product header
        const productHeader = document.createElement("div");
        productHeader.className = "product__header";

        // Product image
        const productImage = document.createElement("img");
        productImage.className = "product__image";
        productImage.src = this.image;
        productHeader.append(productImage);

        productElement.append(productHeader);

        // Product verify
        if (this.isOriginal) {
            const productVerify = document.createElement("span");
            productVerify.className = "product__original";

            const verifyIcon = document.createElementNS(SVG_NS, "svg");
            verifyIcon.setAttribute("width", "12");
            verifyIcon.setAttribute("height", "12");

            const verifyIconUse = document.createElementNS(SVG_NS, "use");
            verifyIconUse.setAttributeNS(XLINK_NS, "xlink:href", `${sprites}#icon-verify`);
            verifyIcon.appendChild(verifyIconUse);

            const productVerifyText = document.createElement("p");
            productVerifyText.innerText = "оригинал";

            productVerify.append(verifyIcon, productVerifyText);

            productHeader.append(productVerify);
        };

        // Product body
        const productBody = document.createElement("div");
        productBody.className = "product__body";

        // Product price
        const productPrice = document.createElement("p");
        productPrice.className = "product__price";
        productPrice.innerText = `${this.price}₽`;

        // Product title
        const productTitle = document.createElement("h3");
        productTitle.className = "product__title";
        productTitle.innerText = this.title;

        // Product rating
        const productRating = document.createElement("div");
        productRating.className = "product__rating";

        const starIcon = document.createElementNS(SVG_NS, "svg");
        starIcon.setAttribute("width", "12");
        starIcon.setAttribute("height", "12");

        const starIconUse = document.createElementNS(SVG_NS, "use");
        starIconUse.setAttributeNS(XLINK_NS, "xlink:href", `${sprites}#icon-star`);
        starIcon.append(starIconUse);
        productRating.append(starIcon);

        const productRatingText = document.createElement("p");
        productRatingText.innerText = this.rating;
        productRating.append(productRatingText);


        // Product button
        let inCart = this.storage.getFromStorage("cart").includes(this.id);
        const productButton = document.createElement("button");
        productButton.classList.add("button");
        productButton.classList.add("product__button");
        productButton.classList.add("outline");

        if (inCart) {
            productButton.classList.add("button--primary");
            productButton.innerText = "Удалить с корзины";
        } else {
            productButton.classList.add("button--secondary");
            productButton.innerText = "В корзину";
        };

        productButton.addEventListener("click", (event) => this.addToCart(event));

        productBody.append(productPrice, productTitle, productRating, productButton);

        // Add header, body elements
        productElement.append(productHeader, productBody);

        return productElement;
    }


    addToCart(event) {
        let prevProducts = this.storage.getFromStorage("cart");

        if (!Array.isArray(prevProducts)) {
            prevProducts = [];
        };

        if (!prevProducts.includes(this.id)) {
            // Add button
            prevProducts.push(this.id);
            this.storage.saveToStorage("cart", prevProducts);
            event.target.classList.remove("button--secondary");
            event.target.classList.add("button--primary");
            event.target.innerText = "Удалить с корзины"
        } else {
            // Remove button
            const newProducts = prevProducts.filter(id => id !== this.id);
            this.storage.saveToStorage("cart", newProducts);
            event.target.classList.remove("button--primary");
            event.target.classList.add("button--secondary");
            event.target.innerText = "В корзину";
        };
    }
}