import {
  Box,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
export const SideBar = ({ toggleDrawer, sideBarOpen }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
    >
      All Categories
      <Divider />
      <List>
       <ListItem 
        initiallyOpen={true}  nestedItems={[
        <ListItem
          key={1}
          primaryText="Starred"
          leftIcon={<ActionGrade />}
        />,
        <ListItem
          key={2}
          primaryText="Sent Mail"
          leftIcon={<ContentSend />}
          disabled={true}
          nestedItems={[
            <ListItem key={1} primaryText="Drafts" leftIcon={<ContentDrafts />} />,
          ]}
        />,
        <ListItem
          key={3}
          primaryText="Inbox"
          leftIcon={<ContentInbox />}
          open={this.state.open}
          onNestedListToggle={this.handleNestedListToggle}
          nestedItems={[
            <ListItem key={1} primaryText="Drafts" leftIcon={<ContentDrafts />} />,
          ]}
        />,
      ]}
       / >


     
          </List>
        </Collapse>
      </List>
    </Box>
  );

  return (
    <Drawer
      anchor={"left"}
      open={sideBarOpen}
      variant="temporary"
      onBackdropClick={toggleDrawer("left", false)}
    >
      {list("left")}
    </Drawer>
  );
};
