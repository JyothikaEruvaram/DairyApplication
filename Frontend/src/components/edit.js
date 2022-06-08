import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit =()=>{
    const location=useLocation();
    console.log(`user_id:${location.state.user_id}`);
    const [platform,setPlatform]=useState(location.state.platform);
    const [email,setEmail]=useState(location.state.email);
    const [password,setPassword]=useState(location.state.password);
    const [error,setError]=useState();
    const  navigate=useNavigate();
   
    
    const token=localStorage.getItem('token').replaceAll("","");
    console.log(token);
    return(
        <div>
            <h2>Edit Credentials</h2>
            <input type="text" value={platform} onChange={e=>setPlatform(e.target.value)}/><br/>
            <input type="text" value={email} onChange={e=>setEmail(e.target.value)}/><br/>
            <input type="text" value={password} onChange={e=>setPassword(e.target.value)}/><br/>
            <button
                onClick={()=>{
                    const user_id=location.state.user_id;
                    const body={
                        user_id:user_id,
                        platform:platform,
                        email:email,
                        password:password,
                    }
                    console.log(body);
                    axios.put(`/usercredentials/${user_id}`,body,{
                        headers:{
                            authorization:token,
                        },
                    }).then((response)=>{
                        console.log(response);
                        navigate(-1);
                    }).catch((errors)=>{
                        console.log(`error is ${errors.response}`);
                        setError(errors.response);
                    })
                    

                }}            
            >Save</button>
            <p>{error}</p>
        </div>
    )
}

export default Edit;