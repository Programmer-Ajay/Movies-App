import { useState , useEffect, use } from "react";
 import { Link,useLocation,useNavigate } from "react-router";

 import { useSelector, useDispatch } from "react-redux";
   
 import Loader from "../../component/Loader";

 import { setCredentials } from "../../redux/features/auth/authSlice";

 import { useRegisterMutation } from "../../redux/api/users";

 import { toast } from "react-toastify";

 const Register=()=>{
     
    const [username ,setUsername]=useState("")
    const [email ,setEmail]=useState("")
    const [password ,setPassword]=useState("");
    const [confirmPassword , setConfirmPassword]= useState("");

    const dispatch =useDispatch();
    const navigate = useNavigate();
    const [register,{isLoading}]=useRegisterMutation();

    const {userInfo} =useSelector((state)=>state.auth);
    
    const {search} =useLocation();

    console.log("search:--",search)
  const searchParams = new URLSearchParams(search);
    console.log("searchParams:--",searchParams)

  const redirect =searchParams.get("redirect")||"/";

    console.log("redirect:--",redirect)/
    
  useEffect(()=>{
    if (userInfo){
        console.log("userInfo :--",userInfo);
        navigate(redirect);
    }

  },[navigate,redirect,userInfo]);

const submitHandler = async(e)=>{
    e.preventDefault();

    if(password !==confirmPassword){
        toast.error("Password do not mathch");
    }else{
        try {
          //this is your backend api from backend response stores in res variable
            const res =await  register({username,email,password}).unwrap();
            console.log("res:--",res);
            dispatch(setCredentials({...res}));  // updatin the store
            navigate(redirect); // redirect to our  destiny route 
            toast.success('user register successfully');
        } catch (error) {
             console.log(error);
             toast.error(error.data.message);
        }
    }
};

return(
   
    <div className="pl-[10rem] flex ">

   <div className="mr-[4rem] mt-[5rem]">

     <h1 className="text-2xl font-semibold mb-4">Register</h1>

     <form onSubmit={submitHandler}
      className="container w-[40rem]">
     <div className="my-[2rem]">
        <label htmlFor="name"
        className="block text-sm font-medium text-white">
            Name

        </label>
         <input
              type="text"
              id="name"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
     </div>

          <div className="my-[2rem]">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>


          <div className="my-[2rem]">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

           <button
            disabled={isLoading}
            type="submit"
            className="bg-teal-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          {isLoading && <Loader />}
      </form>

<div className="mt-4">
          <p className="text-white">
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-teal-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>


   </div>

      <img
        src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="h-[65rem] w-[55%] xl:block md:hidden sm:hidden rounded-lg"
      />

    </div>

)

};
 export default Register;












// //  The useLocation() hook in React Router is used to access the current URL location in a React application. It provides an object containing details about the current route, such as the pathname, search parameters, and state.
// Key Features
// - Retrieve the current URL: Get details about the active route.
// - Access query parameters: Extract search parameters from the URL.
// - Track navigation changes: React to route updates dynamically.
