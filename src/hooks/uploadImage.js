
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { MyContext } from '../context/myContext';

function useUploadImage() {
  const [imageUrl, setImageUrl] = useState(null);
  const { setImage } = useContext(MyContext);
  // const presetKey = "rwfbhtzi"
  useEffect(() => {
    if (imageUrl) {
      setImage(imageUrl);
    }
  }, [imageUrl, setImage]);

  const handleFileUpload = async (event) => {
    const file = event[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset',process.env.REACT_APP_CLAUDENERY);
    try {
      await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLASS_NAME_KEY}/image/upload`,
        formData
      )
        .then((response) => {
          const img_url = response.data.secure_url.toString();
          console.log(response);
          
          setImageUrl(img_url);
          
        });
    } catch (err) {
      console.log(err);
    }
  };

  return  { handleFileUpload };
}
export default useUploadImage;


