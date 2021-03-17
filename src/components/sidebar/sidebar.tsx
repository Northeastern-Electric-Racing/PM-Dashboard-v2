import { useState } from 'react';
import 'react-pro-sidebar/dist/css/styles.css'
import './sidebar.module.css';
import { MenuItem, ProSidebar, Menu, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faChartLine, faExchangeAlt, faFolder, faHome, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { pushRotate } from 'react-burger-menu';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="layout">
      <aside>
        <ProSidebar collapsed={collapsed}>
          <Menu iconShape="square">
            <MenuItem icon={<FontAwesomeIcon icon={faHome} />} >Home</MenuItem>
            <MenuItem icon={<FontAwesomeIcon icon={faChartBar} rotation={90}/>} >Gantt</MenuItem>
            <MenuItem icon={<FontAwesomeIcon icon={faFolder} />} >Projects</MenuItem>
            <MenuItem icon={<FontAwesomeIcon icon={faExchangeAlt} />} >Change Requests</MenuItem>
            <MenuItem icon={<FontAwesomeIcon icon={faChartLine} />} >Reports</MenuItem>
            <MenuItem icon={<FontAwesomeIcon icon={faQuestionCircle} />} >Help</MenuItem>
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
    )
}

export default Sidebar;