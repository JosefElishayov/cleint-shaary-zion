
import { Box, Button, CardActions, CardContent, Dialog, DialogContent, Grid} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { MyContext } from '../../../context/myContext';
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiService';
import { useForm } from 'react-hook-form';
import { Card } from 'antd';
import { inputEditUser } from '../../users/userObj';
import ChangePass from '../../users/changePass';
export default function UserInfo() {
    const [info, setInfo] = useState({});
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { setIsInfoShow, isInfoShow } = useContext(MyContext);
    const [borderInput, setBorderInput] = useState("none")
    const nav = useNavigate();
    useEffect(() => {
        doApi();
    }, [])
    const doApi = async () => {
        let url = API_URL + `/users/userInfo`
        try {
            const data = await doApiGet(url);
            console.log(data);
            setInfo(data);
        }
        catch (err) {
            console.log(err);
        }
    }
    const doApiEdit = async (_bodyData) => {
        try {
            const url = API_URL + "/users/" + info._id;
            const data = await doApiMethod(url, "PUT", _bodyData);
            if (data.modifiedCount) {
                alert(" משתמש עודכן");
                handleClose()
            }
        } catch (error) {
            console.log(error);
            alert("There problem, try again later")
        }
    }
    const onSubForm = (_bodyData) => {
        // console.log(_bodyData);
        doApiEdit(_bodyData);
    }
    const handleClose = () => {
        setIsInfoShow(false)
    };
    return (

        <Dialog open={isInfoShow} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogContent className=' bg-body-tertiary' >
                {info._id &&
                    // <div className='d-sm-flex justify-content-between'>
                    <Grid container spacing={5}>
                        {/* <div style={{ width: 345, maxWidth: "100%" }}> */}
                        <Grid  item xs={12} sm={6}>
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
                            </Grid>
                        {/* </div> */}
                        {/* <div className='mt-3 mt-sm-0 me-sm-5' style={{ width: 345, maxWidth: "100%", height: "100%" }}> */}
                        <Grid item xs={12} sm={6} sx={{minHeight:"100%"}}>
                            <ChangePass doApi={doApi} item={info} />
                            </Grid>
                        {/* </div> */}
                    {/* </div> */}
                    </Grid>
                }
            </DialogContent>

        </Dialog>
    )
}