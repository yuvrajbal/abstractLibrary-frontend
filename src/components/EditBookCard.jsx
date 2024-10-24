import { useState ,useEffect} from 'react'
import axios from 'axios';
import BookForm from './BookForm';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditBookForm(){
  
  const [book, setBook] = useState({title:"", author:"", imageUrl:"", summaryUrl:""})
  const [error,setError] = useState("");
  const token = localStorage.getItem("token");
  const {bookId} = useParams();
  const navigate = useNavigate()
  // console.log("bookId",bookId);

  useEffect(() => {
    const fetchBookData = async () => {
      try{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/summary/${bookId}`, {
          headers: {
            authorization:token
          }
        })
        const bookData = response.data.book;
        setBook(bookData);
        // console.log(bookData)
        
      }
      catch(err){
        console.error("error fetching book details", err)
        setError(err)
      }
    }

    fetchBookData();
  },[])


  const handleFormSubmission = async(event) => {
    event.preventDefault();
    if(!book.title || !book.author || !book.imageUrl || !book.summaryUrl){
      setError("All fields are required")
      return;
    }
    setError("")
    try{
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/admin/createSummary/${bookId}`, book , {
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
    setError("");
    navigate("/admin/editSummary")

  }

  return (
     <div className='sm:w-full sm:mx-auto sm:max-w-md '>
        <h2 
        className="text-center text-2xl font-bold leading-9 tracking-tight dark:text-gray-200 mt-10 ">
        Edit {book.title} summary 
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



