"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
axios.defaults.baseURL = "https://655ef5e2879575426b443c29.mockapi.io";

function User({ params }) {
  const [userData, setUserData] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [modifiedDate, setModifiedDate] = useState("");

  async function getUserById() {
    let { data } = await axios.get(`/api/users/${params.userId}`);
    setUserData(data);
    console.log(data);
    setCreatedDate(showLocalTimeFunc(data.createdAt));
    setModifiedDate(showLocalTimeFunc(data.modifiedAt));
  }
  const showLocalTimeFunc = (date) => {
    let time = new Date(date);
    let day = String(time.getDate()).padStart(2, "0");
    let month = String(time.getMonth() + 1).padStart(2, "0");
    let year = String(time.getFullYear()).padStart(2, "0");
    const showTime = `${day}.${month}.${year}`;
    return showTime;
  };

  useEffect(() => {
    getUserById();
  }, []);
  return (
    <div className="h-screen bg-white text-center py-10 text-black">
      <Link
        href="/"
        className=" my-5 text-xl text-white mx-auto  bg-blue-500 p-2 px-3"
      >
        Go Back
      </Link>
      <div className="w-[800px] my-10 mx-auto py-5 border-[3px] flex flex-col items-center">
        <img
          src="data:image/png;base64,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"
          alt="User image"
          className="w-[150px] h-[130px]"
        />
        <h1 className="text-2xl">{userData.name}</h1>
        <div>
          <p className="text-xl">
            <span className="text-[16px] font-semibold">username: </span>
            {userData.username}
          </p>
          <p className="text-xl">
            <span className="text-[16px] font-semibold">email: </span>
            {userData.email}
          </p>
          <p className="text-xl">
            <span className="text-[16px] font-semibold">address: </span>
            {userData.address}
          </p>
          <p className="text-xl">
            <span className="text-[16px] font-semibold">contact: </span>
            {userData.contact}
          </p>
          <p className="text-xl">
            <span className="text-[16px] font-semibold">createdAt: </span>
            {createdDate}
          </p>
          <p className="text-xl">
            <span className="text-[16px] font-semibold">modifiedAt: </span>
            {modifiedDate}
          </p>
          <p className="text-xl">
            <span className="text-[16px] font-semibold">role: </span>
            {userData.roleName}
          </p>
        </div>
      </div>
    </div>
  );
}

export default User;
