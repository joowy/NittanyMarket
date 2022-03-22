import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProfileData } from "slices/userProfile";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userData, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(GetProfileData(userData.user.email))
      .unwrap()
      .then((x) => {
        console.log(x);
      })
      .catch((e) => {
        alert(e);
      });
  }, [dispatch, userData.user.email]);

  const { loading, error, profileData } = useSelector((state) => state.profile);

  console.log(loading, error, profileData);
  return <div>ProfilePage</div>;
};
