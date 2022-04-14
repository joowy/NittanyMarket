import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/lab";
import { Box, Button, Divider, Drawer, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const SideBar = ({
  toggleDrawer,
  sideBarOpen,
  data,
  setSideBarOpen,
}) => {
  let navigate = useNavigate();

  const handleClickCategory = (category) => {
    setSideBarOpen(false);
    navigate(`/product/category/${category}`);
  };
  const getTreeItemsFromData = (treeItems) => {
    return treeItems.map((treeItemData) => {
      let children = undefined;
      if (treeItemData.children && treeItemData.children.length > 0) {
        children = getTreeItemsFromData(treeItemData.children);
      }
      return (
        <Box key={treeItemData.name}>
          <Button
            fullWidth
            sx={{ justifyContent: "flex-start" }}
            onClick={() => {
              handleClickCategory(treeItemData.name);
            }}
          >
            <Typography>{treeItemData.name}</Typography>
          </Button>
          <TreeItem nodeId={treeItemData.name} children={children} />
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
      <Typography variant="h5">Product Categories</Typography>
      <Divider />
      <DataTreeView treeItems={data} />
    </Drawer>
  );
};
