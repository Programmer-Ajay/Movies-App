import { useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import {toast} from 'react-toastify'
import { Link } from "react-router";
import { useGetSpecificMovieQuery,useAddMovieReviewMutation } from "../../redux/api/movie";
import MovieTabs from "./movieTabs.jsx";



const MovieDetails =()=>{
 const {id:movieId}= useParams();
 const [rating,setRating]=useState(0);
 const [comment,setComment]=useState("");

 const{data:movie , refetch}=useGetSpecificMovieQuery(movieId);

const {userInfo}= useSelector((state)=>state.auth);

const [ addMovieReview,{isLoading:loadingMovieReview}]=useAddMovieReviewMutation();

// console.log("Movie cast",movie);
const submitHandler= async(e)=>{
    e.preventDefault();
    
    try{
        await addMovieReview({
            id:movieId,
            rating,
            comment,
        }).unwrap();
        refetch();

        toast.success("Review created Successfully");
    }catch(error){
           toast.error(error.data || error.message);
    };
}

return(
    <div className="overflow-x-hidden">
     <div>
        <Link to="/" className ="text-white font-semibold hover:underline ml-[20rem]">
            Go Back
        </Link>
     </div>
      <div className="mt-[2rem]">

         <div className="flex justify-center items-center">
         <img
            src={movie?.image}
            alt={movie?.name}
            className="w-[40%] h-[45rem] rounded"
          />
         </div>

         {/* containner One */}
          <div className="container  flex justify-between  ml-[18rem] pr-[15rem] mt-[3rem]">
            <section>
             <h2 className="text-5xl my-4 font-extrabold">{movie?.name}</h2>
              <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">
              {movie?.detail}
            </p>

            </section>

            <div className="mr-[5rem">
                 <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">
              {movie?.detail}
            </p>
              <div>
                {movie?.cast.map((c,index)=>(
                    
                    <ul key={index}>
                        <li className="mt-[1rem]">{c}</li>
                    </ul>
                ))}
              </div>
            </div>
          </div>

          <div className="container ml-[20rem]">
            <MovieTabs
             loadingMovieReview={loadingMovieReview}
             userInfo={userInfo}
             submitHandler={submitHandler}
             rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              movie={movie}
            />


          </div>
      </div>
    </div>
);
 


};

export  default MovieDetails