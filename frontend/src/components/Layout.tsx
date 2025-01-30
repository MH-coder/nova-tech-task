import React from "react";
import { Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import InfoIcon from "@mui/icons-material/Info";
import PeopleIcon from "@mui/icons-material/People";

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box display="flex">
      <Drawer variant="permanent" anchor="left" sx={{ flex: 0.2 }}>
        <List>
          {user?.role === "User" && (
            <>
              <ListItemButton onClick={() => navigate("/kyc")}>
                <ListItemIcon>
                  <FingerprintIcon />
                </ListItemIcon>
                <ListItemText primary="KYC" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate("/kyc-status")}>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="KYC Status" />
              </ListItemButton>
            </>
          )}
          {user?.role === "Admin" && (
            <>
              <ListItemButton onClick={() => navigate("/admin")}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Admin Dashboard" />
              </ListItemButton>

              <ListItemButton onClick={() => navigate("/admin/users")}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>
            </>
          )}
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>

      <Box flex={0.8} p={3}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
