const express = require("express");
const app = express();

app.use(express.json());

app.use((req, res) => {
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

    res.send('Header config')
});

module.exports =  app;