import {UploadButton, generateUploadButton } from "@uploadthing/react";
import { useState } from "react";
export default function BookForm({book, setBook , handleCancel , handleSubmission, error}){

  const [isSaved, setIsSaved] = useState(false)

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    handleSubmission(); // Call the passed submission function
    setIsSaved(true);

    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };
  return (
    <form onSubmit={handleFormSubmit} className="pb-12 ">
    <div className="space-y-12  ">
      <div className="border-b pb-12   ">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 dark:text-gray-200 px-6">
          
          {/*Book TITLE  */}
          <div className="sm:col-span-full">
            <label htmlFor="title" className="block text-sm font-medium leading-6">
              Book Title
            </label>
         
              <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span> */}
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder=""
                  value={book.title}
                  autoComplete="title"
                  className="ring-1 ring-inset ring-gray-300 block flex-1 border-0  py-1.5 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded-m dark:text-gray-200"
                  onChange={(e) => setBook({...book , title:e.target.value})}
                />
              </div>
           
          </div>

          {/* Book Author */}
          <div className="sm:col-span-full">
            <label htmlFor="author" className="block text-sm font-medium leading-6 ">
              Author
            </label>
            <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                id="author"
                name="author"
                type="text"
                value={book.author}
                className="dark:text-gray-200 px-2 ring-1 ring-inset ring-gray-300 block flex-1 border-0  py-1.5  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded-md"
                // defaultValue={''}
                onChange={(e) => setBook({...book , author: e.target.value })}
              />
            </div>
          </div>

          {/* Book summary Url */}
          <div className="col-span-full">
            <label htmlFor="summaryUrl" className="block text-sm font-medium leading-6 ">
              Summary Url
            </label>
            <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="text"
                id="summaryUrl"
                name="summaryUrl"
                value={book.summaryUrl}
                className="dark:text-gray-200 px-2 ring-1 ring-inset ring-gray-300 block flex-1 border-0  py-1.5  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded-md"
                onChange={(e) => {
                    setBook({...book ,summaryUrl:e.target.value})      
                  }}
              />
            </div>
          </div>

          {/* Book IMAGE Url */}
          <div className="col-span-full">
            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6  mb-4">
              Book Image
            </label>
            <UploadButton
                url={`${import.meta.env.VITE_BACKEND_URL}/api/uploadthing`}
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  console.log("Files: ", res);
                  setBook({...book, imageUrl:res[0].url})
                  // alert("Upload Completed");
                }}
                onUploadError={(error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
                onBeforeUploadBegin={(files) => {
                  // Preprocess files before uploading (e.g. rename them)
                  return files.map(
                    (f) => new File([f], "abstractLib" + f.name, { type: f.type })
                  );
                }}
                onUploadBegin={(name) => {
                  // Do something once upload begins
                  console.log("Uploading: ", name);
                }}
              
              />
                <div className="flex justify-center">
                  {book.imageUrl && <img className="mt-6 rounded-lg w-1/2" src={book.imageUrl} alt="bookcover"></img>}

                </div>

          </div>

        </div>
      </div> 
    </div>

    {error &&  <p className='text-red-500 text-sm mt-2'>{error}</p>}
    <div className="mt-6 flex justify-between sm:justify-end gap-10 px-6">
      <button onClick={handleCancel} type="button" className="text-sm font-semibold  text-gray-900 bg-gray-200 hover:bg-gray-100 px-6 py-2 rounded-md">
        Cancel
      </button>
      <button
        type="submit"
        className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

      >
        {isSaved ? "Saved" : "Save"}
        
      </button>
    </div>
  </form>
  )

}