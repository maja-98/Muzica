import {createBrowserRouter ,RouterProvider} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import User from './components/User'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Error from './components/Error'
import Favourites from './components/subcomponents/Favourites'
import AvailbleSongsList from './components/subcomponents/AvailbleSongsList'
function App() {
    const router = createBrowserRouter([
        {
            path:"/",
            element: <Home/>
        },
        {
            path:'/about/',
            element: <About/>
        },
        {
            path:'/user/',
            element:<User/>
        },   
        {
            path:'/all-songs/',
            element:<AvailbleSongsList/>
        },   
        {
            path:'/fav-songs/',
            element:<Favourites/>
        },    
        {
            path:'/signup/',
            element:<SignUp/>,
        
        },   
        {
            path:'/login/',
            element:<Login/>,
        
        },    
        {
            path:'*',
            element:<Error/>
        },     
    ])
    //react-router
    return(
        <>  
            <RouterProvider router={router}></RouterProvider>
        </>
    )
}

export default App;
