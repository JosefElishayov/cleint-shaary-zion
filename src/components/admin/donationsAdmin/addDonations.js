import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Dialog, DialogContent, Grid, Typography, IconButton, ImageList, ImageListItem } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { MyContext } from '../../../context/myContext';
import useUploadImage from '../../../hooks/uploadImage';
import { API_URL, doApiMethod } from '../../../services/apiService';
import { Box } from '@mui/system';
import { inputDonation } from './data/objDonation';
function AddDonations() {
    const { image, isAddDonations, setIsAddDonations } = useContext(MyContext);
    const { handleFileUpload } = useUploadImage();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    useEffect(() => {
        // if (image) {
        //     setValue("img_url", image);
        // }
    }, [image]);
    const onSubForm = (_bodyData) => {
        if (image)
            _bodyData.img_url = image
        console.log(_bodyData);
        doApi(_bodyData)
    };
    const doApi = async (_bodyData) => {
        let url = API_URL + "/donations";
        try {
            const data = await doApiMethod(url, "POST", _bodyData);

            if (data._id) {
                alert("הסניף נוסף");
                handleClose()
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    const handleClose = () => {
        setIsAddDonations(false);
    };
    return (
        <>
            <Dialog open={isAddDonations} onClose={handleClose} maxWidth="md" fullWidth>
                <Typography variant="h4" align="center">הוספת סניף</Typography>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubForm)}>
                        <Grid container spacing={2} justifyContent="center">
                            {inputDonation.map((add, i) => (
                                <Grid key={i} item xs={12} sm={4}>
                                    <TextField
                                        {...register(add.register, { required: true })}
                                        label={add.name}
                                        variant="outlined"
                                        fullWidth
                                        error={!!errors[add.error]}
                                        helperText={errors[add.error] ? add.errorText : ''}
                                    />
                                </Grid>
                            ))}
                            <Grid item xs={12} sm={12}>
                                <textarea rows={4} className='form-control' placeholder="אודות"
                                    {...register("info", { required: true })}

                                ></textarea>
                                {errors.info && <div className='text-danger'>*הכנס אודות</div>}
                            </Grid>
                            <Grid item xs={6} sm={12}>
                                <Box sx={{ textAlign: "center" }}>
                                    <Typography variant="h6">העלאת תמונה</Typography>
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
                            <Box>
                                <Grid item xs={6} sm={12}>
                                    <img src={image} alt={"donations pic"} width={300} height={200} />
                                </Grid>
                            </Box>
                            <Grid textAlign={"center"} item xs={6} sm={12}>
                                <Button onClick={() => handleClose()} color="primary">
                                    סגור
                                </Button>
                                <Button type="submit" variant="contained" color="primary">
                                    הוסף
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default AddDonations;
