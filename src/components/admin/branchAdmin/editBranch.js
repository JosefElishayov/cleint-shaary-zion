import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Grid, Typography, IconButton, ImageList, ImageListItem, Container, Toolbar } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { MyContext } from '../../../context/myContext';
import useUploadImage from '../../../hooks/uploadImage';
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiService';
import { Box } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { styleRes } from '../headerAdmin/styleMui';
import Copyright from '../headerAdmin/CopRight';
import { LoadingButton } from '@mui/lab';
import { inputEditBranch } from './objBranch';
import { Skeleton } from 'antd';
function EditBranch(props) {
    const { itemId } = props;
    const [loading, setLoading] = useState(false)
    const [firstImg, setFirstImg] = useState("")
    const [checkFirstImg, setCheckFirstImg] = useState(false)
    const [inputVal, setInputVal] = useState("")
    const [index, setIndex] = useState(0);
    const [info, setInfo] = useState({});
    const { image, setIsAddBranch, setImage, token,setAlertMsg} = useContext(MyContext);
    const { handleFileUpload } = useUploadImage();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [arr, setArr] = useState([])
    const [postAr, setPostAr] = useState([])
    const params = useParams();
    const nav = useNavigate();
    useEffect(() => {
        doApiInit();
    }, [])
    useEffect(() => {
        if (image && !checkFirstImg) {
            const newAArr = [image, ...arr];
            setArr(newAArr);
            setLoading(false)
            setImage('')
        }
        if (image && checkFirstImg) {
            setFirstImg(image)
            console.log(firstImg);

            setCheckFirstImg(false)
        }
        if (arr) {
            setValue("images", arr);
        }
    }, [image]);
    useEffect(() => {
        if (postAr) {
            setValue("news", postAr);
        }
        if (firstImg)
            setValue("imgHeder", firstImg)
    }, [])
    const onSubForm = (_bodyData) => {
        _bodyData.imgHeder = firstImg
        _bodyData.news = postAr;
        _bodyData.images = arr;
        console.log(_bodyData);
        doApiEdit(_bodyData)
    };
    const doApiInit = async () => {
        try {
            let url
            if (token.role === "admin") {
                url = API_URL + "/branches/single/" + params["id"];
            } else {
                url = API_URL + "/branches/single/" + itemId
            }
            const data = await doApiGet(url);
            setInfo(data)
            if (index === 0) {
                setPostAr([...postAr, ...data.news]);
                setArr([...arr, ...data.images])
                setFirstImg(data.imgHeder)
                setIndex(+1)
            }
        } catch (err) {
            console.log(err);
        }
    }
    const handleClose = () => {
        setIsAddBranch(false);
    };
    function handleTextChange(event) {
        setInputVal(event.target.value);
    }
    function handleAddText() {
        setPostAr([inputVal, ...postAr]);
        setInputVal('');
    }
    const doApiEdit = async (_bodyData) => {
        try {
            let url
            if (token.role === "admin") {
                url = API_URL + "/branches/" + params["id"];
            } else {
                url = API_URL + "/branches/" + itemId;
            }
            const data = await doApiMethod(url, "PUT", _bodyData);
            if (data.modifiedCount && token.role === "admin") {
                setAlertMsg((prevPerson) => ({ ...prevPerson, msg: ' הסניף עודכן  ', isWorker: true, status: "success" }));
                nav("/admin/branchList");
            } else if (data.modifiedCount && token.role !== "admin") {
                window.location.reload()
                setAlertMsg((prevPerson) => ({ ...prevPerson, msg: ' הסניף עודכן  ', isWorker: true, status: "success" }));
            }
        } catch (error) {
            console.log(error);
            alert("There problem, try again later")
        }
    }
    const handleDeletePost = (indexToDelete) => {
        const newArray = [...postAr]; // create a new copy of the array
        newArray.splice(indexToDelete, 1); // remove the element at the specified index
        setPostAr(newArray); // update the state with the new array
    };
    const handleDelete = (indexToDelete) => {
        const newArray = [...arr]; // create a new copy of the array
        newArray.splice(indexToDelete, 1); // remove the element at the specified index
        setArr(newArray); // update the state with the new array
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
        <Box sx={styleRes} >
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Toolbar />
                {info._id ?
                    <>
                        <Typography variant="h4" align="center"> עדכון הסניף</Typography>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h6">עריכת תמונה ראשית</Typography>
                            <IconButton onClick={() => { setCheckFirstImg(true) }} color="primary" component="label">
                                {inputImg}
                            </IconButton>
                        </Box>
                        <div className='my-2' style={{ textAlign: "center" }}>
                            <img src={firstImg} width={300} alt='תמונה ראשית' />
                        </div>
                        {info.brunch_name ?
                            <form onSubmit={handleSubmit(onSubForm)}>
                                <Grid container spacing={2} justifyContent="center">
                                    {inputEditBranch.map((edit, i) => (
                                        <Grid key={i} item xs={12} sm={4}>
                                            <h6>{edit.name}</h6>
                                            <TextField
                                                {...register(edit.register, { required: true })}
                                                defaultValue={
                                                    info[edit.register] !== undefined
                                                        ? info[edit.register]
                                                        : edit.register === 'map.wid'
                                                            ? info.map?.wid ?? ''
                                                            : info.map?.len ?? ''
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
                                        <h6> אודות הסניף</h6>
                                        <textarea rows={4} className='form-control' placeholder="מידע"
                                            {...register("info", { required: true })}
                                            defaultValue={info.info}
                                        ></textarea>
                                    </Grid>
                                    <Grid item xs={12} sm={5}>
                                        <h6> עדכון חדש</h6>
                                        <Box sx={{ textAlign: "center" }}>
                                            <textarea rows={4} className='form-control' type="text" value={inputVal} onChange={handleTextChange} ></textarea>
                                            <Button sx={{ marginTop: "8px" }} color='primary' variant="contained" type='button' onClick={handleAddText}>הוסף</Button>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Box sx={{ textAlign: 'center' }}>
                                            <Typography variant="h6">העלאת תמונות</Typography>
                                            <IconButton color="primary" component="label">
                                                {inputImg}
                                            </IconButton>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} justifyContent="center">

                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="h4" align="center">עדכונים </Typography>
                                        <div className="webkit-scrollbar-thumb chat-box">
                                            {postAr.map((message, index) => (
                                                <div key={index} className={`chat-message ${message.from === 'me' ? 'sent' : 'received'}`}>
                                                    {message}
                                                    <Button
                                                        color='error' onClick={() => { handleDeletePost(index) }}>
                                                        <DeleteIcon fontSize="small" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="h4" align="center">תמונות</Typography>
                                        <ImageList sx={{ width: "100%", height: "300px", margin: "8px", overflow: "auto" }} cols={3} rowHeight={164}>
                                            {arr.map((item, i) => (
                                                <ImageListItem key={i}>
                                                    <img style={{ margin: "2px" }}
                                                        src={`${arr[i]}?w=164&h=164&fit=crop&auto=format`}
                                                        srcSet={`${arr[i]}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                        alt={"תמונות שערי ציון"}
                                                        loading="lazy"
                                                        height={200}
                                                    />
                                                    <Button
                                                        color='error' variant="contained" onClick={() => { handleDelete(i) }}>
                                                        <DeleteIcon />
                                                    </Button>
                                                </ImageListItem>
                                            ))}
                                        </ImageList>
                                    </Grid>
                                    <Grid container spacing={2} justifyContent="center">
                                        <Grid sx={{ textAlign: "center", marginTop: "16px" }} item xs={12} sm={6}>
                                            <Button onClick={() => { handleClose(); setArr([]) }} color="error" variant="contained">
                                                מחיקת כל התמונות
                                            </Button>
                                            <Button sx={{ marginX: "8px" }} type="submit" variant="contained" color="primary"
                                                onClick={() => { nav(-1) }}>
                                                חזור
                                            </Button>
                                            <Button type="submit" variant="contained" color="primary">
                                                שמור שינויים
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </form> : <h2> ...</h2>}
                    </> : <Skeleton active />
                }
                <Copyright sx={{ pt: 4 }} />
            </Container>
        </Box >
    );
}
export default EditBranch;
