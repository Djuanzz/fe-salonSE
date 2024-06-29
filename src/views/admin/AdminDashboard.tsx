import React, { useEffect, useState } from "react";
import aFront from "../../assets/KM_AFront.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const [branches, setBranches] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const navigate = useNavigate();

  const fetchBranches = async () => {
    try {
      const req = await fetch("http://localhost:5000/api/branch", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await req.json();
      if (res.error) throw new Error(res.error);
      setBranches(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitBranch = async () => {
    try {
      const req = await fetch("http://localhost:5000/api/branch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          address,
          open_time: openTime,
          close_time: closeTime,
        }),
      });

      const res = await req.json();
      if (res.error) throw new Error(res.error);
      setBranches((prevBranches) => [...prevBranches, res.data]);
      setName("");
      setAddress("");
      setOpenTime("");
      setCloseTime("");
    } catch (err) {
      console.error(err);
    }
  };

  const logoutAdmin = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    console.log(branches);
  }, [branches]);

  return (
    <div className="bg-base-200">
      <div
        className={
          "navbar bg-base-100  text-2xl font-bold p-4 text-center flex justify-center sticky top-0 w-full z-50"
        }>
        <div className="">ADMIN DASHBOARD</div>
        <button
          className={"badge badge-error fixed right-7 p-4 text-white"}
          onClick={logoutAdmin}>
          Logout
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {branches.map((branch, index) => (
          <div key={index} className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img src={aFront} alt="Branch" />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title">{branch.name}</h2>
              <p>{branch.address}</p>
              <p>
                Open: {branch.open_time} - Close: {branch.close_time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        className={"btn btn-circle fixed text-xl bg-base-100 "}
        onClick={() => document.getElementById("my_modal_3").showModal()}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000, // Ensure it's above other content
        }}>
        <FontAwesomeIcon icon={faPlus} />
      </button>

      <dialog
        id="my_modal_3"
        className="modal"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000, // Ensure it's above other content
        }}>
        <div className="modal-box">
          <form
            method="dialog"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitBranch();
              const modal = document.getElementById(
                "my_modal_3"
              ) as HTMLDialogElement;
              modal.close();
            }}>
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                const modal = document.getElementById(
                  "my_modal_3"
                ) as HTMLDialogElement;
                modal.close();
              }}>
              ✕
            </button>
            <h3 className="font-bold text-lg mb-3">Add New Branch</h3>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full max-w-md mb-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Address"
              className="input input-bordered w-full max-w-md mb-3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <input
              type="time"
              placeholder="Open Time"
              className="input input-bordered w-full max-w-md mb-3"
              value={openTime}
              onChange={(e) => setOpenTime(e.target.value)}
              required
            />
            <input
              type="time"
              placeholder="Close Time"
              className="input input-bordered w-full max-w-md mb-3"
              value={closeTime}
              onChange={(e) => setCloseTime(e.target.value)}
              required
            />
            <div className="flex items-center justify-center">
              <button type="submit" className="btn ">
                Create Branch
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AdminDashboard;
