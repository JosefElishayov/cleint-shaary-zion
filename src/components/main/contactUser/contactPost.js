import {  Grid, TextField } from '@mui/material'
import React, { useContext, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { API_URL, doApiMethod } from '../../../services/apiService';
import { MyContext } from '../../../context/myContext';
import { center } from '../branches/styleMuiBranch';
import { Alert, Button, Result } from 'antd';
export default function ContactPost() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { token } = useContext(MyContext);
    const[isSuccess,setIsSuccess]=useState(false)
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
        <div id='ab' className='container text-center  border border-3 rounded-2 my-3 my-sm-0 ms-md-3'>
            
            {!isSuccess?
            
            <div className={!token.role ? 'd-md-flex mt-5' : ""}  >
               
                <div className={token.role ? 'm-5' : ''} style={center}>
                    <h3
                    >יש לך בשבילנו הודעה?
                        <br />
                        כתוב לנו
                    </h3>
                </div>
                <form onSubmit={handleSubmit(onSubForm)}>
                    <Grid container spacing={2} justifyContent="center">
                        {!token.role &&
                            <>
                                {inputEddPost.map((edd, i) => (
                                    <Grid key={i} item xs={12} sm={9}>
                                        <TextField
                                            size='small'
                                            style={{ borderRadius: "0%", background: "white" }}
                                            {...register(edd.register, { required: true })}
                                            label={edd.name}
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors[edd.error]}
                                            helperText={errors[edd.error] ? ' * שדה זה הינו חובה ' : ''}
                                        />
                                    </Grid>
                                ))}
                            </>
                        }
                        {!token.role ?
                            <Grid item xs={12} sm={9}>
                                <h6>תוכן ההודעה</h6>
                                <textarea rows={4} className='form-control ' {...register("message", { required: true })} >  </textarea>
                            </Grid> :
                            <Grid item xs={12} sm={9}>                             
                                <textarea rows={4} className='form-control ' ref={msgVal} >  </textarea>
                                <Button  className='my-2' type='button' onClick={onSubButton}>שלח</Button>
                            </Grid>
                        }
                    </Grid>
                    {!token.role &&
                        <Button htmlType="submit" className='my-2'>שלח</Button>
                    }
                </form>
               
            </div>:
            <Result
            status="success"
            title="תודה רבה על ההודעה אנחנו ניקח את זה מכאן!"
            // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
            extra={[
              <Button onClick={()=>{setIsSuccess(false)}} type="primary" key="console">
                עוד הודעה
              </Button>,
            //   <Button key="buy">Buy Again</Button>,
            ]}
          />
}
        </div>
    )
}
