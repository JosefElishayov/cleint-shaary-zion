import { Grid, TextField } from '@mui/material'
import React, { useContext, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { API_URL, doApiMethod } from '../../../services/apiService';
import { MyContext } from '../../../context/myContext';
import { backgroundPage, center } from '../branches/styleMuiBranch';
import { Alert, Button, Form, Input, Result } from 'antd';
export default function ContactPost() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { token } = useContext(MyContext);
    const [isSuccess, setIsSuccess] = useState(false)
    const msgVal = useRef()
    const doApi = async (_bodyData) => {
        let url
        if (!token.role)
            url = API_URL + "/contact/";
        else if (token.role) {
            url = API_URL + "/contact/registered";
        }
        try {
            const data = await doApiMethod(url, "POST", _bodyData);
            if (data._id) {
                setIsSuccess(true)
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    const inputEddPost = [
        {
            name: "שם מלא",
            register: "name",

        }, {
            name: "דואר אלקטרוני",
            register: "email",
        }, {
            name: "מספר טלפון",
            register: "phone",
        }
    ]
    const onSubForm = (_bodyData) => {
        doApi(_bodyData)
        console.log(_bodyData);
    };
    const onSubButton = () => {
        const bodyMsg = {}
        bodyMsg.message = msgVal.current.value
        doApi(bodyMsg)
    };
    return (
        <div  style={{height:(token.role)?"410px":"", background: backgroundPage, color: "white", maxWidth: 400, borderRadius: "2%" }} className='container text-center p-3 shadow shadow-1-secondary  my-3 my-sm-0 ms-md-3'>

            {!isSuccess ?
                <div   >

                    <div className='my-2' style={center}>
                        <h3
                        >יש לך בשבילנו הודעה?
                            <br />
                            כתוב לנו
                        </h3>
                    </div>
                    <Form onFinish={onSubForm}>
                        {!token.role &&
                            <>
                                {inputEddPost.map((edd, i) => (
                                    <Form.Item
                                        name={edd.register}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'אנא הכנס ' + edd.name,
                                            },
                                        ]}
                                    >
                                        <Input placeholder={edd.name} />
                                    </Form.Item>
                                    
                                ))}
                            </>
                        }
                        {!token.role ?
                            <div>
                                <Form.Item
                                    name="message"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'אנא הכנס את תוכן ההודעה',
                                        },
                                    ]}
                                >
                                    <Input.TextArea placeholder="תוכן ההודעה" />
                                </Form.Item>
                            </div> :
                            <div className='my-5'>
                                <textarea  rows={4} className='form-control ' ref={msgVal} >  </textarea>
                                <Button  className='my-5 bg-light' type='button' onClick={onSubButton}>שלח</Button>
                            </div>
                        }

                        {!token.role &&
                            <Button htmlType="submit" className='my-2'>שלח</Button>
                        }
                    </Form >

                </div> :
                <Result
                className='bg-light'
                    status="success"
                    title="תודה רבה על ההודעה אנחנו ניקח את זה מכאן!"
                    extra={[
                        <Button onClick={() => { setIsSuccess(false) }} type="primary" key="console">
                            עוד הודעה
                        </Button>,
                        //   <Button key="buy">Buy Again</Button>,
                    ]}
                />
            }
        </div>
    )
}
