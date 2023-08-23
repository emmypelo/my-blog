import React from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {createCategoryAction} from '../../redux/slices/category/categorySlices'
import { useFormik } from "formik";

const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
});

const CreateCategory = () => {
  const dispatch = useDispatch();

  const {  appErr, serverErr,  } = useSelector(
    (state) => state.category
  );

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      dispatch(createCategoryAction(values));
    },
  });

  return (

<div className="category flex flex-col w-1/2 text-center mx-auto mt-12 items-center">
      <h1 className="text-2xl underline underline-offset-4 decoration-cyan-700">
        Add New Category
      </h1>
      <p>These are categories users will select when creating a post</p>

      {serverErr || appErr ? (
        <div>
          <p>{serverErr} {appErr}</p>
        </div>
      ): null}
      <form
        className="category-form flex flex-col"
        onSubmit={formik.handleSubmit}
      >
        <input
          type="text"
          placeholder="New Category"
          className="w-50% rounded p-1 text-blue-900 bg-£border-blue-500 outline-none bg-white"
          {...formik.getFieldProps("title")}
        />
        <input
          type="submit"
          value="Add"
          className="bg-blue-400 w-1/2 mt-2 mx-auto rounded-lg border-cyan-800 border-2 border-solid hover:bg-white hover:text-blue-400 cursor-pointer"
        />
        {formik.touched.title && formik.errors.title && (
          <h2 className="text-red-400 mb-2">{formik.errors.title}</h2>
        )}
      </form>
    </div>

    
   
  );
};

export default CreateCategory;
