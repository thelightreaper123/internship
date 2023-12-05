import React,{useState}from 'react';
import {  signOut,onAuthStateChanged} from "firebase/auth";
import {auth} from './Firebase';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { getAuth, updateProfile } from "firebase/auth";
function Home() {
    const [displayName, setDisplayName] = useState('');

    const signOutError =(error)=>{
        toast.error(error,{
            position: "top-right", 
            autoClose: 5000,       
            hideProgressBar: false, 
            closeOnClick: true,    
            pauseOnHover: true,    
            draggable: false,       
    });
    }

    const auth = getAuth();
    const finishSignup=async (e) =>{
        e.preventDefault()
        updateProfile(auth.currentUser, {
            displayName: {displayName}
          }).then(() => {
            // Profile updated!
            // ...
          }).catch((error) => {
            // An error occurred
            // ...
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

    return (
      <div>
        <nav>
                <h1>
                    Welcome Home
                </h1>
                <p>complete setup</p>

                <form>
                <div>
    <label htmlFor="display-name">
        Display Name
    </label>
    <input
        type="text"
        id="display-name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        required
        placeholder="Display Name"
    />
</div>

<button type='submit' onClick={finishSignup}>
    finish

</button>
                </form>
 
                <div>
        			<button onClick={handleLogout}>
                        Logout
                    </button>
        		</div>
            </nav>
      </div>
    );
  }
  
  export default Home;