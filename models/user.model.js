const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "why no name?"],
    },
    email: {
        type: String,
        required: [true, "why no email?"]
    },
    country: {
        type: String,
        required: [true, "why no country?"]
    },
    phone: {
        type: Number,
        maxlength: 10,
    },
    latitude: Number,
    longitude: Number,
    ph: Number,
    temperature: Number,
    turbidity: Number,
    electrical_conductivity: Number,
    hardness: Number,
    alkalinity: Number,
    dissolved_oxygen: Number,
    biological_oxygen_demand: Number,
    chemical_oxygen_demand: Number,
    ammonium: Number,
    nitrate: Number,
    nitrite: Number,
    phosphate: Number,
    water_quality_index: Number
});

const User = mongoose.model("Parameter", userSchema);

module.exports = User;