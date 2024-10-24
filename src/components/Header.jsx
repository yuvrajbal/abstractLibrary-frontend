import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
export default function Header(){
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  const [isSignedIn, setIsSignedIn] = useState(false);
  const[loading,setLoading] = useState(true);

  const [theme, setTheme] = useState("dark"
      // const savedMode = localStorage.getItem("darkMode");
      // return savedMode ? JSON.parse(savedMode) : true; // Default to dark mode if no saved preference
    );

  
  useEffect(() => {
    // Apply the dark mode class to the document when the component mounts
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  
  
  useEffect(() => {
    if(token){
      setIsSignedIn(true)
    }
    setLoading(false)
  },[token])

  const signOut = () => {
    localStorage.setItem("token", "")
    setIsSignedIn(false)
    navigate("/")
  }


  


  const handleLogin = () => {
    navigate("/signin")
  }

  const handleModeChange = () =>{
    setTheme (theme === "dark" ? "light" : "dark")
  
  }

  return (
    <div className="flex flex-row justify-between dark:bg-neutral-800 px-1 md:px-6 rounded-3xl mb-10 mx-8 py-2">
        <div className="flex items-center gap-3 pl-2">
            <a href={isSignedIn ? "/admin/editSummary" : "home" }>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" className="size-8 stroke-black dark:stroke-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
              </svg>
            </a>
            <div className="font-medium hidden sm:block text-black dark:text-gray-200 text-xl">
              Abstract Library
            </div>
        </div>
        <div className="flex items-center gap-0 sm:gap-1 ">
          {/* color mode change */}
          <button 
            className=""
            onClick={handleModeChange}>
            {theme === "dark" ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-7">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg> : 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
            
              }
            
          </button>
          
          {/* signin/signout button */}
          {!loading && (isSignedIn ? (
            <button 
            className="px-3 md:text-lg py-1  rounded-lg hover:bg-neutral-300 font-medium dark:text-white dark:hover:bg-neutral-600"
            onClick={signOut}
            >
              
              <span>Sign out</span></button>
          ): (
            <button 
            className="px-3 md:text-lg py-1  rounded-lg hover:bg-neutral-300 font-medium dark:text-white dark:hover:bg-neutral-600"
            onClick={handleLogin}
            >
              
              <span>Sign in</span></button>
          ))}
       
        </div>
    </div>
  )
}