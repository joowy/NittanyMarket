import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProfileData } from "slices/userProfile";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userData, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(GetProfileData(userData.user.email))
      .unwrap()

      .catch((e) => {
        alert(e);
      });
  }, [dispatch, userData.user.email]);

  const { loading, error, userProfileData } = useSelector(
    (state) => state.profileData
  );

  console.log(loading, error, userData);
  return <div>ProfilePage</div>;
};
