import express from 'express';
import { Movie } from '../models/movieModel.js';

const router = express.Router();

// ruta za cuvanje filma
router.post('/', async (request,response) => {
    try {
        if(!request.body.title ||
            !request.body.director ||
            !request.body.releaseYear
        ){
            return response.status(400).send({
                message : 'Molim vas prosledite nam sve podatke o filmu : title, director, releaseYear.',
            });
        }
        
        const newMovie = {
            title: request.body.title,
            director: request.body.director,
            releaseYear: request.body.releaseYear
        };

        const movie = await Movie.create(newMovie);
        return response.status(201).send(movie);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})
// Vrati sve filmove iz baze

router.get('/', async (request,response) => {
    try{
        const movies = await Movie.find({});
        return response.status(200).json({
            count: movies.length,
            data: movies
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

// Vrati film na osnovu Id-ja

router.get('/:id', async (request,response) => {
    try{
        const {id} = request.params;

        const movie = await Movie.findById(id);
        return response.status(200).json(movie);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

//Update movie
router.put('/:id', async (request,response) => {
    try{
        if(!request.body.title ||
            !request.body.director ||
            !request.body.releaseYear
        ){
            return response.status(400).send({
                message : 'Molim vas prosledite nam sve podatke o filmu : title, director, releaseYear.',
            });
        }
        const {id} = request.params;

        const result = await Movie.findByIdAndUpdate(id,request.body);

        if(!result){
            return response.status(404).json({message: 'Film nije pronadjen'});
        }
        return response.status(200).send({message: 'Film uspesno azuriran.'});
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

//Brisanje filma
router.delete('/:id', async (request,response) => {
    try {
        const {id} = request.params;
        const result = await Movie.findByIdAndDelete(id);
        
        if(!result ){
            return response.status(404).json({message: 'Nije pronadjen film.'});
        }

        return response.status(200).send({message:'Uspesno obrisan film.'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

export default router;
