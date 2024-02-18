import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle, BsTable} from 'react-icons/bs';
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md'
import MovieKartica from '../components/homepage/MovieKartica';
import MovieTable from '../components/homepage/MovieTable';

const Home = () => {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showStyle, setshowStyle] = useState('table');

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5000/movies')
            .then((response)=>{
               setMovies(response.data.data);
               setLoading(false) 
            })
            .catch((error)=>{
                console.log(error);
                setLoading(false);
            });
    },[])
  return (
    <div className='p-4'>
        <div className='flex justify-center items-center gap-x-4'>
            <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rouded-1g' onClick={() => setshowStyle('table')}>
                Table
            </button>
            <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rouded-1g' onClick={() => setshowStyle('card')}>
                Card
            </button>


        </div>

        <div className='flex justify-between items-center'>
         <h1 className='text-3x1 my-8'>Movies list</h1>
            <Link to='movies/create'>
                <MdOutlineAddBox className='text-sky-800 text-4x1'/>
            </Link>
        </div>
        {loading? <Spinner/> : showStyle == 'table' ? (<MovieTable movies={movies}/>) : (<MovieKartica movies= {movies}/>)}
    </div>
  )
}

export default Home