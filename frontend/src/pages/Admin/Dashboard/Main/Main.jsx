import { useGetAllMoviesQuery,useGetTopMoviesQuery } from "../../../../redux/api/movie";

import { useGetUsersQuery } from "../../../../redux/api/users.js";

import SecondaryCard from "./SecondaryCard.jsx";
import VideoCard from "./VideoCard.jsx";
import RealTimeCard from "./RealTimeCard.jsx";
const Main=()=>{

const {data:topMovies}=useGetTopMoviesQuery();
const {data:allMovies}=useGetAllMoviesQuery();
const {data:visitors}=useGetUsersQuery();


// console.log("All movies",allMovies)

const totalCommentsLength =allMovies?.map((m)=>m.numReviews);
// console.log("total coments",totalCommentsLength)
const sumOfCommentsLength =totalCommentsLength?.reduce((acc,length)=>length+acc,0)

// console.log(sumOfCommentsLength)
return(
    <div>
        <section className="flex justify-evenly">
         <div className="ml-[14rem] mt-10">

            <div className="-translate-x-4 flex">
           <SecondaryCard 
           pill="Users"
           content={visitors?.length}
           info="20.2k more than usual"
           gradient="from-teal-500 to-lime-400"
           />

           <SecondaryCard
              pill="Comments"
              content={sumOfCommentsLength}
              info="742.8 more then usual"
              gradient="from-[#CCC514] to-[#CDCB8E]"
            />
            <SecondaryCard
              pill="Movies"
              content={allMovies?.length}
              info="372+ more then usual"
              gradient="from-green-500 to-lime-400"
            />
            </div>

         <div className="flex justify-between w-[90%] text-white mt-10 font-bold">
            <p>Top Content</p>
            <p>Comments</p>
          </div>
          
          {topMovies?.map((movie)=>(
            <VideoCard 
             key={movie._id}
             image={movie.image}
              title={movie.name}
              date={movie.year}
              comments={movie.numReviews}
            />
          ))}

         </div>

         <div>
          <RealTimeCard />
         </div>
        </section>
    </div>
)
}

export default Main;