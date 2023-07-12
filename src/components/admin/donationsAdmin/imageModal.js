import { Dialog, DialogContent, Grid } from "@mui/material";
import { useContext, useEffect } from "react";
import { MyContext } from "../../../context/myContext";
export default function ImageModal(props) {
    const { imageLight, setImageLight } = useContext(MyContext);
    return (
        <>
           
            <Dialog open={imageLight} onClose={() => { setImageLight(false) }} maxWidth="md" fullWidth >
                <DialogContent>
                    <Grid item xs={12} sm={10}>
                        <img src={props.itemImg} alt="jj" />
                        {props.ind > 0 &&                      
                            console.log(props.itemImg[props.ind])
                        }
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}
