import axios from "axios";
//import { useParams } from "react-router-dom";
import {  useFormik } from "formik";
import React, { useEffect, useState } from "react";

import DataTable from "react-data-table-component";
import { useLocation, useNavigate } from "react-router-dom";
import { Input,Button,FormText,FormGroup,Form } from "reactstrap";


import "react-datepicker/dist/react-datepicker.css";
import { deleteNote, getNoteByDate } from "./api";

const DairyComponent=()=>{
    const location=useLocation();
    const user_id=location.state.user_id;
    console.log(`User id is:${user_id}`);
    const user_token=localStorage.getItem("token");
    const token=user_token.replaceAll('"','');
    console.log(`token is:${token}`);
    const [userdata,setuserdata]=useState([]);
    const [error,setError]=useState();
    const navigate=useNavigate();
    const [startdate, setStartDate] = useState(new Date());
    console.log(`startdate: ${startdate}`);

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
                setuserdata(response.data.entry_data);
            })
        }
        getUsersData();
    },[]);
    const formik=useFormik({
      initialValues:{
        note:'',
        date:'',
      
      },
      async onSubmit(values){
        const{note,date}=values;
        const body={
          user_id:user_id,
          note:note,
          date:date,
        }
        console.log(body);
        axios.post(`/usersdairy/${user_id}`,body,{
          headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:token,
          },
        }).then((response)=>{
          console.log(`${JSON.stringify(response)}`);
          console.log("inside then");
          window.location.reload(true);
        }).catch((errors)=>{
          console.log(`error is ${errors.response.data.error}`);
          setError(errors.response.data.error);

        })

      },
    });

    async function getData(token,e){
      console.log("inside getDairiesByDate function");
      setStartDate(e.target.value);
      const newDate=e.target.value;
      const NewData=await getNoteByDate(token,newDate);
      console.log(NewData.entry_data);
      setuserdata(NewData.entry_data);

    }





    const columns = [
        {
          name: "Note",
          selector: (row) =>row.note
        //  <EdiText type='text' value={row.note} saveButtonContent="Apply" ></EdiText>
            },
        {
          name: "Date",
          selector: (row) => row.date,
        },
        {name: 'Action',
          selector:(row)=><>
          <button
          onClick={()=>{
            const id=row.id
            const dataUpdate= deleteNote(token,id)
             window.location.reload(true);
          }}
         >Delete</button><span></span>
         <button
         onClick={()=>{
           navigate('/editdairy',{state:{user_id:user_id,id:row.id,note:row.note,date:row.date}});
         }}
         >Edit Note
         </button>
         </>}
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
       <input className="date" type='date' value={startdate} onChange={e=>getData(token,e)}/>
         <DataTable
        columns={columns}
        data={userdata}
        customStyles={customStyles}/>

<Form onSubmit={formik.handleSubmit} className="form-container">
        <FormGroup>
          <Input
            type="text"
            name="note"
            onChange={formik.handleChange}
            value={formik.values.note}
            placeholder="Enter note"
            className="mb-2"
            invalid={formik.errors.note&& formik.touched.note}
            required
          />
          {formik.touched.note && formik.errors.note && (
            <FormText color="danger">{formik.errors.note}</FormText>
          )}
        </FormGroup>
         <FormGroup>
          <Input
            type="date"
            name="date"
            onChange={formik.handleChange}
            value={formik.values.date}
            placeholder="select date"
            className="mb-2"
            invalid={formik.errors.date && formik.touched.date}
            required
          />
          {formik.touched.date && formik.errors.date && (
            <FormText color="danger">{formik.errors.date}</FormText>
          )}
        </FormGroup>
         
        
        <FormGroup className="text-right">
          <Button color="primary" type="submit" className="w-50 mb-2" >
            Add Note
          </Button>
        </FormGroup>
        </Form>
        <p>{error}</p>
    </div>
  )
}

export default DairyComponent;