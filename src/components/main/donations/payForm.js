import React, { useContext, useEffect, useState } from 'react'
import { API_URL, doApiMethod } from '../../../services/apiService';
import { Button, Dialog, DialogContent, Grid, TextField, Typography } from '@mui/material';
import { MyContext } from '../../../context/myContext';
import { useForm } from 'react-hook-form';
import { inputEddPay } from './objDonations';
import PaypalButton from './paypalButton';
export default function PayForm(props) {
  const { token } = useContext(MyContext);
  const [dataId, setDataId] = useState("")
  const { isPay, setIsPay, msgVal, priceVal, name } = props;
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [continuoPay, setContinuoPay] = useState(false)
  const title = ["אנא מלא פרטים", "שים לב!"]
  useEffect(() => {
    if (msgVal) {
      setValue("comments", msgVal);
    }
    setValue("price", priceVal)
  }, [])
  const doApi = async (_bodyData) => {
    let url
    if (!token.role)
      url = API_URL + "/purchase/out";
    else if (token.role) {
      url = API_URL + "/purchase";
    }
    try {
      const data = await doApiMethod(url, "POST", _bodyData);
      console.log(data);
      if (data._id) {
        // alert("התשלום הצליח ");
        setContinuoPay(true)
        setDataId(data._id)
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  const handleClose = () => {
    setIsPay(false);
  };
  const onSubForm = (_bodyData) => {
    _bodyData.comments = msgVal
    _bodyData.price = priceVal;
    console.log(_bodyData);
    doApi(_bodyData)
  };
  const product = {
    description: name,
    price: priceVal
  }
  return (
    <Dialog open={isPay} onClose={handleClose} fullWidth>
      <Typography className='mt-3' variant="h4" align="center" >
        {token.role ? title[1] : title[0]}
      </Typography>
      <DialogContent sx={{ textAlign: "center" }}>
        <form onSubmit={handleSubmit(onSubForm)}>
          <Typography className='mb-4' variant="h6" align="center">תרומה עבור {name} </Typography>
          <div className='my-3'>
            <span style={{ borderRadius: "5%" }} className='border border-info fs-3 bg-info p-1 '>{priceVal} ₪</span>
          </div>
          <Grid container spacing={2} justifyContent="center">
            {!token.role &&
              <>
                {inputEddPay.map((item, i) => (
                  <Grid key={i} item xs={12} sm={6}>
                    <TextField
                      {...register(item.register, { required: true })}
                      label={item.name}
                      variant="outlined"
                      fullWidth
                      error={!!errors[item.error]}
                      helperText={errors[item.error] ? ' * שדה זה הינו חובה ' : ''}
                    />
                  </Grid>
                ))}
              </>
            }
            <Grid item xs={12} sm={7}>
              <div>
                <h4>תוכן ההודעה</h4>
                <p>{msgVal}</p>
              </div>
            </Grid>
          </Grid>
          {!continuoPay &&
            <>
              {!token.role ?
                <Button type="submit">המשך לתשלום</Button> :
                <Button onClick={() => { onSubForm({}) }} type="button">המשך לתשלום</Button>
              }
            </>
          }
        </form>
        {continuoPay &&
        <div className='d-sm-flex  justify-content-around'>
       <div className='mb-2'> <Button variant='outlined'>בכרטיס אשראי</Button></div>  
          <PaypalButton product={product} dataId={dataId} />
          </div>
        }
      </DialogContent>
    </Dialog>
  )
}
