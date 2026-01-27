const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Album API',
        description: 'API for managing albums'
    },
    host: 'project-2-cse341.onrender.com',
    schemes: ['https', 'http'],
    tags: [
        { name: 'Albums', description: 'Album management' },
        { name: 'Members', description: 'Member management' }
    ]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);