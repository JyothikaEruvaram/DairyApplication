import axios from "axios";
//import { useParams } from "react-router-dom";
//import { Form, useFormik } from "formik";
import React, { useEffect, useState } from "react";
//import { FormGroup, FormText } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useLocation } from "react-router-dom";
//import { Input,Button } from "reactstrap";
//import { deleteEntry, getUserData } from "./api";
//import DatePicker from "react-datepicker";
//import EdiText from "react-editext";
import "react-datepicker/dist/react-datepicker.css";

const DairyComponent=()=>{
    const location=useLocation();
    const user_id=location.state.user_id;
    console.log(`User id is:${user_id}`);
    const user_token=localStorage.getItem("token");
    const token=user_token.replaceAll('"','');
    console.log(`token is:${token}`);
    const [userdata,setuserdata]=useState([]);

    useEffect(()=>{
        async function getUsersData(){
            const userdataResponse=await axios({
                method:"get",
                url:`/usersdairy/${user_id}`,
                headers:{
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization:token,
                },
            }).then((response)=>{
              console.log(`userdata:${JSON.stringify(response)}`);
                console.log(`userdata:${JSON.stringify(response.data.entry_data)}`);
                setuserdata([response.data.entry_data]);
            })
        }
        getUsersData();
    },[])
    const columns = [
        {
          name: "Note",
          selector: (row) =>row.note
        //  <EdiText type='text' value={row.description} saveButtonContent="Apply" ></EdiText>
            },
        {
          name: "Date",
          selector: (row) => row.date,
        },
       // {name: 'Action',
         // selector:(row)=>
          //<button
        //  onClick={()=>{
         //   const id=row.id
         //   const dataUpdate= deleteEntry(token,id)
         //    window.location.reload(true);
         // }}
        //  >Delete</button>}
      ];
      const customStyles = {
        rows: {
          style: {
            minHeight: '62px',
          }
        },
        headCells: {
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          },
        },
        cells: {
          style: {
            fontSize: '17px',
          },
        },
      };
  return (
    <div>
         <DataTable
        columns={columns}
        data={userdata}
        customStyles={customStyles}/>
    </div>
  )
}

export default DairyComponent;