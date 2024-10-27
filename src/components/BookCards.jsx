import { useEffect,useState } from "react";
import { FocusCards } from "./ui/focus-cards"
import axios from "axios";
import { RingLoader } from "react-spinners";
import { div } from "framer-motion/client";
export function FocusCardsDemo() {
  const cards = [
    {
      title: "Forest Adventure",
      src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Valley of life",
      src: "https://images.unsplash.com/photo-1600271772470-bd22a42787b3?q=80&w=3072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Sala behta hi jayega",
      src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=3070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Camping is for pros",
      src: "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "The road not taken",
      src: "https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "The First Rule",
      src: "https://assets.aceternity.com/the-first-rule.png",
    },
  ];
  const[books,setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
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
        setIsLoading(false)
      }catch(err){
        console.log("error while fetching summaries", err)
      }
    }

    fetchSummaries()
  }, [])

  return (
    <>
    {isLoading ? (
      <div className="flex justify-center min-h-screen pt-24">
        <RingLoader
        color="#737373"
        size={100}
    />
      </div>
      
    ) :(
    <FocusCards cards={books} mode={""} />

    )}

    </>);
}
