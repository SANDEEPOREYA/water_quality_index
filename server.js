require("./models/db");
const paramCtrl = require("./controllers/userCtrl");
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'static')));

app.set("views", "./views");
app.set("view engine", "ejs");

app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});

app.use("/", paramCtrl);

