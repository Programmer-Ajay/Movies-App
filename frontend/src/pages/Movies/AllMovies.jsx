import { useGetAllMoviesQuery } from "../../redux/api/movie";
import { useFetchGenresQuery } from "../../redux/api/genre";
import { useGetNewMoviesQuery,       useGetRandomMoviesQuery,
    useGetTopMoviesQuery
 } from "../../redux/api/movie.js";

 import MovieCard from "./MovieCard";

 import { useEffect } from "react";
 import { useSelector,useDispatch } from "react-redux";

 import { setFilteredMovies,
          setMovieYears,
          setUniqueYears,
          setMoviesFilter
  } from "../../redux/features/movies/movieSlice";
  import banner from "../../assets/banner.jpg"
import { MOVIE_URL } from "../../redux/constants.js";


  const AllMovies =()=>{
const dispatch=useDispatch();
const {data}=useGetAllMoviesQuery();
const {data:genres} = useFetchGenresQuery();
const {data:newMovies}= useGetNewMoviesQuery();
const {data:topMovies}=useGetTopMoviesQuery();
const {data:randomMovies,refetch:refetchRandomMovies} =   useGetRandomMoviesQuery()




const {moviesFilter,filteredMovies}=useSelector((state)=>state.movies)

const movieYears= data?.map((movie)=>movie.year);
const uniqueYears=Array.from(new Set(movieYears))

useEffect(()=>{
   dispatch(setFilteredMovies(data||[]));
   dispatch(setMovieYears(movieYears));
   dispatch(setUniqueYears(uniqueYears));
},[data,dispatch])

const handleSearchChange=(e)=>{
  console.log(e.target.value)
    dispatch(setMoviesFilter({ searchTerm:e.target.value}));
const filteredMoviess= data.filter((movie)=>movie.name.toLowerCase().includes(e.target.value.toLowerCase()));

dispatch(setFilteredMovies(filteredMoviess));
};



const handleYearChange=(year)=>{
  const filterByYear =data.filter((movie)=>movie.year===+year);  
  // +year conversion of string to Number
  dispatch(setFilteredMovies(filterByYear));
  
}
const handleGenreClick=(genreId)=>{

    const filterByGenre=data.filter((movie)=>movie.genre===genreId)
    dispatch(setFilteredMovies(filterByGenre));

}
const handleSortChange =async(sortOption)=>{
 switch (sortOption) {
    case "new":
        dispatch(setFilteredMovies(newMovies))
        break;
    case "top":
        dispatch(setFilteredMovies(topMovies));
        break;
    case "random":
        // dispatch(setFilteredMovies(randomMovies));
        // console.log("random Movies:",randomMovies)

        const refetched = await refetchRandomMovies(); // ✅ Force re-fetch
      dispatch(setFilteredMovies(refetched?.data || []));
      // console.log("Random Movies (Refetched):", refetched?.data);
        break;        
 
    default:
        dispatch(setFilteredMovies([]))
        break;
 }
}

return (

    <div
 className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 -translate-y-[5rem]">
<>
<section>
   <div 
   className="relative h-[50rem] w-screen mb-10 flex items-center justify-center bg-cover" 
   style={{ backgroundImage: `url(${banner})` }} 
     >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-60"></div>


         <div className="relative z-10 text-center text-white mt-[10rem]">

              <h1 className="text-8xl font-bold mb-4">The Movies Hub</h1>
              <p className="text-2xl">
                Cinematic Odyssey: Unveiling the Magic of Movies
              </p>
         </div>

          <section className="absolute -bottom-[5rem]">
            <input
                type="text"
                className="w-[100%] h-[5rem] border px-10 outline-none rounded "
                placeholder="Search Movie"
                value={moviesFilter.searchTerm}
                onChange={handleSearchChange}
              />
        
              <section className="sorts-container mt-[2rem] ml-[10rem]  w-[30rem]">
              
              <select
                  className="border p-2 rounded  text-white"
                  value={moviesFilter.selectedGenre}
                  onChange={(e) => handleGenreClick(e.target.value)}
                >
                  <option value="">Genres</option>
                  {genres?.map((genre) => (
                    <option key={genre._id} value={genre._id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
              
              <select
                  className="border p-2 rounded ml-4 text-white"
                  value={moviesFilter.selectedYear}
                  onChange={(e)=> handleYearChange(e.target.value)}
                >
                  <option value="">Year</option>
                  {uniqueYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

                <select
                  className="border p-2 rounded ml-4 text-white"
                  value={moviesFilter.selectedSort}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="">Sort By</option>
                  <option value="new">New Movies</option>
                  <option value="top">Top Movies</option>
                  <option value="random">Random Movies</option>
                </select>
              </section>
          </section>
            </div>
            
{/* <section className="mt-[10rem] w-screen flex  flex-row justify-around flex-wrap ">
       
            {filteredMovies?.map((movie) => (
               <div className="h-50rem] w-[50rem]">  
               <MovieCard key={movie._id} movie={movie} />
            </div>

            ))}
          </section> */}

          <section className="mt-[10rem] w-[100vw] flex flex-row flex-wrap gap-6 pl-[2rem] items-center justify-center">
  {filteredMovies?.map((movie) => (
    <div key={movie._id} className="w-[30rem]">
      <MovieCard movie={movie} />
    </div>
  ))}
</section>



</section>
</>

    </div>
)





  }
  export default AllMovies;




  
 //notes 
 /*
👀 Line 1:
js
Copy
Edit
const movieYears = data?.map((movie) => movie.year);
✅ What's happening:
data is an array of movie objects like:

js
Copy
Edit
[
  { title: "Batman", year: 2022 },
  { title: "Joker", year: 2019 },
  { title: "Superman", year: 2022 }
]
map() is used to extract just the year from each movie.

So movieYears will become:

js
Copy
Edit
[2022, 2019, 2022]
The ?. is optional chaining:

It ensures that if data is undefined or null, it won’t crash your app.

It will just result in movieYears being undefined.

👀 Line 2:
js
Copy
Edit
const uniqueYears = Array.from(new Set(movieYears));
✅ What's happening:
new Set(movieYears) creates a Set (a data structure that only stores unique values).

js
Copy
Edit
new Set([2022, 2019, 2022]) ➝ Set { 2022, 2019 }
Array.from(...) converts that Set back into an array:

js
Copy
Edit
[2022, 2019]

 */