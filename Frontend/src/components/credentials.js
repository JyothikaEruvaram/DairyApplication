import React, { useEffect,useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
//import EdiText from 'react-editext';
import {deleteCredentials} from "./api";
import { useFormik } from 'formik';
import {Form,FormGroup,FormText,Button,Input} from 'reactstrap';
const Credentials=()=>{
    
    const location=useLocation();
    const user_id=location.state.user_id;
    console.log(`User id is:${user_id}`);
    const user_token=localStorage.getItem("token");
    const token=user_token.replaceAll('"','');
    console.log(`token is:${token}`);
    const [userdata,setuserdata]=useState([]);
    const [error,setError]=useState();
    const navigate=useNavigate();

    useEffect(()=>{
        async function getUsersData(){
            const userdataResponse=await axios({
                method:"get",
                url:`/usercredentials/${user_id}`,
                headers:{
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization:token,
                },
            }).then((response)=>{
              console.log(`userdata:${JSON.stringify(response)}`);
                console.log(`userdata:${JSON.stringify(response.data.data)}`);
                setuserdata(response.data.data);
            })
        }
        getUsersData();
    },[]);

    const formik=useFormik({
      initialValues:{
        platform:'',
        email:'',
        password:'',
      },
      async onSubmit(values){
        const{platform,email,password}=values;
        const body={
          user_id:user_id,
          platform:platform,
          email:email,
          password:password,
        }
        console.log(body);
        axios.post(`/usercredentials/${user_id}`,body,{
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



    const columns = [
        {
          name: "Platform",
          selector: (row) =>row.platform
          //<EdiText type='text' value={row.platform} saveButtonContent="Apply" ></EdiText>
            },
        {
          name: "Email",
          selector: (row) => row.email,
        },
        {
            name:"Password",
            selector:(row)=>row.password,
        },
        {name: 'Actions',
          selector:(row)=><>
          <button
          onClick={()=>{
          const id=row.id
          console.log(token,id);
           const dataUpdate=deleteCredentials(token,id);
             
            window.location.reload(true);
          }}
          >Delete</button><span></span>
          <button
           onClick={()=>{
            navigate('/editdata', {state: {user_id:user_id, id: row.id ,platform:row.platform,email:row.email,password:row.password}});
           }}>Edit</button>
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
    <div>Credentials
         <DataTable
        columns={columns}
        data={userdata}
        customStyles={customStyles}/>
        {/*<button>button</button>*/}
        <Form onSubmit={formik.handleSubmit} className="form-container">
        <FormGroup>
          <Input
            type="text"
            name="platform"
            onChange={formik.handleChange}
            value={formik.values.platform}
            placeholder="Enter platform"
            className="mb-2"
            invalid={formik.errors.platform && formik.touched.platform}
            required
          />
          {formik.touched.platform && formik.errors.platform && (
            <FormText color="danger">{formik.errors.platform}</FormText>
          )}
        </FormGroup>
         <FormGroup>
          <Input
            type="text"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Enter email"
            className="mb-2"
            invalid={formik.errors.email && formik.touched.email}
            required
          />
          {formik.touched.email && formik.errors.email && (
            <FormText color="danger">{formik.errors.email}</FormText>
          )}
        </FormGroup>
         <FormGroup>
          <Input
            type="text"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Enter password"
            className="mb-2"
            invalid={formik.errors.password && formik.touched.password}
            required
          />
          {formik.touched.password && formik.errors.password && (
            <FormText color="danger">{formik.errors.password}</FormText>
          )}
        </FormGroup>
        
        <FormGroup className="text-right">
          <Button color="primary" type="submit" className="w-50 mb-2" >
            Add Credentials
          </Button>
        </FormGroup>
        </Form>
        <p>{error}</p>
    </div>
    )
}

export default Credentials;