import { useNavigate } from "react-router-dom"
export default function BookCard ({id, title, summaryUrl , imageUrl, author, mode }){
  const navigate = useNavigate()
  
  const editCard = () => {
    navigate(`/admin/editBook/${id}`)
  }

  const viewCard = () => {
    navigate(`/book/${id}`)
  }
  return (
   


      <div className="flex flex-col text-zinc-950 rounded-3xl overflow-hidden ">

        <img 
          src={imageUrl} 
          className="w-full max-h-44 object-cover border-r-2 cursor-pointer " 
          alt={"book"}
          onClick={mode === "edit" ? editCard : viewCard}>
          </img>

        <div className="flex flex-col gap-6 p-4 my-4">
          <div className="text-xl font-bold ">{title}</div>
          <div>{author}</div>
          <a href={summaryUrl}>Read summary</a>

        </div>

      

      </div>


  )

}

