/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from 'react'
import { auth, db, database, storage } from "./config";
import { collection, addDoc, getDocs, doc, setDoc, getDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { UploadResult, getDownloadURL, getStorage, ref as storageref, uploadBytes, updateMetadata, deleteObject, ref } from "firebase/storage";
import { set, get, ref as dbref, child, DatabaseReference, update, push } from "firebase/database";
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import fs from 'fs';

// Utility functions used across the website
interface Course {
  title: string;
  id: number;
  subscribed: number;
  exp: string;
}

interface Course1 {
  title: string;
  id: number;
  subscribed: number;
  exp: string;
  topic: number;
}

interface SubscribedCourse {
  title: string;
  id: number;
  exp: string;
  lessons : [];
}

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

/**
 * Function to sign a user out
 * @param setLoading useState function to set loading state
 */
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

export const getCurrentUser = () => { return auth.currentUser; }

/**
 * Function to get the current user's profile picture
 * @param uid User ID
 * @returns the database reference URL of the current user's profile picture
 */
export const getProfilePicture = async (uid: string) => {
  const storageRef = storageref(storage, "profile-photos/" + uid + "/profile.jpg");
  const photoURL = await getDownloadURL(storageRef);
  return photoURL;
}
export const getDatabaseRef = () => { return dbref(database); }

/**
 * Function used to update the databse with various items, 
 * including topics, courses, and lessons. 
 * Not used in the website, but used during development
 * @param dbref Database reference
 */
export const updateCourses = (dbref : DatabaseReference) => {
  const lessons = [
    {
      type: "lesson",
      title: "AI Fundamentals",
      description: "An overview of artificial intelligence, covering key concepts, history, and applications."
    },
    {
      type: "article",
      title: "Machine Learning Overview",
      description: "Exploring the basics of machine learning, including supervised and unsupervised learning."
    },
    {
      type: "project",
      title: "Simple ML Project",
      description: "Implement a simple machine learning project using a popular framework like TensorFlow or PyTorch."
    },
    {
      type: "lesson",
      title: "Neural Networks",
      description: "Diving into the workings of neural networks and their role in powering deep learning applications."
    },
    {
      type: "article",
      title: "AI in Today's World",
      description: "Discussing current and future applications of AI across various industries."
    },
    {
      type: "lesson",
      title: "Ethics in AI",
      description: "Exploring ethical considerations and challenges in the development and application of AI technology."
    },
    {
      type: "project",
      title: "AI Ethics Case Study",
      description: "Analyzing a case study to discuss ethical implications of AI in real-world scenarios."
    },
    {
      type: "lesson",
      title: "AI for Problem Solving",
      description: "Learning how AI can be applied to solve complex engineering and societal problems."
    }
  ];
  
  let lessonCounter = 0;

  lessons.forEach((lesson) => {
    const courseRef = child(dbref, `courses/2/0/lessons/${lessonCounter}`);
    set(courseRef, {
      type : lesson.type,
      title : lesson.title,
      description : lesson.description
    }).then(() => {
      console.log("Data saved successfully.");
    }).catch((error) => {
      console.log("Data could not be saved." + error);
    });

    lessonCounter++;
  });
}

/**
 * Function to get the course data for a specific course in the db
 * @param courseTopic Topic containing the course
 * @param courseId Course ID for the course to get
 * @returns the data for the requested course
 */
export const getCourseData = async (courseTopic : number, courseId: number) => {
  const courseRef = doc(db, `courses/${courseTopic}` + courseId);
  const courseData = await getDoc(courseRef);
  return courseData.data();
}

/**
 * Returns all the courses from the specified topic
 * @param topic Requested topic
 * @returns the courses from the requested topic
 */
let a = 0;
export const getCoursesFromTopic = async (topic: number) : Promise<Course[]> => {
  const coursesRef = child(getDatabaseRef(), `courses/${topic}`);
  const coursesSnapshot = await get(coursesRef);
  const coursesData = coursesSnapshot.val();
  a++;
  const courses: Course[] = Object.keys(coursesData).map(key => {
    return {
      title: coursesData[key].title,
      id: a,
      subscribed: coursesData[key].subscribed,
      exp: coursesData[key].exp
    };
  });

  return courses;
}

/**
 * Most difficult function to implement for some reason
 * Had to workaround the naming of the topics in the firestore database
 * Returns the name of a topic given its id
 * @param id Identier of the topic
 * @returns the name of the request topic by ID
 */
export const getTopicName = async (id: number) => {
  try {
    const topicsCollection = collection(db, 'topics');
    const querySnapshot = await getDocs(query(topicsCollection, where('id', '==', id)));
    if (!querySnapshot.empty) {
      const topicDoc = querySnapshot.docs[0].data();
      return topicDoc.title; 
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    console.error('Error getting document:', error);
  }
};

/**
 * Returns an array of all course objects from the database
 * @param dbref Database reference
 * @returns 
 */
export const getCourses = async (dbref : DatabaseReference, setLoading: (value: boolean) => void) : Promise<Course1[]> => {
  const courses: Course1[] = []; 
  let i = 0;
  setLoading(true);
  do {
    const courseRef = child(dbref, `courses/${i}`);
    const courseSnapshot = await get(courseRef);
    if (courseSnapshot.exists()) {
      const courseData = courseSnapshot.val();
      for (let j = 0; j < 10; j++) {
        if (courseData[j]) {
          courses.push({
            title: courseData[j].title,
            id: j,
            subscribed: courseData[j].subscribed,
            exp: courseData[j].exp, 
            topic: i
          });
        }
      }
    }
    i++;
  } while (i < 25)
  setLoading(false);
  return courses;
}

/**
 * Returns an array of all course objects which have a high subscriber number
 * @returns all courses which have 10 or more subscribers
 */
export const getFeaturedCourses = async () : Promise<Course[]> => {
  let featuredCourses: Course[] = [];

  // Each topic has 10 courses
  for(let i = 0; i < 10; i++){
    const courseRef = child(getDatabaseRef(), `courses/${i}`);
    const coursesSnapshot = await get(courseRef);

    if (coursesSnapshot.exists()) {
      const coursesData = coursesSnapshot.val();
      const courses: Course[] = Object.keys(coursesData).map(key => {
        return {
          title: coursesData[key].title,
          id: coursesData[key].id,
          subscribed: coursesData[key].subscribed,
          exp: coursesData[key].exp
        };
      }).filter(course => course.subscribed > 10);
      featuredCourses = [...featuredCourses, ...courses];
    }
  }

  return featuredCourses;
}

/**
 * Returns an array of all the courses which the current user is subscribed to
 * @param uid User ID
 */
export const getUserSignedCourses = async (uid: string) => {
  const userRef = child(getDatabaseRef(), `users/${uid}`);
  const userSnapshot = await get(userRef);

  if(userSnapshot.exists()){
    const userData = userSnapshot.val();
    const topicIds = Object.keys(userData.courses);

    const courses : SubscribedCourse[] = [];

    for (let i = 0; i < topicIds.length; i++) {
      const topicId = topicIds[i];
      const courseIds = Object.keys(userData.courses[topicId]);

      for (let j = 0; j < courseIds.length; j++) {
        const courseId = courseIds[j];
        const courseRef = child(getDatabaseRef(), `courses/${topicId}/${courseId}`);
        const courseSnapshot = await get(courseRef);

        if(courseSnapshot.exists()){
          const courseData = courseSnapshot.val();
          courses.push({
            title: courseData.title,
            id: courseData.id,
            exp: courseData.exp,
            lessons: courseData.lessons
          });
        }
      }
    }

    return courses;
  }
}

/**
 * Returns an array of courses of the same level as the user's global experience and in the same category of 'interest'
 * @param uid User ID
 * @returns returns an array of courses based on the courses the current user is subscribed to
 */
export const suggestCourses = async (uid: string) => {
  const userRef = child(getDatabaseRef(), `users/${uid}`);
  const userSnapshot = await get(userRef);

  const globalExp = await getGlobalExp(uid);

  if(userSnapshot.exists()){
    const userData = userSnapshot.val();
    const userTopics = userData.interests;

    // Get the courses for each topic
    const suggestedCourses: Course1[] = [];
    for(let i = 0; i < userTopics.length; i++){
      const coursesRef = child(getDatabaseRef(), `courses/${userTopics[i]}`);
      const coursesSnapshot = await get(coursesRef);
      const coursesData = coursesSnapshot.val();

      const courses: Course1[] = Object.keys(coursesData).map(key => {
        return {
          title: coursesData[key].title,
          id: coursesData[key].id,
          subscribed: coursesData[key].subscribed,
          exp: coursesData[key].exp,
          topic: userTopics[i],
        };
      }).filter(course => {
        return course.exp === (globalExp < 100 ? "beginner" : globalExp < 500 ? "intermediate" : "advanced") ;
      });
      suggestedCourses.push(...courses);
    }

    return suggestedCourses;
  }
}

/**
 * Returns the user's global experience
 * Global exp increases as the user completes courses
 * @param uid User ID
 * @returns returns user's global experience
 */
export const getGlobalExp = async (uid: string) => {
  const userRef = child(getDatabaseRef(), `users/${uid}`);
  const userSnapshot = await get(userRef);

  return userSnapshot.val().globalexp;
}

/**
 * Currently unused
 * Updates the user's global experience after completing a course
 * @param uid User ID
 */
export const updateGlobalExp = async (uid: string) => {
  const UserRef = child(getDatabaseRef(), `users/${uid}`);
  const userSnapshot = await get(UserRef);

  const userExp = userSnapshot.val().globalexp;

  const addedExp : number = userSnapshot.val().courses.reduce((acc: number, course: Course) => {
    return acc + course.exp;
  }, 0);

  const newExp = userExp + addedExp;

  await set(UserRef, {
    globalexp: newExp
  });
}

/**
 * Function to check if a user is signed up to a topic/course pair
 * @param topic Topic to check for 
 * @param course Course to check for
 * @returns Boolean value indicating if the user is already signed up for the course
 */
export const isAlreadySignedUp = async (topic : number, course : number) => {
  const userRef = child(getDatabaseRef(), `users/${auth.currentUser?.uid}`);
  const userSnapshot = await get(userRef);

  const userData = userSnapshot.val();
  
  return (userData.courses && userData.courses[topic] && userData.courses[topic][course] != undefined);
}

/**
 * Function to sign a user up to a course
 * @param topic Topic containing the course
 * @param course Course to sign up to
 */
export const signUpToCourse = async (topic : number, course : number) => {

  const userRef = child(getDatabaseRef(), `users/${auth.currentUser?.uid}`);

  const courseRef = child(getDatabaseRef(), `courses/${topic}/${course}`);
  const courseSnapshot = await get(courseRef);

  const courseData = courseSnapshot.val();
  const courseSubscribers = courseData.subscribed;

  await update(courseRef, {
    subscribed: courseSubscribers + 1
  });

  await update(userRef, {
    [`courses/${topic}/${course}`]: {
      title: courseData.title,
      exp: courseData.exp
    }
  }).catch((error) => {
    console.log(error);
  });

}