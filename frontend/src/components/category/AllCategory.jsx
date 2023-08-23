import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryAction } from "../../redux/slices/category/categorySlices";

const AllCategory = () => {
  const dispatch = useDispatch();
  const { loading, appErr, serverErr, categoryList } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(fetchCategoryAction());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : appErr ? (
        <p>Error: {appErr}</p>
      ) : serverErr ? (
        <p>Error: {serverErr}</p>
      ) : categoryList.length > 0 ? (
        categoryList.map((category) => (
          <div key={category.title}>
            <h3>{category.title}</h3>
          </div>
        ))
      ) : (
        <p>No categories available.</p>
      )}
    </div>
  );
};

export default AllCategory;
