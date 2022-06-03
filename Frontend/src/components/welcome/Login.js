import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import login from "./api";

//import "./style.css";


const Login = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <h1>Welcome to Dairy application</h1>
      <form>
        
            <label htmlFor="email">Username</label>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            /><br/>
         
        
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            /><br/>
          
          
            <button
              type="submit"
              onClick={async (e) => {
                e.preventDefault();
                console.log(`Inside onClick handler: email: ${email}`);
                const response = await login(email, password);
                console.log(`response is ${JSON.stringify(response, null, 2)}`);
                localStorage.setItem("token", response.token);
                console.log(`token: ${localStorage.getItem("token")}`);
                if (response.token) {
                    navigate("/home");
                  }
              }}
            >
              Login
            </button>
            <p>You Don't have an account please SignUp <Link to='/signup'><button>Signup</button></Link></p>
      </form>
    </div>
  );
};

export default Login;
