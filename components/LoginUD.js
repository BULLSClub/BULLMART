import React, { useState } from "react";
import UAuth from "@uauth/js";
import CustomAlert from "../components/common/CustomAlert"; 
import { useRouter } from "next/router";

function LoginUD() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const router = useRouter();

  const login = () => {
    const uauth = new UAuth({
      clientID: "db9bc76f-a465-483e-9022-de0bd19ffe95",
      redirectUri: "http://localhost:3000",
      scope: "openid wallet email profile:optional social:optional",
    });

    uauth
      .loginWithPopup()
      .then((authorization) => {
        console.log(authorization);
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");

        // Show a custom alert
        setAlertMessage("Signed in successfully");
        setShowAlert(true);

        // Redirect to homepage after successful login
        router.push("/");
      })
      .catch((error) => {
        if (error.name === "PopupClosedError") {
          console.log("Popup was closed before authentication.");
        } else {
          console.error("An error occurred during authentication:", error);
        }
      });
  };

  const closeAlert = () => {
    setShowAlert(false);
  };
  return (
    <div id="Loginwithud">
      {!isLoggedIn && (
        <button
          className="default-btn small-btn move-right"
          onClick={login}
          style={{ width: "100px", height: "50px" }}
        >
          Sign in
        </button>
      )}

      {/* Render the custom alert if showAlert is true */}
      {showAlert && (
        <CustomAlert message={alertMessage} onClose={closeAlert} />
      )}
    </div>
  );
}

export default LoginUD;