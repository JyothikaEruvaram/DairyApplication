import React, { useState } from 'react';
import "react-tabs/style/react-tabs.css";
import { Tabs,Tab,TabList, TabPanel } from 'react-tabs';
import Credentials from './credentials';
import DairyComponent from './dairy';

const TabComponent=()=>{
    const [selectedIndex, setStateofIndex]=useState(0);
    const   handleSelect = index => {
      setStateofIndex({ selectedIndex: index });
    };
  console.log(new Date().toISOString().slice(0, 10));
   const handleButtonClick = () => {
      setStateofIndex({ selectedIndex: 0 });
    };
    return(
        <div>
            <Tabs className="Tabs">
                <TabList>
                    <Tab>Dairies</Tab>
                    <Tab>My-Credentials</Tab>
                </TabList>
                <TabPanel>
                    <DairyComponent/>
                </TabPanel>
                <TabPanel>
                    <Credentials/>
                </TabPanel>


            </Tabs>
        </div>
    )
}
export default TabComponent;