import React from "react";
import { useParams } from "react-router-dom";

export const ProductPage = () => {
  let params = useParams();
  console.log(params);

  return <div>ProductPage</div>;
};
