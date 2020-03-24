const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require('path');

const app = express();

const PORT = config.get('port') || 5000;

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Customer API",
            description: "Customer API Information",
            contact: {
            name: "Bohdan Lysov"
            },
           // servers: ["http://localhost:5000"]
        }
    },
    apis: [path.resolve(__dirname + '/server.js'),
           path.resolve(__dirname + '/routes/*.js'),
           path.resolve(__dirname + '/models/*.js')]
};
console.log(path.resolve(__dirname + '/server.js'))

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json({ extended: true }));

// Routes
/**
* @swagger
* "/api/auth/register": {
*   "post": {
*       "description": "Use to register user",
*       "responses": {
*           "201": {
*               "description": "A successful response",
*               "content": {
*                          "schema": {
*                             "$ref": "#/server/models/User"
*                           }
*               }
*           },
*           "400": {
*               "description": "Wrong data in registration fields OR User already exists"
*           }
*       }
*   },
*   "parameters": {
*       "name": "login",
*       "description": "User login",
*       "required": "true"
*   }
*}
*/
app.use('/api/auth', require('./routes/auth.routes'));


app.use('/api/todo', require('./routes/todo.routes'));
app.use('/api/account', require('./routes/accout.routes'));

async function start() {
    try {
        await mongoose.connect(config.get("mongoUri"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
    }
    catch(error) {
        console.log('Server error', error);
        process.exit(1);
    }
}

start();