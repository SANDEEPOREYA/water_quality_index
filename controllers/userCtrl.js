const express = require("express");
const countries = require("../static/json/countries.json");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/user.model");
const calculate_wqi = require("./wqi_formula");
const calculateHazardIndex = require("./hazardIndex_formula");
let userData, wqi;

function getUser(req, res) {
    res.render("user");
}

function postUser(req, res) {
    userData = req.body;
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     const alert = errors.array();

    //     res.render("user", {
    //         alert
    //     });
    // }
    // else {
    //     res.render("input");
    //     console.log(req.body);
    // }
    res.render("input");
    console.log(req.body);
}

function postOutput(req, res) {
    const data = req.body;
    var wqi_list = [];
    var hazard_index_list = [];

    for (var i = 0; i < Object.keys(data).length; i++) {
        const va = {
            temp: parseFloat(data[i].temperature),
            ph: parseFloat(data[i].ph),
            turb: parseFloat(data[i].turbidity),
            ec: parseFloat(data[i].electrical_conductivity),
            hardness: parseFloat(data[i].hardness),
            alkalinity: parseFloat(data[i].alkalinity),
            do: parseFloat(data[i].dissolved_oxygen),
            bod: parseFloat(data[i].biological_oxygen_demand),
            cod: parseFloat(data[i].chemical_oxygen_demand),
            nh4: parseFloat(data[i].ammonium),
            no3: parseFloat(data[i].nitrate),
            no2: parseFloat(data[i].nitrite),
            po4: parseFloat(data[i].phosphate),
            f: parseFloat(data[i].flouride)
        };
        wqi = calculate_wqi(va);
        wqi = wqi.toFixed(4);
        // console.log(req.body[i].latitude, req.body[i].longitude);
        // console.log(wqi);
        wqi_list.push(wqi);
    }

    for (var i = 0; i < Object.keys(data).length; i++) {
        const param =  {
            no3: parseFloat(data[i].nitrate),
            f: parseFloat(data[i].flouride)
        };
        let hazard_index = calculateHazardIndex(param);
        hazard_index_list.push(hazard_index);
    }

    temp = wqi_list;
    wqi_list = [];
    res.send({ data: req.body, wqi_list: temp, hazard: hazard_index_list });
    // inputData(req, res, userData);
    // res.send({ data : encodeURIComponent(JSON.stringify(req.body)) , wqi_list: wqi_list});
}

function getOutput(req, res) {
    res.render("output");
}

router.get("/", getUser);
router.post("/", [
    check('name', 'Name must be more than 3 characters long')
        .exists()
        .isLength({ min: 4 }),
    check('email', 'Email is not valid')
        .isEmail()
        .normalizeEmail(),
    check('country', 'Country input field is empty')
        .exists()
        .isLength({ min: 4 }),
] ,postUser);
router.post("/output", postOutput);
router.get("/output", getOutput);

const inputData = (req, res, userData) => {
    let data = new User();

    data.name = userData.name;
    data.email = userData.email;
    data.country = userData.country;
    data.phone = userData.phone;

    data.latitude = req.body.latitude;
    data.longitude = req.body.longitude;
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