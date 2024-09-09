import { Sidebar as ProSidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { HomeOutlined, PeopleOutlined, SettingsOutlined, MenuOutlined } from '@mui/icons-material';
import { useState } from 'react';

const Sidebar = () => {
    const { collapseSidebar } = useProSidebar(); // Get the collapseSidebar function from the hook
    const [collapsed, setCollapsed] = useState(false); // Track the collapsed state

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <ProSidebar collapsed={collapsed} backgroundColor="#1a1f36" width="250px">
                <Menu>
                    {/* Toggle Button with hover effect */}
                    <MenuItem
                        icon={<MenuOutlined />}
                        onClick={() => {
                            collapseSidebar();   // Toggle collapse
                            setCollapsed(!collapsed); // Update the state
                        }}
                        style={{ textAlign: 'center', color: '#fff', backgroundColor: 'transparent' }} // Same base styling as other items
                        className="hover:bg-blue-500 hover:text-white transition duration-300" // Add hover styles
                    />

                    {/* Menu Items with Hover Effects */}
                    <MenuItem
                        icon={<HomeOutlined />}
                        style={{ color: '#fff', backgroundColor: 'transparent' }} // White text and transparent background
                        className="hover:bg-blue-500 hover:text-white transition duration-300"
                    >
                        Home
                    </MenuItem>
                    <MenuItem
                        icon={<PeopleOutlined />}
                        style={{ color: '#fff', backgroundColor: 'transparent' }}
                        className="hover:bg-blue-500 hover:text-white transition duration-300"
                    >
                        Team
                    </MenuItem>
                    <MenuItem
                        icon={<SettingsOutlined />}
                        style={{ color: '#fff', backgroundColor: 'transparent' }}
                        className="hover:bg-blue-500 hover:text-white transition duration-300"
                    >
                        Settings
                    </MenuItem>
                </Menu>
            </ProSidebar>
        </div>
    );
};

export default Sidebar;