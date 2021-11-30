const express = require("express");
const app = express();

const index = require("./routes/index");
const vaccines = require("./routes/vaccines");

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Controll-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );

    next();
});

app.options("/*", (req,res) => {
    res.header("Access-Conrtol-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers");
    res.header(
        "Access-Controll-Allow-Methods",
        "PUT,POST,GET,DELETE,OPTIONS,PATCH"
    );

    res.send('Headers Settings');
});

app.use("/", index);
app.use("/vaccines", vaccines);

module.exports =  app;