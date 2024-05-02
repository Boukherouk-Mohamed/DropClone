import React, { useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { updateProfile, updatePhoneNumber, getAuth, PhoneAuthProvider, updateEmail, sendEmailVerification , signInWithEmailAndPassword } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '../../firebase/firebase';
import './css.css'

function Profile() {
  const { currentUser } = useAuth();
  const [newUsername, setNewUsername] = useState('');
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newEmail, setNewEmail] = useState('');  
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const auth2 = getAuth();

  const handleProfileUpdate = async () => {
    try {
      // Update username
      if (newUsername.trim() !== '') {
        await updateProfile(auth2.currentUser, {
          displayName: newUsername
        });
        setSuccess('Username updated successfully!');
      }

      // Upload and update profile picture
      if (newProfilePic) {
        const storageRef = ref(storage, `profile_pictures/${currentUser.uid}/${newProfilePic.name}`);
        const snapshot = await uploadBytes(storageRef, newProfilePic);
        const picURL = await getDownloadURL(snapshot.ref);

        // Update profile picture URL
        await updateProfile(auth2.currentUser, {
          photoURL: picURL
        });
        setSuccess('Profile picture updated successfully!');
      }

      // Update phone number
        // if (newPhoneNumber.trim() !== '') {
        //   // Send verification code to the new phone number
        //   const provider = new PhoneAuthProvider(auth2);
        //   const verificationId = await provider.verifyPhoneNumber(
        //     newPhoneNumber,
        //     // Here you can provide optional options like recaptchaVerifier
        //   );
        //   // Set the verificationId to the state for later use
        //   setVerificationCode(verificationId);
        //   // Inform the user to enter the verification code
        //   setSuccess('Verification code sent to the new phone number!');
        // }
        // if(newEmail !== ''){
        //   sendEmailVerification(auth2.currentUser)
        //   .then(() => {
        //     updateEmail(auth2.currentUser, newEmail).then(() => {
        //       console.log("hhhhhhhhhhhhh")
        //       alert('email changed')
        //     })
        //   })
        //   .catch((error) => {
        //     console.log("error changin email : ",error)
        //   });
        // }
        window.location.reload();

    } catch (error) {
      setError('Error updating profile: ' + error.message);
    }
  };

  const handlePhoneVerification = async () => {
    try {
      // Confirm the verification code
      const credential = PhoneAuthProvider.credential(verificationCode, verificationCode);
      await updatePhoneNumber(auth2.currentUser, credential);
      setSuccess('Phone number updated successfully!');
    } catch (error) {
      setError('Error updating phone number: ' + error.message);
    }
  };
  

  return (
    <>

<div>
			<div class="container bootstrap snippets bootdey">
    <h1 class="text-primary">Edit Profile</h1>
      <hr/>
	<div class="row">
      
      <div class="col-md-3">
        <div class="text-center">
          <img src={currentUser.photoURL} class="avatar img-circle img-thumbnail" alt="avatar" style={{width:"200px", height:"200px"}}/>
          <h6>Upload a different photo...</h6>
          
          <input type="file" class="form-control" onChange={(e) => setNewProfilePic(e.target.files[0])} accept="image/*" style={{textAlign:"center"}}/>
        </div>
      </div>
      
      
      <div class="col-md-9 personal-info">

        <h3>Personal info</h3>
        
        
          <div class="form-group">
            <label class="col-lg-3 control-label">Username:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" placeholder={auth2.currentUser.displayName} onChange={(e) => setNewUsername(e.target.value)} />
            </div>
          </div>
          <br /><br />
          <div class="form-group">
            <label class="col-lg-3 control-label">Email:</label>
            <div class="col-lg-8">
              <input class="form-control" type="email" placeholder={auth2.currentUser.email}  onChange={(e) => setNewEmail(e.target.value)}  />
            </div>
          </div>
          <br /><br />
          {/* <div class="form-group">
            <label class="col-lg-3 control-label">Phone number:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" placeholder={auth2.currentUser.phoneNumber} onChange={(e) => setNewPhoneNumber(e.target.value)} />
            </div>
          </div> */}
          <br /><br />
          <div style={{ textAlign:"center"}} >
            
              <button  onClick={handleProfileUpdate} id='btnUpdate' >Update profile</button>
            
          </div>
      </div>
  </div>
</div>
<hr/>
		</div>
    

    </>
  );
}

export default Profile;
