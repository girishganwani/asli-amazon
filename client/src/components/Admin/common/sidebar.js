import React from "react";
import {
  Divider,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";

const menu = [
  {
    label: "Users",
    link: "/admin/users",
  },
  {
    label: "Categories",
    link: "/admin/categories",
  },
  {
    label: "Products",
    link: "/admin/products",
  },
];

const Sidebar = ({ drawerWidth }) => {
  return (
    <div>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {menu.map(({ label, link }) => (
            <ListItem key={label} disablePadding>
              <ListItemButton>
                <Link href={link} color="inherit">
                  <ListItemText primary={label} />
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
};

export default Sidebar;
