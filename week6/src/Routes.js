import App from './App'
import Task from './Task';
import { BrowserRouter as Router, Route, Switch, createBrowserRouter, RouterProvider, createRoutesFromElements, Link, useParams} from 'react-router-dom';
import NotFound from './NotFound';



  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route exact path='/' errorElement={<NotFound/>}>
        <Route 
        index
        element={<App/>}
        />
        <Route 
        path='/:id'
        element={<Task/>}
        />
        <Route
        Component={NotFound}
        />
      </Route>
    ),
  )
  function Routes() {
    
  return (
      <RouterProvider router={router}/> 
  )
  }


export default Routes;
