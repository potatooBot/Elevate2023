import React, { useState } from "react";
import avatar from "../assets/profile.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../helper/validate";
import convertToBase64 from "../helper/convert";
import useFetch from "../hooks/fetch.hook";
import { updateUser } from "../helper/helper";
import { useNavigate } from "react-router-dom";
import { Nav, Container } from "react-bootstrap";

import styles from "../styles/Username.module.css";
import extend from "../styles/Profile.module.css";
import Navbar from "./Navbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCoffee } from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: apiData?.username || "Profile",
      firstName: apiData?.firstName || "",
      lastName: apiData?.lastName || "",
      email: apiData?.email || "",
      mobile: apiData?.mobile || "",
      institute: apiData?.institute || "",
      points: apiData?.points || "",
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, {
        profile: file || apiData?.profile || "",
      });
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: "Updating...",
        success: <b>Update Successfully...!</b>,
        error: <b>Could not Update!</b>,
      });
    },
  });

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  // logout handler function
  function userLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <Nav.Link className="fixed-btn fixed" href="#events">
          <div style={{ margin: 0, padding: 0 }}>
            Events <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </Nav.Link>

        <div className="flex justify-center">
          {/* <div className={`${styles.glass} ${extend.glass}`} style={{ width: "45%", paddingTop: '3em'}}> */}
          <div className="profile form-bx mt-5">
            <div className="title flex flex-col items-center">
              <h4 className="text-5xl font-bold">{apiData?.username}</h4>

              {/* <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                You can update the details.
            </span> */}
            </div>

            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="avatarupdate">
                <div className="profile flex justify-center pt-4">
                  <label htmlFor="profile">
                    <img
                      src={apiData?.profile || file || avatar}
                      className={`${styles.profile_img} ${extend.profile_img}`}
                      alt="avatar"
                    />
                  </label>

                  <input
                    onChange={onUpload}
                    type="file"
                    id="profile"
                    name="profile"
                  />
                </div>
                <div className="note">*File Size Limit: 64KB</div>
                <div className={extend.updateBtn} type="submit">
                  Update Avatar
                </div>

              </div>

              <div className="textbox flex flex-col items-center gap-2">
                <div className="name flex gap-10">
                  {/* <input {...formik.getFieldProps('firstName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='FirstName' /> */}
                  <h2 className="h4 mt-2">Hey {apiData?.firstName} !</h2>
                  {/* <input {...formik.getFieldProps('lastName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='LastName' /> */}
                </div>
                <h2 className="h4 pl-2 pr-2">It's good to see you here!!</h2>

                {/* <input {...formik.getFieldProps('mobile')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Mobile No.' /> */}
                <h2 className="h6 mt-2">Mobile No.: +91 {apiData?.mobile}</h2>
                {/* <input {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Email*' /> */}
                <h2 className="h6">Email id: {apiData?.email}</h2>

                {/* <input {...formik.getFieldProps('address')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Address' /> */}
                <h2 className="h1 mt-3">Points: {apiData?.points}</h2>
              </div>

              <div className="text-center py-4">
                <span className="text-gray-500">
                  come back later?{" "}
                  <button
                    onClick={userLogout}
                    className={`btn btn-lg btn-primary btn-login fw-bold mt-3 ${extend.LogoutBtn}`}
                    to="/"
                  >
                    Logout
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
        <h1 id="events" className="h1 text-center mt-5 mb-4">EVENTS</h1>
        <div className="row ">
          <div className="col-lg-4 col-md-6">
            <div
              className={`card ${extend.eventCard} mt-4 mb-5`}
              onClick={() => {
                window.location.href = "/";
              }}
            >
              <img
                className="card-img-top"
                src="https://ai.iti.gov.eg/wp-content/uploads/2020/05/event.jpg"
                alt="CardImage"
              />
              <div className="card-body">
                <div className="card-text CardText text-center">
                  <h1 className="h2 text-center mt-3">EventName</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div
              className={`card ${extend.eventCard} mt-4 mb-5`}
              onClick={() => {
                window.location.href = "/";
              }}
            >
              <img
                className="card-img-top"
                src="https://ai.iti.gov.eg/wp-content/uploads/2020/05/event.jpg"
                alt="CardImage"
              />
              <div className="card-body">
                <div className="card-text CardText text-center">
                  <h1 className="h2 text-center mt-3">EventName</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div
              className={`card ${extend.eventCard} mt-4 mb-5`}
              onClick={() => {
                window.location.href = "/";
              }}
            >
              <img
                className="card-img-top"
                src="https://ai.iti.gov.eg/wp-content/uploads/2020/05/event.jpg"
                alt="CardImage"
              />
              <div className="card-body">
                <div className="card-text CardText text-center">
                  <h1 className="h2 text-center mt-3">EventName</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
