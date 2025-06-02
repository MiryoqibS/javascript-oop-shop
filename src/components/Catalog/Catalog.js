import "./Catalog.scss";

export class Catalog {
    constructor(root) {
        this.root = root;
        this.catalogElement = document.createElement("div");
    }

    render() {
        this.catalogElement.className = "catalog";

        this.root.appendChild(this.catalogElement);
    }
}