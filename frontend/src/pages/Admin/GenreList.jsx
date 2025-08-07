import { useState,useEffect } from "react";
import { useCreateGenreMutation,useUpdateGenreMutation,useDeleteGenreMutation,useFetchGenresQuery } from "../../redux/api/genre.js";

import {toast} from "react-toastify"
import GenreForm from "../../component/genreForm.jsx";
import Modal from "../../component/Modal..jsx";

const GenreList=()=>{
   const {data:genres,refetch,error,isLoading,isError}=useFetchGenresQuery();
   const [name,setName]=useState("");
   const[selectedGenre , setSelectedGenre]=useState(null);
   const [updatingName,setUpdatingName] = useState("");
   const [modalVisible,setModalVisible]=useState(false);

   const [createGenre]=useCreateGenreMutation();
   const [updateGenre]=useUpdateGenreMutation();
   const[deleteGenre]=useDeleteGenreMutation();

  
   

// console.log("Genres data:", genres);
// console.log("Loading:", isLoading, "Error:", isError, "Details:", error);




   const handleCreateGenre=async(e)=>{
    e.preventDefault();
    if(!name){
        toast.error("Genre name is required");
        return;
    }
    try {
       const res=await createGenre({name}).unwrap();
      //  console.log(res.name)
       if(res.error){
        toast.error(res.error);

       } else{
        setName("")
        toast.success(`${res.genre.name} is created.`);
          refetch();
          // console.log("REFETCH:",refetch());
        // console.log("genres",genres)

       }


    } catch (error) {
        console.log(error);
        toast.error("creating Genre id failed,try again");
    }
   }

   const handleUpdateGenre =async(e)=>{
    e.preventDefault();
    if(!updatingName){
        toast.error("Genre name is required")
    }
    try {
        console.log("selected Genre :",selectedGenre);
        const res =await updateGenre({
           id:selectedGenre._id,
           updateGenre:{
            name:updatingName,
           }
        }).unwrap();
        if(res.error){
             toast.error(result.error);
        }else{
            toast.success(`${res.name} is updated`);
            refetch();
            setSelectedGenre(null);
            setUpdatingName("");
            setModalVisible(false);
        }
    } catch (error) {
         console.log(error);
        toast.error("updating Genre id failed,try again");
    }
   }


   const handleDeleteGenre =async()=>{
    try{
        const res=await deleteGenre(selectedGenre._id).unwrap();
        console.log("res",res);
        if(res.error){
            toast.error(res.error);
        }else{
        toast.success(`${res.name} is deleted`);
        refetch();
        setSelectedGenre(null);
        setModalVisible(false);
        }
    }catch(error){
        console.error(error);
      toast.error("Genre deletion failed. Tray again.");
    };

  }
    return(
      
        <div className="ml-[10rem] flex flex-col md:flex-row">
           <div className="md:w-3/4 p-3">
           <h1 className="h-12">Manage Genres</h1>
           
           <GenreForm
            value={name}
            setValue={setName}
            handleSubmit={handleCreateGenre} />

              <br />

              <div className="flex flex-wrap">
                {genres?.map((genre)=>(
                    <div key={genre._id}>

                          <button
                className="bg-white border border-teal-500 text-teal-500 py-2 px-4 rounded-lg m-3 hover:bg-teal-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                onClick={() => {
                     
                    setModalVisible(true);
                    setSelectedGenre(genre);
                    setUpdatingName(genre.name);
                    mode="create"
                  
                }}
              >
                {genre.name}
              </button>
                    </div>
                ))}
              </div>

              <Modal isOpen={modalVisible} onClose ={()=>setModalVisible(false)}>

                <GenreForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateGenre}
            buttonText="Update"
            handleDelete={handleDeleteGenre}
            mode="update"
          />
              </Modal>
           </div>

        </div>


    )
   

}













export  default GenreList