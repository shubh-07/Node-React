const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

const route = require('./routes/customerRoutes');

app.use('/api/customer', route);

async function startServer() {
    app.listen(4000, err => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Server running on port 4000!");
    });
}

// Run the async function to start our server
startServer();

module.exports = app;