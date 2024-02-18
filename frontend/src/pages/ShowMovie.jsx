import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ButtonBack from '../components/ButtonBack';
import Spinner from '../components/Spinner';

const ShowMovie = () => {
  const [movie, setMovie] = useState({});
  const [loading,setLoading] = useState(false);
  const { id } = useParams();

  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:5000/movies/${id}`)
          .then((response) => {
            setMovie(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
  },[])

  return (
    <div className='p-4'>
      <ButtonBack/>
      <h1 className='text-3x1 my-4'>Show movie</h1>
      {loading ? 
      (<Spinner/>):(
        <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-fit p-4'>
            <div className='my-4'>
              <span className='text-x1 mr-4 text-gray-500'>Id</span>
              <span>{movie._id}</span>
            </div>
            <div className='my-4'>
              <span className='text-x1 mr-4 text-gray-500'>Title</span>
              <span>{movie.title}</span>
            </div>
            <div className='my-4'>
              <span className='text-x1 mr-4 text-gray-500'>Director</span>
              <span>{movie.director}</span>
            </div>
            <div className='my-4'>
              <span className='text-x1 mr-4 text-gray-500'>Release year</span>
              <span>{movie.releaseYear}</span>
            </div>
        </div>
      )}
      </div>
  )
}

export default ShowMovie