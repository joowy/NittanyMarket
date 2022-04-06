import { ProductCard } from "components/product/ProductCard";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetCategoryProducts } from "slices/productSlice";

export const ProductsPage = () => {
  let { category } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetCategoryProducts(category));
  }, [category]);

  const { data } = useSelector((state) => state.product);

  if (data && data.length > 0) {
    return data.map((listing) => {
      return (
        <ProductCard
          key={listing.listing_id}
          title={listing.title}
          product_active_end={listing.product_active_end}
          product_name={listing.product_name}
          seller_email={listing.seller_email}
          product_active_start={listing.product_active_start}
          product_description={listing.product_description}
          listing_id={listing.listing_id}
          category_relationship={listing.category_relationship}
          quantity={listing.quantity}
          category={listing.category}
          price={listing.price}
        />
      );
    });
  } else if (data && data.length === 0) {
    return <div> No items found </div>;
  } else {
    return <div> loading {category}</div>;
  }
};
