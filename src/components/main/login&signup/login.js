import * as React from 'react';
import LockOutlinedIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { API_URL, doApiMethod, KEY_TOKEN } from '../../../services/apiService';
import { useNavigate } from 'react-router';
import { useForm } from "react-hook-form"
import { MyContext } from '../../../context/myContext';
import { Alert } from 'antd';
import { Avatar } from '@mui/material';

const theme = createTheme();
export default function Login() {
  
    const nav = useNavigate();
    const { token, donationConnect, donationUrl,setAlertMsg } = React.useContext(MyContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const doApiPost = async (_bodyData) => {
        const url = API_URL + "/users/login"
        try {
            const data = await doApiMethod(url, "POST", _bodyData)
            if (data.token) {
                localStorage.setItem(KEY_TOKEN, data.token);
                if (data.role === "admin") {
                    nav("/admin")
                    window.location.reload()
                }
                else if (data.role !== "admin")
                    if (donationConnect) {
                        nav(donationUrl)
                    }
                    else {
                        nav("/")
                        window.location.reload()
                    }
            }
            else {
                
                setAlertMsg((prevPerson) => ({ ...prevPerson, msg: 'You must logged in with admin user',isWorker:true }));
            }
        }
        catch (err) {
            setAlertMsg((prevPerson) => ({ ...prevPerson, msg: 'אימייל או סיסמא שגויים',isWorker:true ,status:"error"}));
        }
    }
    const onSubForm = (_bodyData) => {
        doApiPost(_bodyData)
    };

    return (
        <>
            {!token.token &&
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            className="p-4 border"
                            sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', background: "white" }}  >
                             <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                                </Avatar>
                               

                            <Box component="form" onSubmit={handleSubmit(onSubForm)} noValidate>
                                <TextField
                                    {...register("email", { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="הכנס כתובת אימייל"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    size='small'
                                />
                                {errors.email && <div className="text-danger">* הכנס אימייל תקין</div>}
                                <TextField
                                    {...register("password", { required: true, minLength: 3 })}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="סיסמה"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    size='small'
                                />
                                {errors.password && <div className="text-danger">* הכנס קוד תקין</div>}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    כניסה
                                </Button>
                                <Grid container>

                                    <Grid item>
                                        <Link href="signup" variant="body2">
                                            {"אין לך חשבון?הירשם"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            }
        </>
    );
}