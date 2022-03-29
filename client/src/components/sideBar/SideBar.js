import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/lab";
import { Divider, Drawer } from "@mui/material";
import React from "react";
export const SideBar = ({ toggleDrawer, sideBarOpen, data }) => {
  // nested tree by
  // https://stackoverflow.com/a/57714683/11661319
  const getTreeItemsFromData = (treeItems) => {
    return treeItems.map((treeItemData) => {
      let children = undefined;
      if (treeItemData.children && treeItemData.children.length > 0) {
        children = getTreeItemsFromData(treeItemData.children);
      }
      return (
        <>
          {" "}
          <TreeItem
            key={treeItemData.name}
            nodeId={treeItemData.name}
            // label={treeItemData.name}
            children={children}
          />{" "}
          {treeItemData.name}
        </>
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
