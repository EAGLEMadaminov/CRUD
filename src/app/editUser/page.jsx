"use client";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

import axios from "axios";
axios.defaults.baseURL = "https://655ef5e2879575426b443c29.mockapi.io";

function editUser() {
  const formRef = useRef(null);
  const [erorrMsg, setErrorMsg] = useState("");
  const formSubmitFunc = async (e) => {
    const id = localStorage.getItem("id");
    e.preventDefault();
    if (formRef.current) {
      const form = formRef.current;
      const name = form[0].value;
      const username = form[1].value;
      const email = form[2].value;
      const contact = form[3].value;
      const address = form[4].value;
      const modifiedAt = new Date();
      const user = {
        name,
        username,
        email,
        contact,
        address,
        modifiedAt,
      };
      console.log(user);
      try {
        let { data } = await axios.put(`/api/users/${id}`, user);
        router = "/";
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    (async function getUserById() {
      const id = localStorage.getItem("id");

      try {
        let { data } = await axios.get(`/api/users/${id}`);
        const form = formRef.current;
        if (form) {
          form[0].value = data.name;
          form[1].value = data.username;
          form[2].value = data.email;
          form[3].value = data.contact;
          form[4].value = data.address;
        }
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="flex justify-center flex-col items-center bg-white h-screen">
      <div className="flex justify-around w-[500px]">
        <h1 className="text-4xl font-bolt text-blue-400">Update User</h1>
        <Link href="/" className="bg-gray-500 p-2 px-3 text-xl">
          Go Back
        </Link>
      </div>
      <form
        ref={formRef}
        onSubmit={(e) => formSubmitFunc(e)}
        className="w-[500px] mx-auto mt-5 flex flex-col"
      >
        <label htmlFor="name" className="mb-1 dark:text-black">
          Name
        </label>
        <input
          type="text"
          placeholder="Enter your name"
          required
          id="name"
          className="dark:text-black border p-2 mb-3 text-xl"
        />
        <label htmlFor="username" className="mb-1 dark:text-black">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter username"
          className=" dark:text-black  border p-2 mb-3 text-xl"
        />
        <label htmlFor="name" className="mb-1 dark:text-black">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          placeholder="Enter email"
          className=" dark:text-black  border p-2 mb-3 text-xl"
        />
        <label htmlFor="name" className="mb-1 dark:text-black">
          Contact
        </label>
        <input
          type="text"
          id="contact"
          required
          placeholder="Enter contact"
          className=" dark:text-black border p-2 mb-3 text-xl"
        />
        <label htmlFor="name" className="mb-1 dark:text-black">
          Address
        </label>
        <input
          type="text"
          id="address"
          placeholder="Enter address"
          className=" dark:text-black border p-2 mb-3 text-xl"
        />

        <button className="bg-sky-500 text-xl text-white p-2">Submit</button>
        {erorrMsg ? (
          <p className="text-xl text-white absolute flex my-auto right-3 text-center font-light bg-rose-500 p-2 px-4">
            {erorrMsg}
          </p>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}

export default editUser;
