import swaggerAutogen from 'swagger-autogen';

const swaggerGen = swaggerAutogen();

const doc = {
  info: {
    title: 'Shopping Server API',
    description: 'A simple Express.js shopping server with snacks and electronics collections.',
  },
  host: 'localhost:3000',
};

const outputFile = './swagger-output.json';
const routes = ['./index.js'];

swaggerGen(outputFile, routes, doc);
