const Vaccine = require("../models/Vaccine");

const sendErrorMessage = (error, res) => {
    res.status(500).send({message: error})
}

const createVaccine = async (req, res) => {
    const { name, expected_date, vaccinated } = req.body;

    try {
        const vaccine = await Vaccine.create({ name, expected_date, vaccinated });
        console.log(`Vaccine ${vaccine.name} created`);

        res.status(201).send(vaccine);

    } catch (error) {
        sendErrorMessage(error, res);
    }
};

const getAllVaccines = async (req, res) => {
    const { vaccinated } = req.query;

    try {
        const where =  vaccinated ? { where: { vaccinated } } : {}
        const vaccine = await Vaccine.findAll(where);

        if(!vaccine && vaccine.length < 0) {
            return res.status(204).send();
        }

        res.status(200).send(vaccine);

    } catch (error) {
        sendErrorMessage(error, res);
    }
};

const getVaccine = async (req, res) => {
    const { id: idVaccine } = req.params;

    try {
        const vaccine = await Vaccine.findOne({
            where: { id: idVaccine }
        });

        if(!vaccine){
            return res.status(404).send({ message: `Didn't find vaccine's id = ${idVaccine}.`});
        }

        res.status(200).send(vaccine);

    } catch(error) {
        sendErrorMessage(error,res);
    }
};

const updateVaccineInDB = async ({ idVaccine, name, expected_date, vaccinated }) => {
    const rowsUpdated = await Vaccine.update({ name, expected_date, vaccinated }, {
        where: { id: idVaccine}
    });

    return (rowsUpdated && rowsUpdated[0] > 0) ? true : false
}

const updateVaccine = async (req, res) => {
    const { id: idVaccine } = req.params;
    const { name, expected_date, vaccinated } = req.body;

    try {
        const vaccineUpdated = await updateVaccineInDB({ idVaccine, name, expected_date, vaccinated });

        if(!vaccineUpdated) {
            return res.status(404).send({ message: "Isn't possible to update, vaccine didn't find." });
        }

        res.status(200).send({message: "Vaccine updated!"});

    } catch(error) {
        sendErrorMessage(error, res);
    }
};

const updateVaccinated = async (req, res) => {
    const { id: idVaccine } = req.params;
    const { vaccinated } = req.body;

    try {
        const rowsUpdated = await Vaccine.update({vaccinated}, { 
            where: { id: idVaccine }
        });

        if(rowsUpdated && rowsUpdated[0] > 0){
            return res.status(200).send({message: `${rowsUpdated[0]} vaccines updated!`});
        }

        res.status(404).send({ message: `Didn't find vaccine's id = ${idVaccine}.`});

    } catch (error) {
        sendErrorMessage(error,res);
    }
}

module.exports = {
    createVaccine,
    getAllVaccines,
    getVaccine,
    updateVaccineInDB,
    updateVaccine,
    updateVaccinated
}