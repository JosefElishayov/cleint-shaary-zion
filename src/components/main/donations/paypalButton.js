import { PayPalButtons } from '@paypal/react-paypal-js'
import React, { useState } from 'react'
import { API_URL, doApiMethod } from '../../../services/apiService';
import { useContext } from 'react';
import { MyContext } from '../../../context/myContext';
import { useNavigate } from 'react-router-dom';

export default function PaypalButton(props) {
    const { product,dataId } = props
    const { setAlertMsg } = useContext(MyContext);
    const nav=useNavigate()
    const changeStatus = async () => {
        const newStatus = "שולם"
        const url = `${API_URL}/purchase/paid/${dataId}/${newStatus}`;
        try {
          const data = await doApiMethod(url, "PATCH");
          if (data.modifiedCount) {
              setAlertMsg((prevPerson) => ({ ...prevPerson, msg: 'יישר כח גדול על התרומה בתרומתך אתה שותף בהחזקת עולם התרומה', isWorker: true, status: "success" }));
              nav(-1)
          }
        }
        catch (error) {
          console.log(error);

        }
      }
    const [paidFor, setPaidFor] = useState(false)
    const [error,setError]=useState(null)
    const handLeApprove = (orderID) => {
        setPaidFor(true)    
    }
    if(paidFor){
        changeStatus()
    
    }
    if (error){
        alert(error)
    }
    return (
        <div>
            <PayPalButtons
                style={{ color: "silver", shape: "pill", tagline: false }}
                createOrder={(data, action) => {
                    return action.order.create({
                        purchase_units: [
                            {
                                description: product.description,
                                amount: {
                                    value: product.price
                                }
                            }
                        ]
                    })
                }}
                onApprove={async (data, action) => {
                    const order = await action.order.capture()
                    console.log("order", order);
                    handLeApprove(data.orderID)

                }}
                onCancel={()=>{

                }}
                onError={(err)=>{
                    setError(err)
                    console.error("ישנה בעייה",err)
                }}
            />
        </div>
    )
}
