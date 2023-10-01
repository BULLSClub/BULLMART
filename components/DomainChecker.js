import { useState } from "react";
import axios from "axios";
import { API_BASE_URL, API_TOKEN } from "../pages/api/hello";
import { useDispatch } from "react-redux";

function DomainChecker() {
  const [domainName, setDomainName] = useState("");
  const [availability, setAvailability] = useState("Unknown"); // Initialize as "Unknown"

  const dispatch = useDispatch();

  const checkAvailability = async () => {
    try {
      const resp = await fetch(`${API_BASE_URL}${domainName}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });

      if (resp.ok) {
        const data = await resp.json();
        console.log("API Response Data:", data);

        const isAvailable = !data.meta.reverse;
        setAvailability(isAvailable ? "Available" : "Taken");

        if (isAvailable) {
          dispatch({ type: "ADD_TO_CART", payload: domainName });
        }
      } else {
        console.error("Error checking domain availability:", resp.statusText);
        setAvailability("Error"); // Handle the error state
      }
    } catch (error) {
      console.error("Error checking domain availability:", error);
      setAvailability("Error"); // Handle the error state
    }
  };

  const addToCart = () => {
    if (availability === "Available") {
      dispatch({ type: "ADD_TO_CART", payload: domainName });
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter domain name"
        value={domainName}
        onChange={(e) => setDomainName(e.target.value)}
      />
      <button onClick={checkAvailability}>Check Availability</button>

      {availability === "Unknown" && <p>Availability: Unknown</p>}
      {availability === "Available" && <p>Availability: Available</p>}
      {availability === "Taken" && <p>Availability: Taken</p>}
      {availability === "Error" && <p>Availability: Error</p>}

      {availability === "Available" && (
        <button onClick={addToCart}>Add to Cart</button>
      )}
    </div>
  );
}

export default DomainChecker;
