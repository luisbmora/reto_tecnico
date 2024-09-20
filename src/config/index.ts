import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();

app.use(cors);

app.listen(process.env.PORT ,() =>{
    console.log("App listening on port " + process.env.PORT);
});