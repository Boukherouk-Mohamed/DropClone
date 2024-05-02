// firebaseApi.js

import { db } from "../../firebase/firebase";
import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

// Collection reference for the 'trash' collection
let trashRef = collection(db, "removedFiles");

export const postTrashCollection = (object) => {
  addDoc(trashRef, object)
    .then(() => {})
    .catch((err) => {
      console.error(err);
    });
};



/**
 * Retrieves the files from the 'myfiles' collection for a specific user
 */
const getFilesForUser = (userId, setFiles) => {
  const filesData = collection(db, "myfiles");
  const unsubscribeFiles = onSnapshot(
    query(filesData, where("userId", "==", userId)),
    (snapshot) => {
      setFiles(() => {
        const fileArr = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
          .sort(
            (a, b) => b.data.timestamp?.seconds - a.data.timestamp?.seconds
          );
        return fileArr;
      });
    }
  );
  // Cleanup the files subscription when the component unmounts
  return unsubscribeFiles;
};


const handleStarred = async (id) => {
  try {
    const docRef = doc(db, "myfiles", id);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const currentStarredStatus = docSnapshot.data().starred || false;
      if (currentStarredStatus) {
        toast.error("Removed from starred");
      } else {
        toast.success("Added to starred");
      }
      await updateDoc(docRef, { starred: !currentStarredStatus });
    } else {
      console.error("Document does not exist.");
    }
  } catch (error) {
    console.error("Error updating starred status: ", error);
  }
};

export { getFilesForUser, handleStarred };
