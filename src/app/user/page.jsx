"use client";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { get, useForm } from "react-hook-form";
axios.defaults.baseURL = "https://655ef5e2879575426b443c29.mockapi.io";
import ClipboardJS from "clipboard";

export default function Home({ text }) {
  const [hasUSers, setHasUsers] = useState(false);
  const [usersData, setUSersData] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [erorrMsg, setErrorMsg] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [isDetele, setIsDelete] = useState(false);
  const formSearch = useRef(null);
  const copyButtonRef = useRef(null);

  const handleCopy = () => {
    const clipboard = new ClipboardJS(copyButtonRef.current, {
      text: () => text,
    });

    clipboard.on("success", () => {
      console.log("Text copied to clipboard");
      clipboard.destroy();
    });

    clipboard.on("error", (e) => {
      console.error("Error copying text to clipboard:", e);
      clipboard.destroy();
    });

    clipboard.onClick({ trigger: copyButtonRef.current });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const deleteUserFunc = async (id) => {
    setIsDelete(true);
    try {
      let { data } = await axios.delete(`/api/users/${id}`);
    } catch (error) {
      console.log(error);
    }
    getUSers();
  };

  const updateUserFunc = (id) => {
    localStorage.setItem("id", id);
    window.location.pathname = "/editUser";
  };

  const formSubmitFunc = async (e) => {
    e.preventDefault();
    const item = e.target;
    const name = item[0].value;
    const username = item[1].value;
    const email = item[2].value;
    const contact = item[3].value;
    const address = item[4].value;
    const createdAt = new Date();
    const user = {
      name,
      username,
      email,
      contact,
      address,
      createdAt,
    };
    try {
      let { data } = await axios.post("/api/users", user);
      console.log(data);
      setShowCreateForm(false);
      getUSers();
    } catch (error) {
      setErrorMsg(error?.response?.data);
    }
  };

  const onSearch = async (data) => {
    let { data: users } = await axios.get(`/api/users/?q=${data.search}`);
    setUSersData(users);
    const form = formSearch.current;
    form[0].value = "";
  };

  setTimeout(() => {
    setErrorMsg("");
  }, 3_000);

  async function getUSers() {
    try {
      let { data } = await axios.get("/api/users");
      console.log(data);
      setUSersData(data);
      setHasUsers(true);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUSers();
  }, []);
  return (
    <div className="dark:bg-white min-h-screen">
      <div className="header bg-slate-950 fixed w-full flex flex-wrap justify-center md:px-16 md:justify-between items-center py-4 text-white border-b-[3px] border-[#1996AA]">
        <a href="/" className="flex items-center hover:text-[#17A2B8]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-code-slash"
            viewBox="0 0 16 16"
          >
            <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z" />
          </svg>
          <h1 className="text-3xl">DevConnector</h1>
        </a>
        <ul className="flex mt-5 md:mt-0 items-center">
          <li className="mx-1 md:mx-3 md:text-xl">
            <a href="" className="hover:text-[#17A2B8]">
              Developers
            </a>
          </li>
          <li className="mx-1 md:mx-3 md:text-xl">
            <button
              onClick={() => setShowCreateForm(true)}
              className="hover:text-[#17A2B8]"
            >
              Create user
            </button>
          </li>
        </ul>
      </div>

      <div className="pt-[120px] dark:text-black">
        <form
          ref={formSearch}
          className="flex w-[800px] mb-10 mx-auto "
          onSubmit={handleSubmit(onSearch)}
        >
          <input
            type="text"
            placeholder="Search"
            {...register("search")}
            className="w-full border p-2 text-xl Search"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white text-xl p-2 px-3 ml-3"
          >
            Search
          </button>
        </form>
        <table className="text-center mx-auto w-[800px]">
          <thead>
            <tr>
              <th className="px-2 text-2xl">Name</th>
              <th className="px-2 text-2xl">Username</th>
              <th className="px-2 text-2xl">Email</th>
              <th className="px-2 text-2xl">Contact</th>
              <th className="px-2 text-2xl">Address</th>
              <th className="px-2 text-2xl">Update</th>
              <th className="px-2 text-2xl">N/</th>
              <th className="px-2 text-2xl">User</th>
            </tr>
          </thead>
          <tbody className="mt-4">
            {usersData.map((user, index) => {
              return (
                <tr key={index} className="my-4">
                  <td className="mx-3 text-xl p-3">{user?.name}</td>
                  <td className="mx-3 text-xl p-3">{user?.username}</td>
                  <td className="mx-3 text-xl p-3">
                    <button ref={copyButtonRef} onClick={handleCopy}>
                      {user?.email}
                    </button>
                  </td>
                  <td className="mx-3 text-xl p-3">{user?.contact}</td>
                  <td className="mx-3 text-xl p-3">{user?.address}</td>
                  <td className="text-xl p-3 mx-3">
                    <button onClick={() => updateUserFunc(user.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                        />
                      </svg>
                    </button>
                  </td>
                  <td>
                    <button
                      className="bg-rose-500 text-white mx-3 p-2"
                      onClick={() => deleteUserFunc(user?.id)}
                    >
                      delete
                    </button>
                  </td>
                  <td>
                    <Link href={`/user/${user.id}`}>Show</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showCreateForm ? (
        <div className="absolute top-0 bottom-0 right-0 left-0 flex-col justify-center text-white bg-gray-700 flex items-center">
          <h1 className="text-white text-3xl">Create User</h1>
          <form
            onSubmit={(e) => formSubmitFunc(e)}
            className="dark:text-white w-[500px] mx-auto flex flex-col"
          >
            <label htmlFor="name" className="mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              id="name"
              className="dark:text-black border p-2 mb-3 text-xl"
            />
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username"
              className=" dark:text-black  border p-2 mb-3 text-xl"
            />
            <label htmlFor="email" className="mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Enter email"
              className=" dark:text-black  border p-2 mb-3 text-xl"
            />
            <label htmlFor="contact" className="mb-1">
              Contact
            </label>
            <input
              type="text"
              name="contact"
              id="contact"
              required
              placeholder="Enter contact"
              className=" dark:text-black border p-2 mb-3 text-xl"
            />
            <label htmlFor="address" className="mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Enter address"
              className=" dark:text-black border p-2 mb-3 text-xl"
            />
            <button className="bg-sky-500 text-xl text-white p-2">
              Submit
            </button>
            {erorrMsg ? (
              <p className="text-xl text-white absolute flex my-auto right-3 text-center font-light bg-rose-500 p-2 px-4">
                {erorrMsg}
              </p>
            ) : (
              ""
            )}
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
