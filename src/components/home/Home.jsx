import api from '../../api/axiosConfig';
import { useState, useEffect } from 'react';

const Home = () => {

    
  const [books, setBooks] = useState([]);

  const getBooks = async () =>{
      
      try{  
        const response = await api.get("/api/v1/books");//appened to base url from axios
        console.log(response.data);
        setBooks(response.data);


      } catch(err)
      {
        console.log(err);
      }
      
  }
  useEffect(()=> {
    getBooks();
  },[])


    return (
        <div>mi</div>
    )
}

export default Home;