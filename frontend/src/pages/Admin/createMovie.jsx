import { useEffect,useState } from "react";
import {useNavigate} from 'react-router'

import {
     useCreateMovieMutation,
     useUploadImageMutation  
}    from "../../redux/api/movie";

import { useFetchGenresQuery } from "../../redux/api/genre";

import { toast } from 'react-toastify'

const CreateMovie=()=>{
const navigate=useNavigate();

const [movieData,setMovieData]=useState({
    name:"",
    year:0,
    detail:"",
    cast:[],
    rating:0,
    image:null,
    genre:"",
})

const [selectedImage,setSelectedImage]=useState(null);

const [createMovie,{isLoading:isCreatingMovie,error:createMovieErrorDetail}]=useCreateMovieMutation();

const [uploadImage,{isLoading:isLoadingImage,error:uploadingImageErrorDetail}]=useUploadImageMutation();

const {data:genres,isLoading:isLoadingGenres}=useFetchGenresQuery();

const [chooseGenre,setChooseGenre]=useState("")
useEffect(()=>{
if(genres){
    setMovieData((prevData)=>({
        ...prevData,
        genre:genres[0]._id||"",
       
    }))
    //  console.log("genres with 0 element:",genres[0])
}
}
    ,[genres]);



    const handleChange=(e)=>{
        const{name,value}=e.target;

        if(name==="genre"){
            // console.log("name:",name,"value",value);

            const selectedGenre = genres.find((genre)=>genre.name==value);

            console.log("selectedgenre",selectedGenre)
            setChooseGenre(selectedGenre.name)
            // console.log("selected genre name",selectedGenre.name)

            setMovieData((prevData)=>({
                ...prevData,
                genre:selectedGenre?selectedGenre._id:"",
                // genre:value
            }))
        }else{
           setMovieData((prevData)=>({
            ...prevData,
            [name]:value  // for all other field except genre
           })) 
        }
    };
     const HandleImageChange=(e)=>{
        const file=e.target.files[0];
        setSelectedImage(file);
     };

     const handleCreateMovie=async()=>{

        try {
            if(
                !movieData.name||
                !movieData.year||
                !movieData.detail||
                !movieData.cast ||
                !selectedImage
            ){
                toast.error("please fill all required fields");
                return;
            }
            let uploadImagePath=null;

            if(selectedImage){
                const formData= new FormData();
                formData.append("image",selectedImage);
                const uploadImageResponse= await uploadImage(formData);
                if(uploadImageResponse.data){
                    uploadImagePath=uploadImageResponse.data.image;
                    console.log("Uplaod image Path",uploadImagePath)


                }else{
                    console.log("failed to upload image:",uploadingImageErrorDetail);
                    toast.error("Failed to upload image");
                    return;

                }

                await createMovie({
                    ...movieData,
                    image:uploadImagePath
                });
                console.log("Movie addeded successfully to db")
                
                navigate("/admin/movies-list");
                  setMovieData({
          name: "",
          year: 0,
          detail: "",
          cast: [],
          ratings: 0,
          image: null,
          genre: "",
        });
        toast.success("Movie added to Database");
            }
        } catch (error) {
     console.error("Failed to create movie: ", createMovieErrorDetail);
      toast.error(`Failed to create movie: ${createMovieErrorDetail?.message}`);
   
        }
     }
    return(
        <div className="container flex justify-center items-center mt-4">
        
        <form >
          <p className="text-green-200 w-[50rem] text-2xl mb-4"> Create Movie</p>
          <div className="mb-4">
            <label  className="block">
                Name:
                <input type="text" name="name" value={movieData.name} onChange={handleChange}    className="border px-2 py-1 w-full" />
            </label>
          </div>

           <div className="mb-4">
            <label  className="block">
                Year:
                <input type="number" name="year" value={movieData.year} onChange={handleChange}    className="border px-2 py-1 w-full" />
            </label>
          </div>

           <div className="mb-4">
            <label  className=" text-amber-50">
                Detail:
                <textarea type="text" name="detail" value={movieData.detail} onChange={handleChange}    className="border border-amber-50 px-2 py-1 w-full">
                </textarea>
            </label>
          </div>

            <div className="mb-4">
            <label  className="block">
                Cast(Comma-Separated):
                <input type="text" name="cast" value={movieData.cast.join(",")} onChange={(e)=>setMovieData({...movieData,cast:e.target.value.split(",")})}    className="border px-2 py-1 w-full" />
            </label>
          </div>


          <div className="mb-4">
            <label  className="block">
                Genre:
                <select
                 name="genre"
                  value={chooseGenre}
                   onChange={handleChange}
                      className="border px-2 py-1 w-full" >
                    {isLoadingGenres ?(
                        <option >
                            Loading genres...
                        </option>
                    ):(
                        genres.map((genre)=>(
                            <option key={genre._id} value={genre.id}>{genre.name}</option>
                        ))
                    )}
                    </select>
            </label>
          </div>

        <div className="mb-4">
            <label   style={
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
            } >   {!selectedImage && "Upload Image"}
            <input type="file"
            accept="image/*" 
            onChange={HandleImageChange}
               style={{ display: !selectedImage ? "none" : "block" }}/>
            </label>
        </div>

          <button
          type="button"
          onClick={handleCreateMovie}
          className="bg-teal-500 text-white px-4 py-2 rounded"
          disabled={isCreatingMovie || isLoadingImage}
        >
          {isCreatingMovie || isLoadingImage ? "Creating..." : "Create Movie"}
        </button>

        </form>

        </div>
    )

}

export default CreateMovie;



/*

1. const formData = new FormData();
FormData is a built-in JavaScript class used to construct a set of key/value pairs representing form fields and their values.

It's commonly used when you want to send form data, especially files (like images), via AJAX (e.g., with fetch or axios).

formData here is just a new, empty form data object.

✅ 2. formData.append("/image", selectedImage);
append() is used to add a new field to the formData object.

The first parameter "/image" is the key (field name).

The second parameter selectedImage is the value (usually a File or Blob object).

So this line means:

Add the selected image file to the form data under the field name "/image".



*/