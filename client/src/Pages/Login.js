import React, { useState, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';
import { AppContext } from '../ContextAPI/AppContext';

const Login = () => {

    const { loading, setLoading, setId, setLogged } = useContext(AppContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData((prev) => ({
            ...prev, [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { email, password } = formData;

            const res = await fetch('/api/v1/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            })

            const data = await res.json();

            if (res.status === 200) {
                toast.success(data.msg, {
                    "position": "bottom-center"
                })
                setId(data.data._id)
                setLogged(true)
                navigate('/dashboard')
            }
            else {
                toast.error(data.msg, {
                    "position": "bottom-center"
                })
            }

        } catch (e) {
            console.log(e.message);
            toast.error("Something went wrong", {
                "position": "bottom-center"
            })
        }

        setLoading(false);
    }



    return (
        <>
            <div className="login">
                {
                    loading ? (<Loading />) : (
                        <div className='lContainer'>
                            <span>Ready to take your DSA preparation to the next level? <br /><br />Sign in and dive right in!</span>
                            <form method="POST">
                                <h2>Login</h2>
                                <input type="email" name="email" placeholder="e-mail" value={formData.email}
                                    onChange={handleInput}
                                />
                                <input type="password" name="password" placeholder="password" value={formData.password}
                                    onChange={handleInput}
                                />
                                <input type="submit" className='submitLog' placeholder="Submit"
                                    onClick={handleSubmit}
                                />
                            </form>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Login;