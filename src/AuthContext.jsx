import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  // TODO: signup
  const signup = async(formData) => {
    const username = formData.get("name")
    const request = await fetch (API + "/signup", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        username: username,
      })
    })

    const response = await request.json();
    setToken(response.token);
    setLocation('TABLET');
    }
    
  // TODO: authenticate
    const authenticate = async() => {
      const request = await fetch (API + "/authenticate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      })
     await request.json();
     setLocation("TUNNEL")
    }


  const value = { location, signup, authenticate };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
