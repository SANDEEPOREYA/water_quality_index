const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const { vs, vi, calculate_wqi } = require("./formula/calculate");
let userData, wqi;

function getUser(req, res) {
    res.render("user");
}

function getParam(req, res) {
    res.render("inputs");
}

function postUser(req, res) {
    userData = req.body;
    res.render("inputs");
}

function getOutput(req, res) {
    const va = {
        ec: req.body.electrical_conductivity,
        ph: req.body.ph,
        temp: req.body.temperature,
        turb: req.body.turbidity,
        hardness: req.body.hardness,
        alkalinity: req.body.alkalinity,
        do: req.body.dissolved_oxygen,
        bod: req.body.biological_oxygen_demand,
        cod: req.body.chemical_oxygen_demand,
        nh4: req.body.ammonium,
        no3: req.body.nitrate,
        no2: req.body.nitrite,
        po4: req.body.phosphate
    }
    wqi = calculate_wqi(va, vs, vi);
    inputData(req, res, userData);
    res.render("output");
}

router.get("/", getUser);
// router.get("/inputs", getParam);
router.post("/inputs", postUser);
router.post("/inputs/output", getOutput);


const inputData = (req, res, userData) => {
    let data = new User();

    data.name = userData.name;
    data.email = userData.email;
    data.country = userData.country;
    data.phone = userData.phone;

    data.latitude = req.body.latitude;
    data.longitude = req.body.longitude;
    data.color = req.body.color;
    data.taste = req.body.taste;
    data.ph = req.body.ph;
    data.temperature = req.body.temperature;
    data.turbidity = req.body.turbidity;
    data.electrical_conductivity = req.body.electrical_conductivity;
    data.hardness = req.body.hardness;
    data.alkalinity = req.body.alkalinity;
    data.dissolved_oxygen = req.body.dissolved_oxygen;
    data.biological_oxygen_demand = req.body.biological_oxygen_demand;
    data.chemical_oxygen_demand = req.body.chemical_oxygen_demand;
    data.ammonium = req.body.ammonium;
    data.nitrate = req.body.nitrate;
    data.nitrite = req.body.nitrite;
    data.phosphate = req.body.phosphate;
    data.water_quality_index = wqi;

    data.save();
}

module.exports = router;