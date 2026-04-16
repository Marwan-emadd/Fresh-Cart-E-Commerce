import React, { useState, useEffect } from "react";

export default function useNetwork() {
  let [isOnline, setIsOnline] = useState(true);

  function detectNetworkStatus() {
    window.addEventListener("online", () => {
      setIsOnline(true);
      console.log("You are online");
    });

    window.addEventListener("offline", () => {
      setIsOnline(false);
      console.log("You are offline");
    });
  }

  useEffect(() => {
    detectNetworkStatus();
  }, []);

  return (
    <>
      {isOnline ? (
        <div className="z-100 w-35 h-7 mx-auto px-1 bg-white text-center text-sm rounded-lg shadow-md">
          <i className="fa-solid fa-wifi text-green-500 fa-xl"></i>you are
          online
        </div>
      ) : (
        <div className="z-100 w-40 h-13 mx-auto bg-white border rounded-lg shadow-md">
          <i className="fa-solid fa-wifi text-red-500 fa-2xl"></i> you are
          offline
        </div>
      )}
    </>
  );
}
