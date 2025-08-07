import { useState } from "react";
 import {
     useGetNewMoviesQuery,
     useGetRandomMoviesQuery,
     useGetTopMoviesQuery
     
  } from "../../redux/api/movie";
  
  import {useFetchGenresQuery } from "../../redux/api/genre.js";
  import SliderUtil from "../../component/SliderUtils";

  const MoviesContainerPage=()=>{
    const {data}=useGetNewMoviesQuery();
    const {data:topMovies}=useGetTopMoviesQuery();
    const {data:randomMovies} = useGetRandomMoviesQuery();
    const {data:genres}= useFetchGenresQuery();

    const [selectedGenre , setSelectedGenre]= useState(null);

     const handleGenreClick= (gerneId)=>{
         setSelectedGenre(gerneId);
     };
      
     const filteredMovies=data?.filter((movie)=>selectedGenre===null || movie.genre===selectedGenre)

     
    return (
        <div
  // className="flex flex-col lg:flex-row lg:justify-between items-center pr-[5rem] "
   className="flex flex-col lg:flex-row lg:justify-between items-center pr-[5rem] pl-4"
        >
            <nav
             className=" mr-[2rem] flex flex-row xl:flex-col lg:flex-col md:flex-row sm:flex-row"
            >
             {genres?.map((genre)=>(
                <button key={genre._id}
                  className={`transition duration-300 ease-in-out hover:bg-gray-200 block p-2 rounded mb-[1rem] text-lg ${
                    selectedGenre === genre._id ? "bg-gray-200" : ""
            }`}
            onClick={()=>handleGenreClick(genre._id)}
                >
              {genre.name}
                </button>
             ))}
            </nav>
               
         <section
         className="flex flex-col justify-center items-center  lg:w-auto">
           
           <div className="w-full max-w-screen-xl px-4 mb-8 ">
           <h1 className="mb-8 text-3xl">Choose For You</h1>
          <SliderUtil data={randomMovies} />
           </div>

            <div className="w-full max-w-screen-xl px-4 mb-8 ">
           <h1 className="mb-5">Top Movies</h1>
          <SliderUtil data={topMovies} />
           </div>

            <div className="w-full max-w-screen-xl px-4 mb-8 ">
           <h1 className="mb-5">Choose Movie</h1>
          <SliderUtil data={filteredMovies} />
           </div>
         </section>
           
        </div>
    )

  }

  export default MoviesContainerPage;


