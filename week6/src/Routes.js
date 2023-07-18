import App from './App'
import Task from './Task';
import { BrowserRouter as Router, Route, Switch, createBrowserRouter, RouterProvider, createRoutesFromElements, Link} from 'react-router-dom';


//components
//import Notfound from './components/Notfound';
//pages
//import Piece from './Piece';

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route exact path='/'>
        <Route 
        index
        element={<App/>}
        />
        <Route 
        path='/:id'
        
        element={<Task/>}
        />
  
      </Route>
    )
  )
  function Routes() {
    
  return (
      <RouterProvider router={router}/> 
  )
  }


export default Routes;