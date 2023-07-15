import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { API_URL, doApiMethod } from '../../../services/apiService';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../../context/myContext';
import { inputSignUp } from './data/dataLogin&signup';
const theme = createTheme();
export default function SignUp() {
    const { register, getValues, handleSubmit, formState: { errors } } = useForm();
    const nav = useNavigate()
    const { setAlertMsg } = React.useContext(MyContext);
    const doApi = async (_bodyData) => {


        let url = API_URL + "/users";
        try {
            const data = await doApiMethod(url, "POST", _bodyData);
            if (data._id) {
                // alert("תתחדש משתמש נרשם");
                setAlertMsg((prevPerson) => ({ ...prevPerson, msg: 'הרישום בוצע בהצלחה', isWorker: true, status: "success" }));
                nav("/login")
            }

        }
        catch (err) {
            if (err.response.data.code === 11000) {
                setAlertMsg((prevPerson) => ({ ...prevPerson, msg: 'האימייל רשום כבר במערכת', isWorker: true, status: "error" }));
            }else if(err){
                setAlertMsg((prevPerson) => ({ ...prevPerson, msg: 'משהו לא עובד אנא נסה מאוחר יותר', isWorker: true, status: "error" }));
            }
        }
    }
    const onSubForm = (_bodyData) => {
        delete _bodyData.password2;
        doApi(_bodyData)
    }
    return (
        <ThemeProvider theme={theme}>
            <Container className='mb-5 mt-md-5 pt-5 pt-md-0' component="main" maxWidth="xs">
        
                <Box sx={{pt:3, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        הרשמה
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(onSubForm)} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            {inputSignUp.map((signup, i) => (
                                <Grid key={i} item xs={12} sm={12}>
                                    <TextField
                                        {...register(signup.register, {
                                            required: true,
                                            minLength: 2,
                                             pattern: signup.register === "email"? /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i:true ,
                                            validate: (value) =>
                                                signup.register === "password2"
                                                    ? value === getValues("password")
                                                    : true
                                        })}     
                                        variant="outlined"                                                                    
                                        fullWidth                             
                                        label={signup.name}
                                        error={!!errors[signup.error]}
                                        helperText={errors[signup.error] ? signup.errorText : ''}
                                    />                                 
                                </Grid>
                            ))}                       
                        </Grid>
                        <Button type="submit" fullWidth sx={{ mt: 3, mb: 2 }} variant="contained" >
                            הרשמה
                        </Button>
                        <Grid container justifyContent="start">
                            <Grid item>
                                <Link href="/login" variant="button">
                                    כבר יש לך חשבון? התחבר
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}