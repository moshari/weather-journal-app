const Joi = require('joi');

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// joi schema
const schema = Joi.object({
    temp: Joi.number().required(),
    date: Joi.string().required(),
    feel: Joi.string().required()
});

const getAll = (req, res) => {
    console.log(projectData);
    res.json(projectData);
}

const postDate = (req, res) => {
    // validate request body, all props (temp, date and fell) is required
    const result = schema.validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    projectData = req.body;
    const responseObj = {
        ...projectData,
        message: 'user Data with feelings, added successfully'
    }
    console.log(responseObj);
    res.json(responseObj);
}

module.exports = { getAll, postDate }