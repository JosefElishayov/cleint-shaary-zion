import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Grid, Typography, IconButton, ImageList, ImageListItem, Container, Toolbar } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { MyContext } from '../../../context/myContext';
import useUploadImage from '../../../hooks/uploadImage';
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiService';
import { Box } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import { styleRes } from '../headerAdmin/styleMui';
import Copyright from '../headerAdmin/CopRight';
import { inputDonation } from './data/objDonation';
function EditDonations() {
    const [info, setInfo] = useState({});
    const { image} = useContext(MyContext);
    const { handleFileUpload } = useUploadImage();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const params = useParams();
    const nav = useNavigate();
    useEffect(() => {
        doApiInit();
    }, [])
    useEffect(() => {
        if (image) {
            setValue("img_url", image);
        }
    }, [image]);
    const onSubForm = (_bodyData) => {
        console.log(_bodyData);
        doApiEdit(_bodyData)
    };
    const doApiInit = async () => {
        try {
            const url = API_URL + "/donations/single/edit/" + params["id"];
            const data = await doApiGet(url);
            setInfo(data)
        } catch (err) {
            console.log(err);
        }
    }
    const doApiEdit = async (_bodyData) => {
        try {
            const url = API_URL + "/donations/" + params["id"];
            const data = await doApiMethod(url, "PUT", _bodyData);
            if (data.modifiedCount) {
                alert(" דף התרומה עודכן");
                nav("/admin/donationsList");
            }
        } catch (error) {
            console.log(error);
            alert("There problem, try again later")
        }
    }
    return (
        <Box sx={styleRes} >
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Toolbar />
                <Typography variant="h4" align="center"> עדכון דף התרומה</Typography>
                {info._id &&
                    <form onSubmit={handleSubmit(onSubForm)}>
                        <Grid container spacing={2} justifyContent="center">
                        {inputDonation.map((edit, i) => (
                                <Grid key={i} item xs={12} sm={4}>
                                    <h6>{edit.name}</h6>
                                    <TextField
                                        {...register(edit.register, { required: true })}
                                        defaultValue={
                                            info[edit.register] 
                                        }
                                        label=""
                                        variant="outlined"
                                        fullWidth
                                        error={!!errors[edit.error]}
                                        helperText={errors[edit.error] ? edit.errorText : ''}
                                    />
                                </Grid>
                            ))}
                            <Grid item xs={12} sm={5}>
                                <h6> אודות </h6>
                                <textarea className='form-control' placeholder="מידע"
                                    {...register("info", { required: true })}
                                    defaultValue={info.info}
                                ></textarea>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h6">העלאת תמונות</Typography>
                                    <IconButton color="primary" component="label">
                                        <PhotoCamera />
                                        <input
                                            type="file"
                                            hidden accept="image/*"
                                            onChange={(e) => {
                                                handleFileUpload(e.target.files);
                                            }}
                                        />
                                    </IconButton>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid textAlign={'center'} item xs={12} sm={6}>
                            <Typography variant="h4" >תמונה</Typography>
                            <img style={{maxWidth:"450px",width:"100%"}} src={image?image:info.img_url} alt={"donations pic"}  height={300}/>
                        </Grid>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid sx={{ textAlign: "center", marginTop: "16px" }} item xs={12} sm={6}>
                                <Button sx={{ marginX: "8px" }} type="submit" variant="contained" color="primary"
                                    onClick={() => { nav(-1) }}>
                                    חזור
                                </Button>
                                <Button type="submit" variant="contained" color="primary">
                                    שמור שינויים
                                </Button>
                            </Grid>
                        </Grid>
                    </form> 
                    }
                    {/* : <h2> ...</h2>} */}
            <Copyright sx={{ pt: 4 }} />
        </Container>
        </Box >
    );
}
export default EditDonations;
