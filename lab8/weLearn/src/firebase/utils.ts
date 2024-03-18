/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { auth, db, database, storage } from "./config";
import { collection, addDoc, getDocs, doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { UploadResult, getDownloadURL, getStorage, ref as storageref, uploadBytes, updateMetadata, deleteObject, ref } from "firebase/storage";
import { set, get, ref as dbref } from "firebase/database";
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

// Utility functions used across the website


/**
 * Get the topics list from the database
 * @param setLoading useState function to set loading state
 * @returns topics document reference in array form
 */
export const getTopics = async ( setLoading: (value : boolean) => void ) => {
    setLoading(true);
    try {
        const topicsSnapshot = await getDocs(collection(db, 'topics'));
        const topics = topicsSnapshot.docs.map(doc => doc.data());
        setLoading(false);
        return topics;
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
}

// Very poor fix for the userTopics issue
let userTopics: number[];
export const updateUserTopics = (topics: number[]) => {
    userTopics = topics; 
}

export const getUserTopics = () => {
    return userTopics;
}

let useCredentialsData: { name: string; email: string; password: string; } ;
export const updateCredentials = (name: string, email: string, password: string) => {
    useCredentialsData = {name, email, password};
}

export const getUserCredentials = () => {
    return useCredentialsData;
}

let loginCredentialsData: { email: string; password: string; };
export const updateLoginCredentials = (email: string, password: string) => {
    loginCredentialsData = {email, password};
}

export const getLoginCredentials = () => {
    return loginCredentialsData;
}

/**
 * Get the related courses from the database
 * @param topics 
 * @returns courses document reference in array form
 */
// Placeholder for now
export const getRelatedCourses = async (topics: number[]) => {
    const coursesSnapshot = await getDocs(collection(db, 'courses'));
    const courses = coursesSnapshot.docs.map(doc => doc.data());
    return courses;
}

/**
 * Function to create a new user in the database
 * @param email 
 * @param password 
 * @param name 
 * @param setLoading useState function to set loading state
 * @returns user document reference
 */
export const createUser = async (email: string, password: string, name: string, setLoading: (value : boolean) => void, profile : File | null, bio : string) => {
    setLoading(true);
    // Creating user in Firebase Auth
    await createUserWithEmailAndPassword(auth, email, password)
    .then(() => {console.log("User created in authenticater")})
    .catch((error) => {
        console.log(error);
        setLoading(false);
    });
    
    try {
        // Upload profile picture and update user metadata
       if(profile) uploadProfilePicture(profile, "profile-photos", setLoading, auth.currentUser);
        updateUserMetadata(auth.currentUser, setLoading, name, profile ? profile : null, bio);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
    setLoading(false);
}

/**
 * Function to upload a profile picture to storage
 * @param file Profile picture file to be uploaded
 * @param path Path for the file to be uploaded to
 * @param setLoading useState function to set loading state
 * @param user Currently logged in user
 */
export async function uploadProfilePicture(file: File | null, path: string, setLoading: (value: boolean) => void, user: User | null) {
    setLoading(true);
    // Log the correct file extension 
    const fileExtension = file?.name.split('.').pop();
    // Find file ref using naming system and file extension
    const storageRef = ref(storage, path +"/"+ user?.uid+ "/" + "profile." + fileExtension);
  
    // Upload image to storage
    const snapshot = await uploadBytes(storageRef, file!).catch((error) => {console.log(error)});
    const photoURL = await getDownloadURL(storageRef);
  
    // Update user profile
    if(user)updateProfile(user, {photoURL});
  
    // Update metadata
    const metadata = {
      customMetadata: {
        username: user?.displayName || "",
        title: "profile",
        tag: "profile"
      }
    };
    await updateMetadata(storageRef, metadata);
  
    setLoading(false);
}

/**
 * 
 * @param user Currently logged in user
 * @param setLoading useState function to set loading state
 * @param accountName Currently logged in user's username or accountname
 * @param photo Profile picture file to be uploaded
 * @param bio User bio
 */
export async function updateUserMetadata(user: User | null, setLoading: (value: boolean) => void, accountName: string, photo: File | null, bio : string) {
    setLoading(true);
    if (user) {
      // Get Realtime Database reference for user document
      const userRef = dbref(database, "users/" + user.uid);
  
      // Update user profile
      if (photo) {
        await uploadProfilePicture(photo, "profile-photos", setLoading, user);
      }
  
      await set(userRef, {
        uid: user.uid,
        photoURL: photo ? user.photoURL : null,
        bio: bio,
        interests : getUserTopics(),
      }).catch((error : Error) => {
        console.log(error);
      });
  
    //  Finally, update user info in Firebase Auth
    const displayName = getUserCredentials().name;
      await updateProfile(user, { displayName }).catch((error) => {
        console.log(error);
      });
    }
    setLoading(false);
}

/**
 * 
 * @param email User email
 * @param password User password
 * @param setLoading useState function to set loading state
 */
export async function authenticateUser(email: string, password: string, setLoading: (value: boolean) => void) {
  setLoading(true);
  await signInWithEmailAndPassword(auth, email, password).then(() => {
    console.log("User signed in");
  }).catch((error) => {
    console.log(error);
  });
  setLoading(false);
}

export const signUserOut = async (setLoading: (value: boolean) => void) => {
  setLoading(true);
  await signOut(auth).then(() => {
    console.log("User signed out");
    const navigate = useNavigate();
    navigate('/');
  }).catch((error) => {
    console.log(error);
  });
  setLoading(false);
}