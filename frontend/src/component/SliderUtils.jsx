import Slider from  'react-slick'

import "slick-carousel/slick/slick.css"
import 'slick-carousel/slick/slick-theme.css'
import MovieCard from '../pages/Movies/MovieCard.jsx'

const SliderUtil= ({data})=>{
    console.log("Data of utils",data)
    const settings={
        dots:true,
        infinite:true,
        speed:500,
        slidesToShow:4,
        slidesToScroll:2,
    };
    return(
        <Slider {...settings}>
            {data?.map((movie)=>(
                <MovieCard key={movie.id} movie={movie} />
            ))}

        </Slider>
    )


}

export default SliderUtil;
