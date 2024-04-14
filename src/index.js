import express from 'express';
import router from './router/mermaidRouter.js';
import cors from 'cors';

const app = express();
const PORT = 8080;

const MERMAID_API_ENDPOINT = 'mermaid';
const CORS_OPTIONS = {
  origin: "*",
  methods: "GET,POST,PUT,DELETE"
};

app.use(cors(CORS_OPTIONS));


app.use(`/${MERMAID_API_ENDPOINT}`, router);


app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
});