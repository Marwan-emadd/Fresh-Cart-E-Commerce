import React, { useState } from "react";
import { UserContext } from "./UserContext";

export default function UserContextProvider(props) {
  const [userToken, setUserToken] = useState(null);

  return (
    <UserContext.Provider value={{ userToken, setUserToken }}>
      {props.children}
    </UserContext.Provider>
  );
}
