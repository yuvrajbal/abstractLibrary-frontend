import { useEffect,useState } from "react";
import { FocusCards } from "./ui/focus-cards"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FocusCardsEdit() {
 
  const navigate = useNavigate()
  const[books,setBooks] = useState([]);

  const createBookHandler = () => {
    navigate("/admin/createSummary")
  }

  // fetch all books
  useEffect(() => {
    const fetchSummaries = async () => {
      try{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/dashboard`);
        const fetchedBooks = response.data.books.map((book) => ({
          title:book.title,
          src:book.imageUrl,
          summaryUrl: book.summaryUrl,
          id:book._id
        }))
        setBooks(fetchedBooks);
        console.log("books",books)
      }catch(err){
        console.log("error while fetching summaries", err)
      }
    }

    fetchSummaries()
  }, [])

  return (
    <div className="flex flex-col items-center gap-10">
      < button 
        className="text-gray-100 text-xl font-semibold  px-6 py-2 bg-neutral-800 rounded-3xl border-2 border-gray-400 max-w-80"
        onClick={ createBookHandler}
        >Create a book</button>
    <FocusCards cards={books} mode={"edit"}/>;

  </div>
  )
  
}
