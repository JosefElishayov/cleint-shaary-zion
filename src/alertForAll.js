import { Dialog, DialogContent } from '@mui/material';
import { Alert} from 'antd';
import React, { useContext } from 'react'
import { MyContext } from './context/myContext';

export default function AlertForAll() {
    const { alertMsg, setAlertMsg } = useContext(MyContext);
    const handleClose = () => {
        setAlertMsg((prevPerson) => ({ ...prevPerson, isWorker: false }));
    };
    
    return (
        <Dialog open={alertMsg.isWorker} onClose={handleClose}>
            {/* <DialogContent> */}

                <Alert
                    message={alertMsg.msg}
                    type={alertMsg.status}
                    showIcon
                    
                />

            {/* </DialogContent> */}
        </Dialog>
      
    )
}

