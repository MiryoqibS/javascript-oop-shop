import "./Footer.scss";

export class Footer {  
    constructor(root) {
        this.root = root;
        this.footerElement = document.createElement("footer");
    }

    render() {
        this.footerElement.className = "footer";

        this.root.appendChild(this.footerElement);
    }
};