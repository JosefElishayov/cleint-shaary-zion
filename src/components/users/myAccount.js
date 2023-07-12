import React from 'react'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { API_URL, doApiMethod } from '../../services/apiService';
import { Box, Button, Card, CardActions, CardContent,  } from '@mui/material';
import { inputEditUser } from './userObj';
import ChangePass from './changePass';
export default function MyAccount(props) {
    const {info ,doApi}=props
    
    const { register, handleSubmit} = useForm();
    const [borderInput, setBorderInput] = useState("none")
    const doApiEdit = async (_bodyData) => {
        try {
            const url = API_URL + "/users/" + info._id;
            const data = await doApiMethod(url, "PUT", _bodyData);
            console.log(data);
            if (data.modifiedCount) {
                alert(" משתמש עודכן");
            }
        } catch (error) {
            console.log(error);
            alert("There problem, try again later")
        }
    }
    const onSubForm = (_bodyData) => {
        console.log(_bodyData);
        doApiEdit(_bodyData)
    };
    return (
        <div style={{ textAlign: "center" }}>
            {info._id &&
                <div className='d-sm-flex justify-content-between'>
                    <div style={{ width: 345,maxWidth:"100%"}}>
                        <form onSubmit={handleSubmit(onSubForm)}>
                            <Card sx={{ textAlign: "center" }}>
                                <CardContent >
                                    <Box sx={{ textAlign: "center" }}>
                                        <h3>פרטי חשבון</h3>
                                        {inputEditUser.map((edit, i) => (
                                            <Box key={i} sx={{ maxWidth: "100%", marginTop: "16px" }} >
                                                {borderInput === "" ?
                                                    <>
                                                        <h6>{edit.name}</h6>
                                                        <input
                                                            className='form-control my-2 '
                                                            style={{ border: borderInput }}
                                                            {...register(edit.register, { required: true })}
                                                            defaultValue={info[edit.register]}
                                                        />
                                                    </> :
                                                    <>
                                                        <h6>{edit.name}</h6>
                                                        <p>{info[edit.register]}</p>
                                                    </>
                                                }
                                            </Box>
                                        ))}
                                    </Box>
                                </CardContent>
                                <CardActions className='center' >
                                    <Button type='button' variant='contained' onClick={() => { setBorderInput("") }} >ערוך משתמש</Button>
                                    {borderInput === "" &&
                                        <Button type='submit' >שמור שינויים</Button>
                                    }
                                </CardActions>
                            </Card>
                        </form>
                    </div>
                    <div style={{ width: 345,maxWidth:"100%"}}>
                        <ChangePass doApi={doApi} item={info} />
                    </div>
                </div>
            }
        </div>
    )
}
