import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Dialog, DialogContent, Button, Grid, Typography, IconButton, ImageList, ImageListItem } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import useUploadImage from '../../../hooks/uploadImage';
import { API_URL, doApiMethod } from '../../../services/apiService';
import { Box } from '@mui/system';
import LoadingButton from '@mui/lab/LoadingButton';
import { inputEditBranch } from './objBranch';
import { Alert } from 'antd';
import { MyContext } from '../../../context/myContext';
function AddBranch() {
    const [loading, setLoading] = useState(false)
    const [firstImg, setFirstImg] = useState("")
    const [checkFirstImg, setCheckFirstImg] = useState(false)
    const { image, setImage, isAddBranch, setIsAddBranch ,setAlertMsg} = useContext(MyContext);
    const { handleFileUpload } = useUploadImage();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [arr, setArr] = useState([])

    useEffect(() => {
        if (image && !checkFirstImg) {
            const newAArr = [image, ...arr];
            setArr(newAArr);
            setLoading(false)
            setImage('')
        }
        if (image && checkFirstImg) {
            setFirstImg(image)
            setCheckFirstImg(false)
            // setImage('')
        }
        if (arr) {
            setValue("images", arr);
        }
        if (firstImg)
            setValue("imgHeder", firstImg)
    }, [image]);
    const onSubForm = (_bodyData) => {
        _bodyData.imgHeder = firstImg
        _bodyData.images = arr;
        console.log(_bodyData);
        doApi(_bodyData)
    };
    const doApi = async (_bodyData) => {
        let url = API_URL + "/branches";
        try {
            const data = await doApiMethod(url, "POST", _bodyData);
            console.log(data);
            if (data._id) {
                setAlertMsg((prevPerson) => ({ ...prevPerson, msg: 'הסניף נוסף',isWorker:true , status: "success"}));
                handleClose()
                setArr([])
            }
        }
        catch (err) {
            console.log(err);
            setAlertMsg((prevPerson) => ({ ...prevPerson, msg: 'ישנה בעיה אנא נסא מאוחר יותר',isWorker:true , status: "success"}));
        }
    }
    const handleClose = () => {
        setIsAddBranch(false);
    };
    const ButtonLoa = (
        <LoadingButton loading color='error' variant="outlined">
            Submit
        </LoadingButton>
    )
    const inputImg = (
        <>
            {loading && !image ? ButtonLoa : <PhotoCamera />}
            <input
                type="file"
                hidden accept="image/*"
                onChange={(e) => {
                    handleFileUpload(e.target.files);
                    setLoading(true)
                }}
            />
        </>
    )
    return (
        <>
            <Dialog open={isAddBranch} onClose={handleClose} maxWidth="md" fullWidth>
                <Typography variant="h4" align="center">הקמת סניף</Typography>
                <DialogContent>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6">העלאת תמונה ראשית</Typography>
                        <IconButton onClick={() => { setCheckFirstImg(true) }} color="primary" component="label">
                            {inputImg}
                        </IconButton>
                    </Box>
                    <div className='my-2' style={{ textAlign: "center" }}>
                        <img src={firstImg} width={300} alt='תמונה ראשית' />
                    </div>
                    <form onSubmit={handleSubmit(onSubForm)}>
                        <Grid container spacing={2} justifyContent="center">
                            {inputEditBranch.map((add, i) => (
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
                                {errors.info&&<div className='text-danger'>*הכנס אודות</div>}
                            </Grid>
                            <Grid item xs={6} sm={12}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h6">העלאת תמונות</Typography>
                                    <IconButton color="primary" component="label">
                                        {inputImg}
                                    </IconButton>
                                </Box>
                            </Grid>
                            <Box>
                                <Grid item xs={6} sm={12}>
                                    <ImageList sx={{ width: 550, height: 200, margin: "8px", overflow: "auto" }} cols={3} rowHeight={164}>
                                        {arr.map((item, i) => (
                                            <ImageListItem key={i}>
                                                <img
                                                    src={`${arr[i]}?w=164&h=164&fit=crop&auto=format`}
                                                    srcSet={`${arr[i]}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                    alt={"תמונות שערי ציון"}
                                                    loading="lazy"
                                                />
                                            </ImageListItem>
                                        ))}
                                    </ImageList>
                                </Grid>
                            </Box>
                            <Grid alignItems={"center"} item xs={6} sm={12}>
                                <Button onClick={() => { handleClose(); setArr([]) }} color="primary">
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
export default AddBranch;
