import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from './Firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginError =(error)=>{
        toast.error(error,{
            position: "top-right", 
            autoClose: 5000,       
            hideProgressBar: false, 
            closeOnClick: true,    
            pauseOnHover: true,    
            draggable: false,       
    });
    }
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            navigate("/home");
            console.log(user);
        })
        .catch((error) => {
            const errorMessage = error.message;
            loginError(errorMessage);
        });
    }
    return (
      <div>
        <form>                                              
                            <div>
                                <label htmlFor="email-address">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"                                    
                                    required                                                                                
                                    placeholder="Email address"
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"                                    
                                    required                                                                                
                                    placeholder="Password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                                                
                            <div>
                                <button                                    
                                    onClick={onLogin}                                        
                                >      
                                    Login                                                                  
                                </button>
                            </div>                               
                        </form>
                       
                        <p className="text-sm text-white text-center">
                            No account yet? {' '}
                            <NavLink to="/signup">
                                Sign up
                            </NavLink>
                        </p>
                        <ToastContainer/>
      </div>
    );
  }
  
  export default Login;