import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import PieChart from '../Components/PieChart';
import { Chart, ArcElement } from 'chart.js'
import Loading from '../Components/Loading';
import { AppContext } from '../ContextAPI/AppContext';
Chart.register(ArcElement);

const Profile = () => {
    const [user, setUser] = useState({})
    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [solved, setSolved] = useState([])
    const navigate = useNavigate()
    const { logged } = useContext(AppContext)

    const getUser = async () => {
        setLoading(true)

        if (!logged) {
            navigate('/login')
        }
        else {
            const res = await fetch(`/api/v1/get-profile/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })

            const data = await res.json()
            setUser(data.data)

            setSolved(data.data.solved)
        }


        setLoading(false)
    }

    useEffect(() => {
        getUser()
    }, [])


    const topicCounts = {}
    solved.forEach(question => {
        const { topic } = question;
        topicCounts[topic] = (topicCounts[topic] || 0) + 1;
    });

    const chartData = {
        labels: Object.keys(topicCounts),
        datasets: [
            {
                data: Object.values(topicCounts),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                ],
            },
        ],
    };

    return (
        <div className='profile'>
            <Link to='/update-details' className='updateDetails'>Update Details</Link>

            {
                loading ? (<Loading />) : (
                    <div className='profileContainer'>
                        <div className='profileInfo1'>
                            <div>
                                <img src={user.imageUrl} alt="profile pic" />
                            </div>
                            <div>
                                <h2>{user.fullname}</h2>
                                <h3>{user.location}</h3>
                                <span>Member Since: {user.joinedAt}</span>
                            </div>
                        </div>
                        <div className='profileInfo2'>
                            <div className='education'>
                                <span>PieChart</span>
                            </div>
                            <div className='pieChart'>
                                <PieChart data={chartData} />
                            </div>
                        </div>
                        <div className='profileInfo3'>
                            <div className='education'>
                                <span>Education</span>
                            </div>
                            <div className='educationInfo'>
                                <h2>{user.college}</h2>
                                <div>
                                    <span>{user.course} | {user.yop}</span>
                                    <span>{user.branch}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Profile
