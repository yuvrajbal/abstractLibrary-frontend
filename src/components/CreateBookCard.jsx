import { useState } from 'react'
import axios from 'axios';
import BookForm from './BookForm';
import { useNavigate } from 'react-router-dom';

export default function CreateBookForm(){
  
  const [book, setBook] = useState({title:"", author:"", imageUrl:"", summaryUrl:""})
  const [error,setError] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleFormSubmission = async(event) => {
    // event.preventDefault();
    if(!book.title || !book.author || !book.imageUrl || !book.summaryUrl){
      setError("All fields are required")
      return;
    }
    setError("")
    try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/createSummary`, book , {
        headers:{
          authorization: token
        }
      })
      console.log(response.data)
      setBook({title:"", author:"", imageUrl:"", summaryUrl:""})
      navigate("/admin/editSummary")
    }catch(err){
      console.log("error while creating book summary", err)
    }

  }
  const handleCancel = async(event) => {
    event.preventDefault();
    setBook({title:"", author:"", imageUrl:"", summaryUrl:""})
    setError("")

  }


  return (
     <div className='sm:w-full sm:mx-auto sm:max-w-md  '>
        <h2 
        className="text-center text-2xl font-bold leading-9 tracking-tight dark:text-gray-200 mt-10 ">
        Create a book summary 
      </h2>
      <BookForm 
        book={book} 
        setBook={setBook} 
        handleCancel={handleCancel} 
        handleSubmission={handleFormSubmission}
        error={error}/>
    </div>
  )

}



