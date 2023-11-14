import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../ContextAPI/AppContext'
import Loading from '../Components/Loading'

const UpdateDetails = () => {

    const navigate = useNavigate()

    const { loading, setLoading } = useContext(AppContext)
    const [formData, setFormData] = useState({
        college: '',
        course: '',
        branch: '',
        yop: '',
        location: ''
    })

    const handleInput = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        const res = await fetch('/api/v1/update-profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        })

        const data = await res.json()

        if (res.status === 200) {
            toast.success(data.msg, {
                position: 'bottom-center'
            })
            navigate(`/profile/${data.data._id}`)
        }
        else {
            toast.error(data.msg, {
                position: 'bottom-center'
            })
        }
        setLoading(false)

    }

    return (
        <div className='update'>
            {
                loading ? (<Loading />) : (
                    <div className='updateContainer'>
                        <h1>Update Details</h1>
                        <form>
                            <input type='text' name="college" placeholder='College Name'
                                onChange={handleInput} value={formData.college}
                            />
                            <input type='text' name="course" placeholder='Course'
                                onChange={handleInput} value={formData.course}
                            />
                            <input type='text' name="branch" placeholder='Branch'
                                onChange={handleInput} value={formData.branch}
                            />
                            <input type='text' name="yop" placeholder='Year'
                                onChange={handleInput} value={formData.yop}
                            />
                            <input type='text' name="location" placeholder='Location of Residence'
                                onChange={handleInput} value={formData.location}
                            />
                            <input type='submit' value="Update"
                                onClick={handleSubmit}
                            />
                        </form>
                    </div>
                )
            }

        </div>
    )
}

export default UpdateDetails
