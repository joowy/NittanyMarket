import { StarBorder } from "@mui/icons-material";
import CategoryIcon from "@mui/icons-material/Category";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/lab";
import {
  Collapse,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCategoryHierarchy } from "slices/productCategoriesSlice";
export const SideBar = ({ toggleDrawer, sideBarOpen, data }) => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const list = (anchor) => (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );

  const getTreeItemsFromData = (treeItems) => {
    return treeItems.map((treeItemData) => {
      let children = undefined;
      if (treeItemData.children && treeItemData.children.length > 0) {
        children = getTreeItemsFromData(treeItemData.children);
      }
      return (
        <TreeItem
          key={treeItemData.name}
          nodeId={treeItemData.name}
          label={treeItemData.name}
          children={children}
        />
      );
    });
  };
  const DataTreeView = ({ treeItems }) => {
    return (
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {getTreeItemsFromData(treeItems)}
      </TreeView>
    );
  };
  return (
    <Drawer
      anchor={"left"}
      open={sideBarOpen}
      variant="temporary"
      onBackdropClick={toggleDrawer("left", false)}
    >
      Product Categories
      <Divider />
      <DataTreeView treeItems={data} />
    </Drawer>
  );
};
