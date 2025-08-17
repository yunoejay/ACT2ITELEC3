const express = require("express");
const path = require("path");
const ejs = require("ejs");
const app = express();
const port = 8000;

const { products, group, reviews } = require("./mymodule");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

function renderWithLayout(res, view, options = {}) {
  ejs.renderFile(path.join(__dirname, "views", view), options, (err, str) => {
    if (err) return res.status(500).send("Template error: " + err.message);
    res.render("layout", { ...options, body: str });
  });
}

app.get("/", (req, res) => {
  renderWithLayout(res, "index.ejs", { title: "Florist", reviews });
});

app.get("/about", (req, res) => {
  renderWithLayout(res, "about.ejs", { title: "About Us - Florist", group });
});

app.get("/products", (req, res) => {
  renderWithLayout(res, "products.ejs", { title: "Our Flowers", products });
});

app.get("/contact", (req, res) => {
  renderWithLayout(res, "contact.ejs", { title: "Contact Us" });
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log("Message received:", { name, email, message });
  renderWithLayout(res, "contact.ejs", { title: "Contact Us", success: true });
});

app.use((req, res) => {
  renderWithLayout(res, "404.ejs", { title: "404 - Not Found" });
});

app.listen(port, () => {
  console.log(`Florist website running at http://localhost:${port}`);
});
