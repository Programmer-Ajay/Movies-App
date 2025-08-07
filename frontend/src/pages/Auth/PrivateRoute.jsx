// Import necessary components from react-router
import { Navigate, Outlet } from 'react-router'

// Import useSelector hook from redux to access store data
import { useSelector } from 'react-redux'

// Define the PrivateRoute component
const PrivateRoute = () => {

    // Get the userInfo from the Redux store (from the auth slice of state)
    const { userInfo } = useSelector((state) => state.auth);

    // If userInfo exists, user is logged in: render child routes
    // Otherwise, redirect to login page
    return (
        <>
            {userInfo ? (<Outlet />) : (<Navigate to="/login" replace />)}
        </>
    )
}

// Export the component for use in routing
export default PrivateRoute;



/*
Conditional Rendering
If userInfo exists (i.e., user is logged in), we render <Outlet />.

If not, we redirect them to the login page using <Navigate />.

🧭 Why use replace?
The replace prop in <Navigate /> means the current route won't be saved in browser history.

This is useful so the user can’t press "Back" and return to the protected page after being redirected.


*/