import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import router from './src/routes/index.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/v1/bff', router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});