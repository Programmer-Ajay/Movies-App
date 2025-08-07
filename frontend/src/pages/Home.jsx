import Header from "./Movies/Header.jsx";
import MoviesContainerPage from "./Movies/MoviesContainerPage.jsx";
const Home =()=>{

    return (
        <div
        >
       <Header />
        <section className="mt-[10rem] ">
        <MoviesContainerPage />
        </section>
       
        </div>
    )
}
export default Home;