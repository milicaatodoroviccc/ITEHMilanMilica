import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import { Movie } from "./models/movieModel.js";
import moviesRoutes from './routes/moviesRoutes.js';
import cors from "cors";

dotenv.config();

const app = express();
// da bi mogao lepo da nam parsira json sa postmana
app.use(express.json());
app.use(cors());
// app.use(cors({
//     origin: 'http:localhost:5000',
//     methods: ['GET','POST','PUT','DELETE'],
//     allowedHeaders: ['Content-Type'],
// }));

const PORT = process.env.PORT || 5000; 
const MONGODBURL = process.env.MONGODBURL;
// definisemo sta se desava kad je get zahtev za nasu aplikaciju

app.get('/', (request,response)=>{
    console.log(request);
    return response.status(234).send('Dobro dosli u nas filmski klub!');
})

app.use('/movies',moviesRoutes);

// Konektujemo se na bazu samo ako je uspesno pokrenuce se osluskivanje/server
mongoose
    .connect("mongodb://mongo-db/MovieClub")
    .then(()=>{
        console.log('App is connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });