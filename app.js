const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

const userRoutes = require("./api/routes/user");

app.use(morgan("dev"));

app.use(express.json({}));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use("/user", userRoutes);

//handle error
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

module.exports = app;