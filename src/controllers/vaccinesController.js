const Vaccine = require("../models/Vaccine");

const createVaccine = async (req, res) => {
    const { name, expected_date, vaccinated } = req.body;

    try {
        const vaccine = await Vaccine.create({ name, expected_date, vaccinated });
        console.log(`Vaccine ${vaccine.name} created`);
        res.status(201).send(vaccine);

    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

module.exports = {
    createVaccine
}