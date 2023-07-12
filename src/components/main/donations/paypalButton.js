import { PayPalButtons } from '@paypal/react-paypal-js'
import React, { useState } from 'react'
import { API_URL, doApiMethod } from '../../../services/apiService';

export default function PaypalButton(props) {
    const { product,dataId } = props
    const changeStatus = async () => {
        const newStatus = "שולם"
        const url = `${API_URL}/purchase/paid/${dataId}/${newStatus}`;
        try {
          const data = await doApiMethod(url, "PATCH");
          if (data.modifiedCount) {
           console.log("yes");
          }
        }
        catch (error) {
          console.log(error);
          alert("There problem, try again later")
        }
      }
    const [paidFor, setPaidFor] = useState(false)
    const [error,setError]=useState(null)
    const handLeApprove = (orderID) => {
        setPaidFor(true)    
    }
    if(paidFor){
        // alert("תודה רבה על התרומה")
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
