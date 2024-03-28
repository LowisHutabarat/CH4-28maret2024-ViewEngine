require("dotenv").config()

const express = require("express")
const morgan = require("morgan")
const flash = require("connect-flash")
const session = require("express-session")

const router = require("./routes")

const PORT = process.env.PORT || "8000"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

app.use(
    session({
        secret: "anonym",
        saveUninitialized: true,
        resave: true
    })
);

app.use(flash());

app.use(express.static(`${__dirname}/public`));
app.use(morgan("dev"));
app.use(router);

app.listen(PORT, () => {
console.log(`SERVER JALAN DI PORT : ${PORT}`);
});