import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import React from 'react'
import TableMachineVibration from '../table/TableMachineVibration';

function TabVibrationValue({machine}) {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: '100%', typography: 'body1' ,mt:1}}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} >
              <Tab label="Acceleration" value="1" />
              <Tab label="Velocity" value="2" />
              <Tab label="Displacement" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1" ><Box display="flew" justifyContent="center"> <TableMachineVibration label={"Acceleration (mm/s^2) "} machine={machine}/></Box></TabPanel>
          <TabPanel value="2" ><Box display="flew" justifyContent="center"><TableMachineVibration label={"Velocity (mm/s) "}  machine={machine}/> </Box></TabPanel>
          <TabPanel value="3" ><Box display="flew" justifyContent="center"><TableMachineVibration label={"Displacement (mm) "}  machine={machine}/></Box></TabPanel>
        </TabContext>
      </Box>
    );
}

export default TabVibrationValue