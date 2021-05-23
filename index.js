const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();
const routes = require("./routes");
const db = require("./config/mongoose");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.urlencoded());
app.use(cookieParser());
app.use("/", routes);
app.listen(5000, function (err) {
    if (err) {
        console.log(`Error :${err}`);
        return;
    }
    console.log("Server Is Running");
})