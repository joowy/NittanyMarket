import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/lab";
import { Box, Divider, Drawer, Typography } from "@mui/material";
import React from "react";
export const SideBar = ({ toggleDrawer, sideBarOpen, data }) => {
  const getTreeItemsFromData = (treeItems) => {
    return treeItems.map((treeItemData) => {
      let children = undefined;
      if (treeItemData.children && treeItemData.children.length > 0) {
        children = getTreeItemsFromData(treeItemData.children);
      }
      return (
        <Box>
          {/* <Typography>{treeItemData.name}</Typography> */}
          <TreeItem
            key={treeItemData.name}
            nodeId={treeItemData.name}
            label={treeItemData.name}
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

  return (
    <Drawer
      anchor={"left"}
      open={sideBarOpen}
      variant="temporary"
      onBackdropClick={toggleDrawer("left", false)}
    >
      <Box sx={{ margin: 1 }}>
        Product Categories
        <Divider />
        <DataTreeView treeItems={data} />
      </Box>
    </Drawer>
  );
};
