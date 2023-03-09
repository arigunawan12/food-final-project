import React from "react";
import { Formik, Form, useField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AddFood = ({ onSuccess }) => {
  const onSubmit = (values, { resetForm }) => {
    axios({
      method: "post",
      url: "https://api-bootcamp.do.dibimbing.id/api/v1/create-food",
      data: {
        name: values.name,
        description: values.description,
        imageUrl: values.imageUrl,
        ingredients: values.ingredients,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: process.env.REACT_APP_APIKEY,
      },
    })
      .then((response) => {
        alert(`${response.data.message}`);
        resetForm({ values: "" });
        onSuccess();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="mb-3">
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input form-control" {...field} {...props} />
        {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
      </div>
    );
  };

  return (
    <section>
      <Formik
        initialValues={{
          name: "",
          description: "",
          imageUrl: "",
          ingredients: [""],
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          description: Yup.string().required("Required"),
          imageUrl: Yup.string().required("Required"),
        })}
        onSubmit={onSubmit}
      >
        <div className="container-md my-3">
          <div className="text-center">
            <h2>Add Food</h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-12">
              <Form>
                <MyTextInput label="Food Name" name="name" type="text" placeholder="Food name" />

                <MyTextInput label="Food Description" name="description" type="text" placeholder="Food Description" />

                <MyTextInput label="Food Image URL" name="imageUrl" type="url" placeholder="Food Image URL" />

                <div className="mb-3">
                  <label>Food Ingredients</label>
                  <FieldArray name="ingredients">
                    {(fieldArrayProps) => {
                      const { push, remove, form } = fieldArrayProps;
                      const { values } = form;
                      const { ingredients } = values;
                      return (
                        <div>
                          {ingredients.map((ingredient, index) => (
                            <div key={index} className="d-flex input-group mb-1">
                              <Field name={`ingredients[${index}]`} placeholder="Food Ingredients" className="form-control" />
                              {index > 0 && (
                                <button type="button" className="btn  btn-outline-warning " onClick={() => remove(index)}>
                                  -
                                </button>
                              )}
                              <button type="button" className="btn btn-outline-warning " onClick={() => push("")}>
                                +
                              </button>
                            </div>
                          ))}
                        </div>
                      );
                    }}
                  </FieldArray>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn bgcolor1 text-light btn-warning shadow">
                    Submit
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Formik>
    </section>
  );
};

export default AddFood;
