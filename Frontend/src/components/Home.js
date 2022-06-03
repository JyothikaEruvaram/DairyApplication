import React from 'react';
import "../components/css/home.css";
import Navbar from './Navbar';

const Home=()=>{
    return(
        <div className='home'>
            <Navbar/>
            <h1>Welcome to Dairy_application</h1>
        </div>
    )
}

export default Home;