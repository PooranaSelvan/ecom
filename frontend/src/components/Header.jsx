import { Link } from "react-router-dom"
import { onModeButtonClick } from "../darkMode"
import { useSelector, useDispatch } from "react-redux"
import { toast } from 'react-toastify';
import { logout } from "../slices/authSlice"
import { useLogoutMutation } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    
    // redux la iruthu cartItem aa select panrom using useSelector
    // state. - we should pass the name what we gave there
    const { cartItem } = useSelector((state) => state.cart);
    // console.log(cartItem);

    // selecting userInfo from redux store
    // state. - we should pass the name what we gave there
    const { userInfo } = useSelector((state) => state.auth);
    // console.log(userInfo);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();    


    const handleLogout = async() => {
        try{
            const response = await logoutApiCall();
            // console.log(response);
            dispatch(logout());
            toast.success("Successfully logged out.");
            navigate("/login");
        } catch(err){
            console.log(err);
        }
    }

    const handleLogin = () => {
        navigate("/login");
    }

    return (
        <div className="navbar bg-base-100 text-[#DBD8E3]">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">Our Ecom</Link>
            </div>
            <div className="flex flex-wrap">
                <ul className="flex flex-wrap items-center gap-4 menu menu-horizontal px-1 z-10">
                    <li>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" name="search" className="grow" placeholder="Search a Product" />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                             <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                            </svg>
                    </label>
                    </li>
                    <Link to='/cart'>
                        <li className="btn btn-ghost text-md">Cart : {cartItem.length}</li>
                    </Link>
                    <li>
                        {userInfo ? (
                            <details className="text-md">
                                <summary>{userInfo.name}</summary>
                                <ul className="rounded-t-none p-2 bg-base-100 shadow-xl">
                                    <li><a>Profile</a></li>
                                    <li id='theme' onClick={onModeButtonClick}><a>Dark</a></li>
                                    <li onClick={handleLogout}><a>Logout</a></li>
                                </ul>
                            </details>
                        ) : (
                            <div className="text-md">
                                <h3 onClick={handleLogin}>Sign In</h3>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header