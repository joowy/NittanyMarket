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
  }, [category, dispatch]);

  const { data } = useSelector((state) => state.product);

  const { userData } = useSelector((state) => state.auth);

  if (data && data.length > 0) {
    return data.map((listing) => {
      if (listing.product_active_end === null) {
        return (
          <ProductCard
            key={listing.listing_id + listing.seller_email}
            title={listing.title}
            product_name={listing.product_name}
            seller_email={listing.seller_email}
            product_active_start={listing.product_active_start}
            product_description={listing.product_description}
            listing_id={listing.listing_id}
            category_relationship={listing.category_relationship}
            quantity={listing.quantity}
            category={listing.category}
            price={listing.price}
            rating={listing.rating}
            product_active_end={undefined}
            mode={undefined}
            user_email={userData?.user?.email}
          />
        );
      }

      return null;
    });
  } else if (data && data.length === 0) {
    return <div> No items found </div>;
  } else {
    return <div> loading {category}</div>;
  }
};
