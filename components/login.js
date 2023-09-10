import {  useAddress, useAuth } from "@thirdweb-dev/react";
import { signInWithCustomToken, signOut } from "firebase/auth";
import React from "react";
import initializeFirebaseClient from "../lib/initFirebase";
import { getDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import useFirebaseUser from "../lib/useFirebaseUser";
import useFirebaseDocument from "../lib/useFirebaseUserDocument";
import Image from "next/image";
import {
  ThirdwebProvider,
  ConnectWallet, metamaskWallet,
  coinbaseWallet,  walletConnect,
} from "@thirdweb-dev/react";
import { useHistory } from 'react-router-dom';




export default function Login() {
  const thirdwebAuth = useAuth();
  const address = useAddress();
  const { auth, db } = initializeFirebaseClient();
  const { user, isLoading: loadingAuth } = useFirebaseUser();
  const { document, isLoading: loadingDocument } = useFirebaseDocument();

  const signIn = async () => {
    const history = useHistory();
    const payload = await thirdwebAuth?.login();

    try {
      // Make a request to the API with the payload.
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payload }),
      });

      // Get the returned JWT token to use it to sign in with
      const { token } = await res.json();

      // Sign in with the token.
      const userCredential = await signInWithCustomToken(auth, token);
      // On success, we have access to the user object.
      const user = userCredential.user;

      // If this is a new user, we create a new document in the database.
      const usersRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(usersRef);

      if (!userDoc.exists()) {
        // User now has permission to update their own document outlined in the Firestore rules.
        setDoc(usersRef, { createdAt: serverTimestamp() }, { merge: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const containerStyle = {
    /* Add your container styles here */
  };

  const iconContainerStyle = {
    /* Add your icon container styles here */
  };

  const iconStyle = {
    /* Add your icon styles here */
    width: "100px",
    height: "100px",
  };

  const h1Style = {
    /* Add your h1 styles here */
  };

  const explainStyle = {
    /* Add your explain styles here */
  };

  const mainButtonStyle = {
    /* Add your main button styles here */
  };

  const dividerStyle = {
    /* Add your divider styles here */
  };

  const connectBtnStyle = {
    /* Add your connect button styles here */
  };

  
  const handleConnectSuccess = () => {
    // Add any logic you need after successful connection
    // For example, you can set some state to indicate the user is connected.
    
    // Redirect to the home page
    history.push('/');
  };

  return (

      


    <div style={containerStyle}>
      <ThirdwebProvider
        activeChain="polygon"
        clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
        supportedWallets={[
          metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
        ]}>
      <div>
        {address ? (
          <div>
            {!user ? (
              <button onClick={() => signIn()} style={mainButtonStyle}>
                Sign in with Wallet
              </button>
            ) : (
              <button
                onClick={() => signOut(auth)}
                style={mainButtonStyle}
              >
                Sign Out
              </button>
            )}

            <hr style={dividerStyle} />

            <h2>Current Information</h2>

            <p>
              <b>User ID: </b>
              {loadingAuth ? "Loading..." : user?.uid || "Not logged in"}
            </p>

            <p>
              <b>Document ID: </b>
              {loadingDocument ? "Loading..." : document?.id || "No document"}
            </p>
          </div>
        ) : (
          <ConnectWallet style={connectBtnStyle} 
          supportedWallets={[
            metamaskWallet(),
            coinbaseWallet(),
            walletConnect(),
          ]}
          onConnect={handleConnectSuccess}
           />
        )}
      </div>
      </ThirdwebProvider>
    </div>
  );
}
