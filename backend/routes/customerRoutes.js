const express = require('express');
const router = express.Router();

let customers = [];

router.get('/getCustomers', (req, res) => {
    res.status(200).send({ customers });
});

router.post('/saveCustomer', (req, res) => {
    customers.push(req.body);
    // Adding timeout to showcase loader funcitonality on UI.
    setTimeout(() => {
        // Call database layer to save customer in database.
        // Send response to client.
        res.status(201).send({ msg: 'New Customer Added.' });
    }, 1000);
});

module.exports = router;