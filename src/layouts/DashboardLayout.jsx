import * as React from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  Button,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import { AuthContext } from "../context/AuthContext.jsx";



const drawerWidth = 260;

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { label: "Users", path: "/dashboard/users", icon: <PeopleIcon /> },
  { label: "Doctors", path: "/dashboard/doctors", icon: <LocalHospitalIcon /> },
  { label: "Appointments", path: "/dashboard/appointments", icon: <EventIcon /> },
];

function SidebarContent({ onNavigate }) {
  return (
    <Box sx={{ height: "100%" }}>
      <Toolbar sx={{ px: 2 }}>
        <Typography variant="h6" noWrap>
          My App
        </Typography>
      </Toolbar>

      <Divider />

      <List sx={{ p: 1 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            onClick={() => onNavigate?.()}
            className={({ isActive }) => (isActive ? "active" : "")}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              "&.active": { bgcolor: "action.selected" },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default function DashboardLayout() {
  const isDesktop = useMediaQuery("(min-width:900px)");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { user, logout } = React.useContext(AuthContext);

  const toggleMobileDrawer = () => setMobileOpen((v) => !v);
  const closeMobileDrawer = () => setMobileOpen(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />

      {/* Top App Bar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          color: "text.primary",
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          {!isDesktop && (
            <IconButton edge="start" onClick={toggleMobileDrawer}>
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>

          {/* Optional: show logged in user */}
          {user?.email && (
            <Typography variant="body2" sx={{ mr: 1 }} color="text.secondary" noWrap>
              {user.email}
            </Typography>
          )}

          {/* Home link */}
          <Button
            component={Link}
            to="/"
            startIcon={<HomeIcon />}
            variant="outlined"
            size="small"
          >
            Home
          </Button>

          {/* Logout */}
          <Button
            onClick={logout}
            variant="contained"
            size="small"
            sx={{ ml: 1 }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar - Desktop */}
      {isDesktop && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: "1px solid",
              borderColor: "divider",
            },
          }}
        >
          <SidebarContent />
        </Drawer>
      )}

      {/* Sidebar - Mobile */}
      {!isDesktop && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={toggleMobileDrawer}
          ModalProps={{ keepMounted: true }}
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <SidebarContent onNavigate={closeMobileDrawer} />
        </Drawer>
      )}

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          bgcolor: "background.default",
        }}
      >
        <Toolbar />
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
