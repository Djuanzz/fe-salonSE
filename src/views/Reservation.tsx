import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Reservation: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    branch: "",
    service: "",
  });
  const [branches, setBranches] = useState([]);
  const [services, setServices] = useState([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Fetch services when a branch is selected
    if (e.target.name === "branch") {
      fetchServices(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const reservationData = {
        customer_name: formData.fullname,
        customer_phone: formData.phone,
        branch_id: formData.branch,
        service_id: services.find(
          (service) => service.service.name === formData.service
        )?.service.id,
      };

      const req = await fetch("http://localhost:5000/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(reservationData),
      });

      // navigate("/signin");
      // console.log(reservationData);
      if (!req.ok) throw new Error("Error during reservation");
      alert("Reservation created successfully");
      navigate("/");
    } catch (error) {
      alert("you need to login first");
      console.error("Error during reservation:", error);
    }
  };

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

  const fetchServices = async (branchId: string) => {
    try {
      const req = await fetch(
        `http://localhost:5000/api/branchSpec/${branchId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const res = await req.json();
      if (res.error) throw new Error(res.error);
      setServices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Reservation</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullname" className="block text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="branch" className="block text-gray-700">
              Select Branch
            </label>
            <select
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required>
              <option value="" disabled>
                Select a branch
              </option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="service" className="block text-gray-700">
              Select Service
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required>
              <option value="" disabled>
                Select a service
              </option>
              {services.map((service, index) => (
                <option key={service.service.id} value={service.service.name}>
                  {service.service.name} - ${service.service.price}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Create
          </button>
          <div
            onClick={() => navigate("/")}
            className="flex justify-center text-blue-700 underline cursor-pointer mt-4">
            Back to home
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reservation;
