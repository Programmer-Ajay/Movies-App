import { useEffect,useState } from "react";
import { useParams,useNavigate } from "react-router";

// useParams is a React Router hook used to access the URL parameters from the current route.

import {
     useGetSpecificMovieQuery,
     useUpdateMovieMutation,
     useUploadImageMutation,
     useDeleteMovieMutation    
 } from "../../redux/api/movie";

 import {toast} from  "react-toastify"


 const UpdateMovie=()=>{

    const {id} =useParams();
    // from here we get id value of movie from the current route

    const navigate=useNavigate();
    const [movieData,setMovieData]=useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    ratings: 0,
    image: null,
    })

    const [selectedImage,setSelectedImage]=useState(null);
    const {data:initialMovieData}=useGetSpecificMovieQuery(id);

    // jab bhi apka inital movie data ayenga backend se toh woh form mein set ho jayega is useEffect se
    useEffect(()=>{
      if(initialMovieData){
        setMovieData(initialMovieData);
      }

    },[initialMovieData]);


    const [updateMovie,{isLoading:isUpdatingMovie}]=useUpdateMovieMutation();

    const [uploadImage,{isLoading:isUploadingImage,error:uploadImageErrorDetail}]=useUploadImageMutation()
 
 const [deleteMovie]=useDeleteMovieMutation();

const handleChange=(e)=>{
    const {name,value}=e.target;
    setMovieData((preveData)=>({
      ...preveData,
      [name]:value,  // custom  variable value 
    }))
}

 const handleImageChange =(e)=>{
  const file = e.target.files[0];
 // extract the image url
setSelectedImage(file)    // the image url to backend
 }

 const handleUpdateMovie=async()=>{
    try{

        if(
       !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast
        ){
            toast.error("Please fill all the required fields");
            return;
        }

let uploadImagePath=movieData.image;
if(selectedImage){
    const formData= new FormData(); // creating the instance of formData to send the info with form od set of ket - value pairs
    formData.append("image",selectedImage) 
    //   this is look 
    /*
    {
    image : selectdImage // (url)
    } */
   // now send to backend data
   const uploadImageResponse=await uploadImage(formData);
   console.log("upload image response",uploadImageResponse);
   if(uploadImageResponse.data){
    uploadImagePath=uploadImageResponse.data.image;
   }else{
  console.error("Failed to upload image:",uploadImageErrorDetail);
          toast.error("Failed to upload image");
          return;
   }

}
   const res= await updateMovie({
    id:id,
    updatedMovie:{
     ...movieData,
     image:uploadImagePath,
    }
})
console.log("res of updated movie",res)

 // navigate to "/movies"
 navigate("/movies");
    }catch(error){
      console.error("Failed to update movie:", error);
 }

 };

 const handleDeleteMovie = async()=>{
    try {
        await deleteMovie(id);
        navigate("/movies");
        toast.success("Movie deleted successfully")
    } catch (error) {
         console.error("Failed to delete movie:", error);
      toast.error(`Failed to delete movie: ${error?.message}`);
    }
 }


 return (
 <div className="container flex justify-center items-center mt-4">
      <form>
        <p className="text-green-200 w-[50rem] text-2xl mb-4">Update Movie</p>

        <div className="mb-4">
          <label className="block">
            Name:
            <input
              type="text"
              name="name"
              value={movieData.name}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Year:
            <input
              type="number"
              name="year"
              value={movieData.year}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Detail:
            <textarea
              name="detail"
              value={movieData.detail}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Cast (comma-separated):
            <input
              type="text"
              name="cast"
              value={movieData.cast.join(", ")}
              onChange={(e) =>
                setMovieData({ ...movieData, cast: e.target.value.split(", ") })
              }
              className="border px-2 py-1 w-full"
            />
          </label>
        </div>

        <div className="mb-4">
          <label
            style={
              !selectedImage
                ? {
                    border: "1px solid #888",
                    borderRadius: "5px",
                    padding: "8px",
                  }
                : {
                    border: "0",
                    borderRadius: "0",
                    padding: "0",
                  }
            }
          >
            {!selectedImage && "Upload Image"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: !selectedImage ? "none" : "block" }}
            />
          </label>
        </div>

        <button
          type="button"
          onClick={handleUpdateMovie}
          className="bg-teal-500 text-white px-4 py-2 rounded"
          disabled={isUpdatingMovie || isUploadingImage}
        >
          {isUpdatingMovie || isUploadingImage ? "Updating..." : "Update Movie"}
        </button>

        <button
          type="button"
          onClick={handleDeleteMovie}
          className="bg-red-500 text-white px-4 py-2 rounded ml-2"
          disabled={isUpdatingMovie || isUploadingImage}
        >
          {isUpdatingMovie || isUploadingImage ? "Deleting..." : "Delete Movie"}
        </button>
      </form>
    </div>

 )
 }
 export default UpdateMovie;