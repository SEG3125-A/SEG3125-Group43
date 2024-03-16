/* eslint-disable @typescript-eslint/no-unused-vars */
// usePhoto.ts
import { useState, ChangeEvent, useEffect } from 'react';
import { useAuth } from './useAuth';
import { uploadProfilePicture } from '../firebase/utils';

export function usePhoto() {
    const { user } = useAuth();

    const [isUploading, setIsUploading] = useState(false);
    const [photoUrl, setPhotoUrl] = useState<string>("");
    const [photo, setPhoto] = useState<File | null>(null);

    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | ArrayBuffer | null>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          setPhoto(file);
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreviewUrl(reader.result as string);
          };
          reader.readAsDataURL(file);
        }
      };

    function handleUpload() {
        if (photo) {uploadProfilePicture(photo, "profile-photos", setIsUploading, user);}
    }

    useEffect(() => {
        if(user?.photoURL){
            setPhotoUrl(user?.photoURL);
        } else {
            console.log("No photo URL");
            //setPhotoUrl("https://filestore.community.support.microsoft.com/api/images/0ce956b2-9787-4756-a580-299568810730?upload=true");
        }
    }, [user])

  return { user, photo, setPhoto, handleChange, handleUpload, photoUrl, isUploading: setIsUploading, isLoading : isUploading, imagePreviewUrl };
}