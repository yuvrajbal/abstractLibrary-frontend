
import './index.css'
import BookCard from './components/BookCard'
import { BrowserRouter , Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import AdminSignin from './components/AdminSignin'
import Home from './components/Home'
import CreateBookForm from './components/CreateBookCard'
import FocusCardsEdit from "./components/EditBookCards"
import EditBookForm from './components/EditBookCard'
function App() {

  return (
    <div className='dark:bg-neutral-950 pb-10 h-screen'>   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>} >
            <Route path="" element={<Home/>} />
            <Route path="home" element={<Home/>} />
            <Route path="signin" element={<AdminSignin/>} />
            <Route path="admin/createSummary" element={<CreateBookForm/>} />
            <Route path="admin/editSummary" element={<FocusCardsEdit/>} />
            <Route path="admin/edit/:bookId" element={<EditBookForm/>} />
            
          </Route>

        
         
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
