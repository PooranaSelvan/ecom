import { Link } from "react-router-dom"


const Header = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">Our Ecom</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Cart</a></li>
                    <li>
                        <details>
                            <summary>Menu</summary>
                            <ul className="rounded-t-none p-2 bg-base-100 shadow-xl">
                                <li><a>Profile</a></li>
                                <li><a>Dark</a></li>
                                <li><a>Logout</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header