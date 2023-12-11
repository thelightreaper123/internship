import React, { useState } from 'react';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from './Firebase';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { getAuth, updateProfile } from "firebase/auth";
function Home() {
    const signOutError = (error) => {
        toast.error(error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
        });
    }

    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate("/login");
        }).catch((error) => {
            const errorMessage = error.message;
            signOutError(errorMessage);
        });
    }

    const currentUser = auth.currentUser;

    return (
        <div>
            <nav>
            <h1>Welcome to the Home Page</h1>
      {currentUser ? (
        <p>Email: {currentUser.email}</p>
      ) : (
        <p>No user is currently logged in.</p>
      )}


                <div>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>
            <ToastContainer />
        </div>
    );
}

export default Home;