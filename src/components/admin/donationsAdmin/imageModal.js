import { Dialog, DialogContent, Grid } from "@mui/material";
import { useContext, useEffect } from "react";
import { MyContext } from "../../../context/myContext";
export default function ImageModal(props) {
    const { imageLight, setImageLight } = useContext(MyContext);
    return (
        <>
           
            <Dialog open={imageLight} onClose={() => { setImageLight(false) }} maxWidth="md" fullWidth >
                <DialogContent>
             
                        <img src={props.itemImg} alt="imageDonation"  />
                       
                 
                </DialogContent>
            </Dialog>
        </>
    )
}
