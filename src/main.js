import "./main.scss";

import { Header } from "./components/Header/Header";
import { Catalog } from "./components/Catalog/Catalog";
import { Footer } from "./components/Footer/Footer";

const app = document.getElementById("app");

if (!app) {
    throw new Error("App element not found");
}

// Render components
const header = new Header(app);
header.render();

const catalog = new Catalog(app);
catalog.render();

const footer = new Footer(app);
footer.render();

