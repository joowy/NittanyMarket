import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/lab";
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { SideBarItem } from "./SideBarItem";
export const SideBar = ({ toggleDrawer, sideBarOpen, data }) => {
  const [open, setOpen] = React.useState(true);

  const getTreeItemsFromData = (treeItems) => {
    return treeItems.map((treeItemData) => {
      let children = undefined;
      if (treeItemData.children && treeItemData.children.length > 0) {
        children = getTreeItemsFromData(treeItemData.children);
      }
      return (
        <Box>
          <Typography>{treeItemData.name}</Typography>
          <TreeItem
            key={treeItemData.name}
            nodeId={treeItemData.name}
            // label={treeItemData.name}
            children={children}
          />
        </Box>
      );
    });
  };
  const DataTreeView = ({ treeItems }) => {
    return (
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ width: 300 }}
      >
        {getTreeItemsFromData(treeItems)}
      </TreeView>
    );
  };

  //   const dataTree = data?.map((item) => {
  //      if(item.children){
  //          return (

  //          )
  //      }
  //     return <a> item </a>;
  //   });

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
      {/* <Stack>
        <SideBarItem />
        <SideBarItem />
      </Stack> */}
    </Drawer>
  );
};
