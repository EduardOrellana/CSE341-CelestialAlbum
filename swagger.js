const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "API for Celestial Album Project of Sariha and Erick",
        description: "API Project Celestial Album: students: Sariha Hope and Erick Orellana",
    },
    host: "cse341-celestialalbum-1.onrender.com/",
    // host: "http://localhost:3000/",
    schemes: ['https'],
    basePath: "/data"
};

const outputFile = './swagger.json';
const routesFile = ['./routes/index.js', './routes/chapels.js', './routes/prophets.js'];

swaggerAutogen(outputFile, routesFile, doc);