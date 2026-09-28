import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import List from "@mui/material/List";
import ListIcon from "@mui/icons-material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";

const drawerWidth = 240;

gsap.registerPlugin(ScrollToPlugin);

const navItems = [
  ["Expertise", "expertise"],
  ["History", "history"],
  ["Projects", "projects"],
];

function Navigation({ parentToChild, modeChange }) {
  const { mode } = parentToChild;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navigation");

      if (navbar) {
        const isScrolled = window.scrollY > navbar.clientHeight;
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (event, section) => {
    event?.preventDefault();
    const sectionElement = document.getElementById(section);

    if (sectionElement) {
      const navbarHeight = document.getElementById("navigation")?.clientHeight ?? 0;

      gsap.to(window, {
        duration: 1,
        ease: "power2.out",
        scrollTo: {
          y: sectionElement,
          offsetY: navbarHeight,
        },
      });
    } else {
      console.error(`Element with id "${section}" not found`);
    }
  };

  const drawer = (
    <Box
      className="navigation-bar-responsive"
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center" }}
    >
      <p className="mobile-menu-top">
        <ListIcon />
        Menu
      </p>

      <Divider />

      <List>
        {navItems.map((item) => (
          <ListItem key={item[0]} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={(event) => scrollToSection(event, item[1])}
            >
              <ListItemText primary={item[0]} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        component="nav"
        id="navigation"
        className={`navbar-fixed-top${scrolled ? " scrolled" : ""}`}
        sx={{
          height: "64px",
          minHeight: "64px",
          maxHeight: "64px",
        }}
      >
        <Toolbar
          className="navigation-bar"
          sx={{
            height: "64px",
            minHeight: "64px",
            maxHeight: "64px",
            padding: "0 24px",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>

          {mode === "dark" ? (
            <LightModeIcon
              onClick={() => modeChange()}
              sx={{
                fontSize: "24px",
                cursor: "pointer",
              }}
            />
          ) : (
            <DarkModeIcon
              onClick={() => modeChange()}
              sx={{
                fontSize: "24px",
                cursor: "pointer",
              }}
            />
          )}

          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              marginLeft: "auto",
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item[0]}
                onClick={(event) => scrollToSection(event, item[1])}
                sx={{
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: 1.5,
                  padding: "8px 10px",
                  minWidth: "auto",
                  textTransform: "none",
                }}
              >
                {item[0]}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default Navigation;
