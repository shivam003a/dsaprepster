import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import Loading from '../Components/Loading';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../ContextAPI/AppContext';

const Register = () => {

    const { loading, setLoading } = useContext(AppContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: ""
    })

    const handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value

        setFormData((prev) => ({
            ...prev, [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { fullname, email, password } = formData

            const res = await fetch('/api/v1/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fullname, email, password
                })
            })

            const data = await res.json()

            if (res.status === 200) {
                toast.success(data.msg, {
                    position: "bottom-center"
                })
                navigate('/login')
            }
            else {
                toast.error(data.msg, {
                    position: "bottom-center"
                })
            }

        } catch (e) {
            console.error(e.message)
            toast.error("Something went wrong", {
                position: "bottom-center"
            })
        }
        setLoading(false)
    }

    return (
        <>
            <div className="auth">
                {
                    loading ? (<Loading />) : (
                        <div className='authContainer'>
                            <span>Ready to unlock a world of DSA opportunities?<br /><br /> Register now and open the door to success</span>
                            <form method='POST'>
                                <h2>Register</h2>
                                <input type="text" name="fullname" placeholder="name" value={formData.name} onChange={handleInput} />
                                <input type="email" name="email" placeholder="e-mail" value={formData.email} onChange={handleInput} />
                                <input type="password" name="password" placeholder="password" value={formData.password} onChange={handleInput} />
                                <input type="submit" className='submitReg' placeholder="Submit" onClick={handleSubmit} />
                            </form>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Register;