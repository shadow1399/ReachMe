const express = require('express');

const app = express();
const routes = require("./routes");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.urlencoded());

app.use("/", routes);
app.listen(5000, function (err) {
    if (err) {
        console.log(`Error :${err}`);
        return;
    }
    console.log("Server Is Running");
})