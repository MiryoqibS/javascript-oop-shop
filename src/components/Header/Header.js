import "./Header.scss";
import sprites from "/public/sprites.svg";

export class Header {
    constructor(root) {
        this.root = root;
        this.headerElement = document.createElement("header");
    }

    render() {
        this.headerElement.className = "header container";

        this.headerElement.innerHTML = `
            <nav class="header__menu">
                <a class="header__logo" href="/">
                    <svg width="40" height="32" aria-label="Логотип">
                        <use href="${sprites}#icon-logo"></use>
                    </svg>
                    <svg width="100" height="10" aria-label="Логотип">
                        <use href="${sprites}#icon-logo-title"></use>
                    </svg>
                </a>

                <div class="header__catalog">
                    <button class="header__button button button--secondary" type="button">
                        <svg width="24" height="24" aria-label="Навигация по каталогу">
                            <use href="${sprites}#icon-dropdown"></use>
                        </svg>
                        <p>Каталог<p>
                    </button>
                    <div class="header__search">
                        <input class="header__input" placeholder="Найти товар" />
                        <svg width="24" height="24" aria-label="Поиск товара">
                            <use href="${sprites}#icon-search"></use>
                        </svg>
                    </div>
                </div>
            </nav>

            <div class="header__actions">
                <div class="header-action">
                    <svg width="24" height="24">
                        <use href="${sprites}#icon-dropdown" 
                            class="header-action__icon" 
                            aria-label="Навигация по каталогу">
                        </use>
                    </svg>
                    <p class="header-action__description">Каталог</p>
                </div>
                <div class="header-action">
                    <svg width="22" height="20">
                        <use href="${sprites}#icon-heart" 
                            class="header-action__icon" 
                            aria-label="Избранные товары">
                        </use>
                    </svg>
                    <p class="header-action__description">Избранное</p>
                </div>
                <div class="header-action">
                    <svg width="24" height="24">
                        <use href="${sprites}#icon-box" 
                            class="header-action__icon"
                            aria-label="Заказы">
                        </use>
                    </svg>
                    <p class="header-action__description">Заказы</p>
                </div>
                <div class="header-action cart">
                    <svg width="24" height="24">
                        <use href="${sprites}#icon-shopping-cart" 
                            class="header-action__icon"
                            aria-label="Корзина">
                        </use>
                    </svg>
                    <p class="header-action__description">Корзина</p>
                </div>
                <button class="header__button button button--primary" type="button">
                    <p>Войти</p>
                    <svg width="24" height="24" aria-label="Войти в аккаунт">
                        <use href="${sprites}#icon-log-in"></use>
                    </svg>
                </button>
            </div>
        `;

        this.root.appendChild(this.headerElement);
    }
}