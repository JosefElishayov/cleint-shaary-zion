import {createContext, useContext, useEffect, useState} from 'react';
import { API_URL, KEY_TOKEN, doApiGet } from '../services/apiService';


export const MyContext = createContext(null);

export const ContextProvider = ({ children }) => {
    const [token, setToken] = useState({})
    useEffect(() => {
      doApi();
      if(!token)
      localStorage.removeItem(KEY_TOKEN)
    }, [])
    const doApi = async () => {
      const url = API_URL + "/users/checkToken";
      try {
        const data = await doApiGet(url);
        console.log(data)
        setToken(data)
        if (!token)
          localStorage.removeItem(KEY_TOKEN)
      } catch (error) {
        console.log(error);
      }
    }
    const [alertMsg, setAlertMsg] = useState({
        msg: "",
        status: "",
        isWorker: false
    })
    const [isInfoShow, setIsInfoShow] = useState(false);
  const [isEditShow, setIsEditShow] = useState(false);
  const [personInfo, setPersonInfo] = useState("");
  const [image, setImage] = useState('');
  const [isAddBranch, setIsAddBranch] = useState(false)
  const [isAddDonations, setIsAddDonations] = useState(false)
  const [donationConnect, setDonationConnect] = useState(false)
  const [donationUrl, setDonationUrl] = useState('')
    return (
      <MyContext.Provider
        value={{
            isInfoShow, setIsInfoShow,
            personInfo, setPersonInfo,
            isEditShow, setIsEditShow,
            image, setImage,
            isAddBranch, setIsAddBranch,
            isAddDonations, setIsAddDonations,
            token, setToken,
            donationConnect,setDonationConnect,
            donationUrl, setDonationUrl,
            // alert
            alertMsg, setAlertMsg
        }}
      >
        {children}
      </MyContext.Provider>
    );
  };
  
 