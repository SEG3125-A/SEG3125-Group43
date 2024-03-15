/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { db, database } from "./config";
import { collection, addDoc, getDocs, doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { set, get } from "firebase/database";

// Utility functions used across the website
export const createUser = async (email: string, password: string, name: string) => {
    try {
        const user = await addDoc(collection(db, 'users'), {
            email: email,
            password: password,
            name: name
        });
        return user;
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

export const getTopics = async () => {
    try {
        const topicsSnapshot = await getDocs(collection(db, 'topics'));
        const topics = topicsSnapshot.docs.map(doc => doc.data());
        return topics;
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
}