import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetCategoryProducts } from "slices/productSlice";

export const ProductsPage = () => {
  let { category } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(category);
    dispatch(GetCategoryProducts(category));
  }, [category]);
  const { data } = useSelector((state) => state.product);
  console.log(data);
  return <div>ProductsPage {`${category}`}</div>;
};
