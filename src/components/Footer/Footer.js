import "./Footer.scss";
import logo from "/public/images/footer/footer-logo.png";
import designLogo from "/public/images/footer/logo-zasovskiy.png"
import sprites from "/public/sprites.svg";

export class Footer {
    constructor(root) {
        this.root = root;
        this.footerElement = document.createElement("footer");
    }

    render() {
        // Константы для svg элементов
        const SVG_NS = "http://www.w3.org/2000/svg";
        const XLINK_NS = "http://www.w3.org/1999/xlink";

        this.footerElement.className = "footer";

        const footerContainer = document.createElement("div");
        footerContainer.className = "footer__inner container";

        const footerMenu = document.createElement("div");
        footerMenu.className = "footer__menu";

        // Элемент логотипа
        const footerLogo = document.createElement("a");
        footerLogo.href = "/";
        footerLogo.className = "footer__logo";

        // Фото логотипа
        const logoImage = document.createElement("img");
        logoImage.src = logo;

        // Добавляем фото логотипа в основной блок логотипа
        footerLogo.appendChild(logoImage);

        // Элемент навигации
        const footerNav = document.createElement("nav");
        footerNav.className = "footer__nav";
        const navigationLinks = [
            {
                text: "О компании",
                link: "/about-company",
            },
            {
                text: "Контакты",
                link: "/contacts"
            },
            {
                text: "Вакансии",
                link: "/vacations"
            },
            {
                text: "Статьи",
                link: "/posts",
            },
            {
                text: "Политика обработки данных",
                link: "/data-processing-policy"
            }];

        for (const { text, link } of navigationLinks) {
            const navLink = document.createElement("a");
            navLink.className = "footer__nav-link";
            navLink.href = link;
            navLink.innerText = text;

            footerNav.appendChild(navLink);
        };

        // Социальные сети
        const footerSocials = document.createElement("div");
        footerSocials.className = "footer__socials";
        const socialIcons = [
            `${sprites}#icon-instagram`,
            `${sprites}#icon-twitter`,
            `${sprites}#icon-facebook`,
            `${sprites}#icon-youtube`,
        ];


        for (const icon of socialIcons) {
            const social = document.createElement("a");
            social.className = "footer__socials-link";
            // Ссылок пока нету
            social.href = "#";

            // Иконка социальной сети
            const socialIcon = document.createElementNS(SVG_NS, "svg");
            socialIcon.setAttribute("width", 24);
            socialIcon.setAttribute("height", 24);
            const socialIconUse = document.createElementNS(SVG_NS, "use");
            socialIconUse.setAttributeNS(XLINK_NS, "xlink:href", icon);
            socialIcon.appendChild(socialIconUse);

            social.appendChild(socialIcon);
            footerSocials.appendChild(social);
        };

        // Номер телефона
        const footerPhone = document.createElement("div");
        footerPhone.className = "footer__phone";
        const phoneIcon = document.createElementNS(SVG_NS, "svg");
        phoneIcon.setAttribute("width", 24);
        phoneIcon.setAttribute("height", 24);
        const phoneIconUse = document.createElementNS(SVG_NS, "use");
        phoneIconUse.setAttributeNS(XLINK_NS, "xlink:href", `${sprites}#icon-phone`);
        phoneIcon.appendChild(phoneIconUse);

        footerPhone.appendChild(phoneIcon);
        footerPhone.append("8 800 777 33 33");

        // Дизайнер
        const footerDesign = document.createElement("div");
        footerDesign.className = "footer__design";
        const footerDesignLogo = document.createElement("img");
        footerDesignLogo.src = designLogo;
        footerDesign.append("Дизайн");
        footerDesign.appendChild(footerDesignLogo);

        // Информация
        const footerInfo = document.createElement("div");
        footerInfo.className = "footer__info";
        footerInfo.append(footerSocials, footerPhone);

        // Добавляем дочерние элементы в меню футера
        footerMenu.append(footerLogo, footerNav, footerInfo);

        // Добавляем дочерние элементы в основной футер
        footerContainer.append(footerMenu, footerDesign);
        this.footerElement.appendChild(footerContainer);
        this.root.appendChild(this.footerElement);
    }
}