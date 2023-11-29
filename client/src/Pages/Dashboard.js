import React, { useContext, useEffect, useState } from 'react'
import Question from '../Components/Question'
import { AppContext } from '../ContextAPI/AppContext'
import Loading from '../Components/Loading'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

    const navigate = useNavigate()
    const { loading, setLoading, changed, setChanged } = useContext(AppContext)
    const [question, setQuestion] = useState([])
    const [solved, setSolved] = useState([])
    const [topics, setTopics] = useState([])

    const topicList = ['Array', 'Matrix', 'String', 'Searching & Sorting', 'LinkedList', 'Binary Trees', 'Binary Search Trees', 'Greedy', 'BackTracking', 'Stacks & Queues', 'Heap', 'Graph', 'Dynamic Programming', 'Bit Manipulation', 'Trie']

    const getQuestionsList = async () => {
        setLoading(true)

        const res = await fetch('/api/v1/get-questions', {
            method: "GET",
            headers: {
                "Content-Type": "apllication/json"
            },
            credentials: "include"
        })

        const data = await res.json();

        if (res.status === 200) {
            toast.success(data.msg, {
                position: "bottom-center"
            })
            setQuestion(data.data)
        }
        else {
            toast.error(res.msg, {
                position: "bottom-center"
            });
            navigate('/login')
        }

        setLoading(false)
    }

    const getSolved = async () => {
        setLoading(true)

        const res = await fetch('/api/v1/get-solved', {
            method: "GET",
            headers: {
                "Content-Type": "apllication/json"
            },
            credentials: "include"
        })

        const data = await res.json();

        if (res.status === 200) {
            toast.success(data.msg, {
                position: "bottom-center"
            })
            setSolved(data.data.solved)
        }
        else {
            toast.error(res.msg, {
                position: "bottom-center"
            });
            navigate('/login')
        }
        setLoading(false)
    }

    const getFiltered = async (e) => {
        const topic = e.target.innerText
        try {

            const res = await fetch(`/api/v1/get-questions/${topic}`, {
                method: "GET",
                headers: {
                    "Content-Type": "apllication/json"
                },
                credentials: "include"
            })

            const data = await res.json();
            setQuestion(data.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getQuestionsList()
        getSolved()
    }, [changed])

    return (
        <div className='dashboard'>
            {
                loading ? (<Loading />) : (
                    <div className='dashboardContainer'>
                        <div className='questionList'>
                            {
                                question && question.map(que => {
                                    return (
                                        <Question cl={solved.includes(que._id) ? 'green' : ''} que={que} checked={solved.includes(que._id)} />
                                    )
                                })
                            }
                        </div>
                        <div className='filter'>
                            <div className='filterby'>Filter By:</div>
                            <div className='topic'>
                                {
                                    topicList.map(topic => {
                                        return (
                                            <span onClick={getFiltered}>{topic}</span>
                                        )
                                    })
                                }

                                <span onClick={() => getQuestionsList()}>All</span>
                            </div>
                            <div className='topic'>
                                <span onClick={getFiltered}>Basic</span>
                                <span onClick={getFiltered}>Easy</span>
                                <span onClick={getFiltered}>Medium</span>
                                <span onClick={getFiltered}>Hard</span>
                                <span onClick={() => getQuestionsList()}>All</span>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Dashboard
