import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

const UploadQuestion = () => {

    const [formData, setFormData] = useState({
        question: '',
        link: '',
        topic: '',
        dificulty: 'Easy'
    })

    const handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value

        setFormData((prev)=>({
            ...prev, [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { question, link, topic, dificulty } = formData

        const res = await fetch('/api/v1/upload-question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question, link, topic, dificulty
            })
        })

        const data = await res.json()

        if(res.status === 200){
            toast.success(data.msg, {
                position: 'bottom-center'
            })
        }
        else{
            toast.error(data.msg, {
                position: 'bottom-center'
            })
        }
    }
    return (
        <div className="upload">
            <div className='uploadContainer'>
                <span>If you are able to upload question then, <br /><br />Congratulations you are ADMIN and CoFounder</span>
                <form method="POST">
                    <h2>Upload Question</h2>
                    <input type="text" name="question" placeholder="Describe Your Question"
                        value={formData.question} onChange={handleInput}
                    />
                    <select name='dificulty' onChange={handleInput}>
                        <option value="Basic">Basic</option>
                        <option value="Easy" selected="selected">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                    <input type="text" name="link" placeholder="Link of the question"
                        value={formData.link} onChange={handleInput}
                    />
                    <input type="text" name="topic" placeholder="Topic of the question"
                        value={formData.topic} onChange={handleInput}
                    />
                    <input type="submit" className='submitLog' placeholder="Submit"
                        onClick={handleSubmit}
                    />
                </form>
            </div>
        </div>
    )
}

export default UploadQuestion
