import React, { useEffect, useRef, useState } from 'react'
import { API_URL, doApiMethod } from '../../services/apiService';
import { useForm } from 'react-hook-form';
import { Button, Card, CardActions, CardContent } from '@mui/material';

export default function ChangePass(props) {
    const [error, setError] = useState("")
    const [errorPass, setErrorPass] = useState("")
    const {  item } = props;
    const passRef = useRef()
    const passOne = useRef()
    const passTow = useRef()

    useEffect(() => {

    }, [])
    const doApiPost = async (_bodyData) => {
        const url = API_URL + "/users/login"
        try {
            const data = await doApiMethod(url, "POST", _bodyData)
            if (data.token) {
                if (passOne.current.value === passTow.current.value)
                    changePassUser(passOne.current.value)
                    else{
                        setErrorPass("*הסיסמא לא תואמת")
                    }
            }
        }
        catch (err) {
            console.log(err);
            setError("*הקש סיסמא נכונה")
        }
    }
    const changePassUser = async (newPass) => {
        const url = `${API_URL}/users/changePass/${item._id}/${newPass}`;
        try {
            const data = await doApiMethod(url, "PATCH");
            if (data.modifiedCount) {
                alert("השינוי הצליח")
            }
        }
        catch (error) {
            console.log(error);

        }
    }
    const onSabForm = () => {
        doApiPost({
            email: item.email,
            password: passRef.current.value
        })

    }
    return (
        <div>
            <Card className=' mt-3 mt-md-0' sx={{ maxWidth: 345, textAlign: "center" }}>
                <CardContent >
                    <h3 className='my-4'>שינוי סיסמה</h3>
                    <label>הכנס סיסמה ישנה</label>
                    <input className='form-control' placeholder='סיסמה ישנה*' type='text' ref={passRef} />
                    <h6 style={{ color: "red" }}>{error}</h6>
                    <label className='mt-3'>הכנס סיסמה חדשה</label>
                    <input ref={passOne} placeholder='סיסמה חדשה*' className='form-control mb-3' type='text' />
                    <label>אימות סיסמה חדשה</label>
                    <input ref={passTow} placeholder='אימות סיסמה' className='form-control' type='text' />
                    <h6 style={{ color: "red" }}>{errorPass}</h6>
                </CardContent >
                <CardActions className='center'>

                    <Button onClick={onSabForm} variant='contained'> שנה סיסמה</Button>
                </CardActions>
            </Card>
        </div>

    )
}
