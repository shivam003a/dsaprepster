import React, { useEffect, useContext } from "react";
import { AppContext } from "../ContextAPI/AppContext";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import Cookies from 'js-cookie'
import Loading from "../Components/Loading";

const Logout = () => {

    const navigate = useNavigate();
    const { setId, loading, setLoading, setLogged } = useContext(AppContext)
    const clearCookie = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/v1/logout', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            Cookies.remove('dsatoken')
            const data = await res.json();

            if (res.status !== 200) {
                throw new Error(data.msg);
            }
            else {
                toast.success(data.msg, {
                    position: "bottom-center"
                })
                setId("")
                setLogged(false)
                navigate('/')
            }
        }
        catch (err) {
            toast.error("Some Error Occured", {
                position: "bottom-center"
            });
        }

        setLoading(false)
    }

    useEffect(() => {
        clearCookie();
    }, []);

    return (
        <>
            <div className="logout">
                {
                    loading ? (<Loading />) : (
                        <div class="loader"></div>
                    )
                }
            </div>
        </>
    )
};

export default Logout;