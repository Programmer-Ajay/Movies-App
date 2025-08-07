import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './redux/stores.js'
import { Provider } from 'react-redux'
import { Route,RouterProvider,createRoutesFromElements,createBrowserRouter } from 'react-router'
import Home from './pages/Home.jsx'
import Profile from './pages/User/profile.jsx'

// Auth
import GenreList from './pages/Admin/GenreList.jsx'


//Restricted
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'
import PrivateRoute from './pages/Auth/PrivateRoute.jsx'
import AdminRoute from './pages/Admin/AdminRoute.jsx'


import CreateMovie from './pages/Admin/createMovie.jsx'
import AdminMoviesList from './pages/Admin/AdminMovieList.jsx'
import UpdateMovie from './pages/Admin/updateMovie.jsx'
import AllMovies from './pages/Movies/AllMovies.jsx'
import MovieDetails from './pages/Movies/movieDetails.jsx'
import AllComments from './pages/Admin/AllComments.jsx'

import AdminDashboard from './pages/Admin/Dashboard/AdminDashBoard.jsx'


const router=createBrowserRouter(
  createRoutesFromElements(
    
    <Route path="/" element={<App />}>

      {/* this is our default route */}
     <Route  index={true} path="/" element={<Home />} />    

     <Route path="/register" element={<Register />} />
     <Route  path='/login'element={< Login/>}/>
     <Route path="/movies" element={<AllMovies />} />
     <Route path="/movies/:id" element={<MovieDetails />} />



     <Route path='' element={<AdminRoute />}>

      <Route path="/admin/movies/genre" element={<GenreList/>} />
      <Route path="/admin/movies/create" element={<CreateMovie/>} />
      <Route path="/admin/movies-list" element={<AdminMoviesList/>} />
       <Route path="/admin/movies/update/:id" element={<UpdateMovie/>} />
       <Route path="/admin/movies/comments" element={<AllComments/>} />
       <Route path="/admin/movies/dashboard" element={<AdminDashboard/>} />
     </Route>


     <Route path="" element={<PrivateRoute />}>
      < Route  path="/profile" element={<Profile />} />
     </Route>



      </Route>
    
  )
)




createRoot(document.getElementById('root')).render(
<Provider store={store}>    {/*  this means that your redux store is availble to completee  application*/}
 
<RouterProvider  router={router}/>
</Provider>
    
)
