import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


const EditDairy=()=>{
    const location=useLocation();
    console.log(`user_id:${location.state.user_id}`);
    const [note,setNote]=useState(location.state.note);
    const date=location.state.date;
    const [error,setError]=useState();
    const  navigate=useNavigate();
   
    
    const token=localStorage.getItem('token').replaceAll("","");
    console.log(token);
    return(
        <div>
            <h2>Edit Note</h2>
            <input type="text" value={note} onChange={e=>setNote(e.target.value)}/><br/>
            <p>{date}</p>
           
            <button
                onClick={()=>{
                    const user_id=location.state.user_id;
                    const body={
                        user_id:user_id,
                        note:note,
                        date:date,
                        
                    }
                    console.log(body);
                    axios.put(`/usersdairy/${user_id}`,body,{
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

export default EditDairy;