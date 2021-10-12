const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/water_quality_parameters");
mongoose.connection.on("connected", () => {
    console.log("connected to mongodb");
});

require("./user.model");