import React from 'react';
import './sidebar.module.css';
import { MenuItem, ProSidebar, SidebarHeader, SidebarContent } from 'react-pro-sidebar';


const Sidebar = () => {
    return (
        <ProSidebar
            toggled={true}
        >
            <SidebarHeader>
                <div className="Bar-Header">
                    NER
                </div>
            </SidebarHeader>
            <SidebarContent>
                <MenuItem>
                    Home
                </MenuItem>
                <MenuItem>
                        Gantt
                </MenuItem>
                <MenuItem>
                    Projects
                </MenuItem>
                <MenuItem>
                    Change Requests
                </MenuItem>
                <MenuItem>
                    Reports
                </MenuItem>
                <MenuItem>
                    Help
                </MenuItem>
            </SidebarContent>
            
        </ProSidebar> 
    )
}

export default Sidebar;