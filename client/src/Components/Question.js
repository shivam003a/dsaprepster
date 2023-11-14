import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { AppContext } from '../ContextAPI/AppContext'
import Loading from '../Components/Loading'

const Question = ({ que, cl }) => {

    const { changed, setChanged, loading, setLoading } = useContext(AppContext)

    const handleSolved = async (e) => {
        const id = e.target.value

        try {
            setLoading(true)
            const res = await fetch(`/api/v1/mark-solved/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await res.json();

            if (res.status === 200) {
                toast.success(data.msg, {
                    position: 'bottom-center'
                })
                setChanged(!changed)
            }
            else {
                toast.error(data.msg, {
                    position: 'bottom-center'
                })
            }

        } catch (err) {
            console.log(err)
            toast.error('Some Error Occured', {
                position: 'bottom-center'
            })
        }

        setLoading(false)
    }
    return (
        <Link to={que.link} target='_blank'>
            {
                loading ? (<Loading />) : (
                    <div className={`question ${cl}`}>
                        <div>
                            <div className='question-heading'>{que.question}</div>
                            <div className='question-details'>{que.topic} | {que.dificulty}</div>
                        </div>
                        <div>
                            <input type='checkbox' value={que._id} onClick={handleSolved} />
                        </div>
                    </div>
                )
            }
        </Link>
    )
}

export default Question
