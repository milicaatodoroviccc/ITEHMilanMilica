import React, {useState} from 'react';
import ButtonBack from '../components/ButtonBack';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const DeleteMovie = () => {
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  const obradaObrisanogFilma = () => {
    setLoading(true);
    axios
        .delete(`http://localhost:5000/movies/${id}`)
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
      <h1 className='text-3x1 my-4'>Delete movie</h1>
      {loading ? <Spinner/> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600] p-8 mx-auto'>
        <h3 className='text-2xl'>You sure you want to delete selected movie?</h3>

        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={obradaObrisanogFilma}>
          Yes
        </button>


      </div>
    </div>
  )
}

export default DeleteMovie