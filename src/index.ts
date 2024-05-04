import express from 'express';
import router from './router/mermaidRouter.js';
import cors from 'cors';

const app = express();
const PORT = 8080;

const ACCOUNT_MERMAID_API_ENDPOINT = 'account';
const CORS_OPTIONS = {
  origin: "*",
  methods: "GET"
};

app.use(cors(CORS_OPTIONS));


app.use(`/${ACCOUNT_MERMAID_API_ENDPOINT}`, router);


app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
});