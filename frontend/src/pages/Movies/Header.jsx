import SliderUtil from "../../component/SliderUtils";
import { useGetNewMoviesQuery } from "../../redux/api/movie";
import { Link } from "react-router";


const Header=()=>{
const {data}=useGetNewMoviesQuery();

return(

    <div
className="flex flex-col mt-[2rem] ml-[1rem] mr-[1.5rem] md:flex-row justify-between items-center md:items-start"
    >
        <nav className="w-full md:w-[10rem] ml-2 mt-2 md:ml-2 mb-4 md:mb-0  ">
            <Link to="/"
             className="transition duration-300 ease-in-out hover:bg-teal-200  block p-2 rounded mb-1 md:mb-2 text-lg"
            >
            Home
            </Link>
          <Link
          to="/movies"
          className="transition duration-300 ease-in-out hover:bg-teal-200  block p-2 rounded mb-1 md:mb-2 text-lg"
        >
          Browse Movies
        </Link>
        </nav>

        <div  className="w-full md:w-[80%]  md:mr-2">
          <SliderUtil data={data} />
        </div>
    </div>
)

}

export default Header;