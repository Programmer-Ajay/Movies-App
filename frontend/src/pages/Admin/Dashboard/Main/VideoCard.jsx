const  VideoCard =({image ,title,date,comments})=>{
 return (

    <>
    <div className="flex items-center w-[90%] mt-5 shadow-xl/30  ">

        <div>
            <img src={image} alt="card-Image" className="h-[4rem] w-[4rem]" />
        </div>

         <div className="ml-4">
              <h2 className="text-lg text-white">{title}</h2>
              <p className="text-gray-500 mb-3">{date}</p>
         </div>

         <div className="flex-grow mb-5  pr-3.5 flex justify-end items-center">
              <div className="text-white text-lg">{comments}</div>

         </div>

    </div>
    </>
 )

};

export default  VideoCard;
