import { useState } from 'react';
import 'react-pro-sidebar/dist/css/styles.css'
import './sidebar.module.css';
import { MenuItem, ProSidebar, Menu, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="layout">
      <aside>
        <ProSidebar collapsed={collapsed}>
          <Menu iconShape="square">
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
            <MenuItem>Component 3</MenuItem>
          </Menu>
        </ProSidebar>
      </aside>
      <main className="content">
        <div>
          <a href="!#" className="btn" onClick={() => setCollapsed(!collapsed)}>
            Collapse
          </a>
        </div>
      </main>
    </div>

        /* <div className="layout">
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
        </div> */
    )
}

export default Sidebar;