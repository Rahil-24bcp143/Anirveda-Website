import {useState, useEffect} from 'react';

const AdminLogin = () =>{
    const [username, setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

// Checking if the Admin is already logged in or not using the local Storage whenever the site is refreshed!

useEffect(()=>{
    const token = localStorage.getItem("adminToken");
    if(token === "anirveda-admin-token"){
        setIsLoggedIn(true);
    }
}, []);

const handleLogin = (e) =>{
    e.preventDefault();

    if(isLoggedIn){
        alert("Another Admin is Already Logged In");
        return;
    }

    if(username === "anirveda-admin" && password === "anirveda-admin-123"){
        localStorage.setItem("adminToken", "anirveda-admin-token");
        setIsLoggedIn(true);
        alert("Login Successfull")
    }
    else{
        alert("Invalid Credentials");
    }
};
const handleLogout = () =>{
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
    alert("Logged out successfuly!");
};

return



}
