import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../ContextAPI/AppContext";
import { NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";
import Cookies from 'js-cookie'
import { BiAlignRight } from "react-icons/bi";

const Navbar = () => {

    const { id, setId, logged, setLogged } = useContext(AppContext)
    const [isActive, setIsActive] = useState(false)

    const getUserId = async () => {
        try {
            const res = await fetch('/api/v1/get-user-id', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const data = await res.json()

            if (res.status === 200) {
                toast.success(data.msg, {
                    position: "bottom-center"
                })
                setId(data.data._id)
            }
            else {
                toast.error(data.msg, {
                    position: "bottom-center"
                })
            }

        } catch (err) {
            console.log(err)
        }
    }

    const handleNavbar = async (e) => {
        setIsActive(!isActive)
    }

    const handleActivity = async (e) => {
        setIsActive(!isActive)
    }

    useEffect(() => {
        getUserId()

        const cookieValue = Cookies.get('dsatoken');
        if (cookieValue) {
            setLogged(true);
        }
    }, [logged])

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="nav-left">
                        DSAprep
                    </div>
                    <div className={isActive ? "nav-right nav-active" : "nav-right hide"} onClick={handleActivity}>
                        <NavLink to="/" onClick={handleActivity}>Home</NavLink>
                        {
                            logged && <NavLink to="/dashboard" onClick={handleActivity}>Dashboard</NavLink>
                        }
                        {
                            logged && <NavLink to={`/profile/${id}`} onClick={handleActivity}>Profile</NavLink>
                        }
                        {
                            !logged && <NavLink to="/login" onClick={handleActivity}>Login</NavLink>
                        }
                        {
                            !logged && <NavLink to="/register" onClick={handleActivity}>Register</NavLink>
                        }
                        {
                            logged && <NavLink to="/logout" onClick={handleActivity}>Logout</NavLink>
                        }
                    </div>
                    <div className="nav-right-mobile" onClick={handleNavbar}>
                        <BiAlignRight size={25} />
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;