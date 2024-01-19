import { useToast } from '@chakra-ui/react';
import { useState } from 'react';

const useImageUploader = (fieldName, setValue) => {
  const [picLoading, setPicLoading] = useState(false);
  const toast = useToast();

  const uploadPic = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }
    console.log('uploadPic: ', pics);
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
      fetch(process.env.REACT_APP_CLOUDINARY_BASE_URL, {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setValue(fieldName, data.url.toString()); //set link
          console.log('cloudinary url', data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setPicLoading(false);
      return;
    }
  };

  return { picLoading, uploadPic };
};

export default useImageUploader;
