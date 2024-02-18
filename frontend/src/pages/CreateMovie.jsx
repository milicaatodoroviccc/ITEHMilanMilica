import React from 'react';
import { useState } from 'react';
import ButtonBack from '../components/ButtonBack';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';

const CreateMovie = () => {
  const [title,setTitle] = useState('');
  const [director,setDirector] = useState('');
  const [releaseYear,setreleaseYear] = useState('');
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const obradaSacuvanogFilma = () => {
      const data = {
        title,
        director,
        releaseYear
      };
      setLoading(true);
      axios
          .post('http://localhost:5000/movies',data)
          .then(()=>{
            setLoading(false);
            navigate('/');
          })
          .catch((error) => {
            setLoading(false);
            alert('Greska.');
            console.log(error);
          });
  };
  return (
    <div className='p-4'>
      <ButtonBack/>
      <h1 className='text-3x1 my-4'>Create movie</h1>
      {loading ? <Spinner/>:''}
      <div className='flex flex-col vorder-2 border-sky-400 rounded x-1 w-[600px] p-4 mx-auto'>
        <div className='my-4'> 
          <label className="text x-1 mr-4 text-gray-500 ">Title</label>
          <input type="text"
          value={title}
          onChange={(e)=>setTitle(e.target.value)} 
          className='border-2 border-gray-500 px-4 py-2 w-full '
          />
        </div>
        <div className='my-4'> 
          <label className="text x-1 mr-4 text-gray-500 ">Director</label>
          <input type="text"
          value={director}
          onChange={(e)=>setDirector(e.target.value)} 
          className='border-2 border-gray-500 px-4 py-2 w-full '
          />
        </div>
        <div className='my-4'> 
          <label className="text x-1 mr-4 text-gray-500 ">Release year</label>
          <input type="text"
          value={releaseYear}
          onChange={(e)=>setreleaseYear(e.target.value)} 
          className='border-2 border-gray-500 px-4 py-2 w-full '
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={obradaSacuvanogFilma}>
           Save movie
        </button>
      </div>
    </div>
  )
}

export default CreateMovie
