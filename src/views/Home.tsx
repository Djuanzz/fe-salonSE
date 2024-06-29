import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import aFront from "../assets/KM_AFront.jpg";
import bLeft from "../assets/KE_AFront.jpg";
import panda from "../assets/panda1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);
  const [branchesStartIndex, setBranchesStartIndex] = useState(0);
  const [branches, setBranches] = useState([]);
  const reviewsPerPage = 3;
  const branchesPerPage = 3;

  const handleNextClick = () => {
    if (startIndex + reviewsPerPage < reviewsData.length) {
      setStartIndex(startIndex + reviewsPerPage);
    }
  };

  const handlePrevClick = () => {
    if (startIndex - reviewsPerPage >= 0) {
      setStartIndex(startIndex - reviewsPerPage);
    }
  };

  const handleBranchesNextClick = () => {
    if (branchesStartIndex + branchesPerPage < branches.length) {
      setBranchesStartIndex(branchesStartIndex + branchesPerPage);
    }
  };

  const handleBranchesPrevClick = () => {
    if (branchesStartIndex - branchesPerPage >= 0) {
      setBranchesStartIndex(branchesStartIndex - branchesPerPage);
    }
  };

  const displayedReviews = reviewsData.slice(
    startIndex,
    startIndex + reviewsPerPage
  );

  const displayedBranches = branches.slice(
    branchesStartIndex,
    branchesStartIndex + branchesPerPage
  );

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

  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    console.log(branches);
  }, [branches]);

  return (
    <>
      <Navbar />

      {/* --- HERO */}
      <main className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={panda} className="rounded-lg max-w-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">
              Beauty and Elegance Redefined
            </h1>
            <p className="py-6 max-w-md">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </main>

      {/* --- SERVICES */}
      <section className="container mx-auto py-16">
        <h2 className="text-2xl text-center">Our Services</h2>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <div className="card bg-base-100 image-full w-96 shadow-xl">
            <figure>
              <img src={bLeft} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 image-full w-96 shadow-xl">
            <figure>
              <img src={bLeft} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 image-full w-96 shadow-xl">
            <figure>
              <img src={bLeft} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"></div> */}
      </section>

      {/* --- REVIEWS */}
      <section className="container mx-auto py-16 relative">
        <h2 className="text-2xl text-center">Our Reviews</h2>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {displayedReviews.map((review) => (
            <div key={review.id} className="card bg-base-100 w-96 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{review.title}</h2>
                <p>{review.content}</p>
                <div className="card-actions justify-end">
                  <div className="badge">- {review.author}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handlePrevClick}
          className="badge badge-neutral p-4 font-bold rounded absolute left-0 top-1/2 transform -translate-y-1/2"
          disabled={startIndex === 0}>
          &lt;
        </button>

        <button
          onClick={handleNextClick}
          className="badge badge-neutral p-4 font-bold rounded absolute right-0 top-1/2 transform -translate-y-1/2"
          disabled={startIndex + reviewsPerPage >= reviewsData.length}>
          &gt;
        </button>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => window.location.assign("/reviews")}
            className="badge badge-outline p-3 rounded">
            View All Reviews
          </button>
        </div>
      </section>

      {/* --- BRANCHES */}
      <section className="container mx-auto py-16 relative">
        <h2 className="text-2xl text-center">Our Branches</h2>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {displayedBranches.map((branch, index) => (
            <div key={index} className="card bg-base-100 w-96 shadow-xl">
              <figure>
                <img src={aFront} alt="Shoes" />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title">{branch.name}</h2>
                <p>{branch.address}</p>
                <p>
                  Open: {branch.open_time} - Close: {branch.close_time}
                </p>
                <button
                  className="btn"
                  onClick={() => navigate("/reservation")}>
                  Reservation
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleBranchesPrevClick}
          className="badge badge-neutral p-4 font-bold rounded absolute left-0 top-1/2 transform -translate-y-1/2"
          disabled={branchesStartIndex === 0}>
          &lt;
        </button>

        <button
          onClick={handleBranchesNextClick}
          className="badge badge-neutral p-4 font-bold rounded absolute right-0 top-1/2 transform -translate-y-1/2"
          disabled={branchesStartIndex + branchesPerPage >= branches.length}>
          &gt;
        </button>
      </section>

      {/* --- CONTACTS */}
      <section className="container mx-auto py-16">
        <h2 className="text-2xl text-center mb-10">Our Contacts</h2>

        <div className="flex w-full flex-col lg:flex-row">
          <div className="card bg-base-300 rounded-box grid h-32 flex-grow place-items-center">
            <div className={"flex flex-row justify-between items-center"}>
              <p className={"mr-10"}>Thomas | 08123456789</p>
              <FontAwesomeIcon className={"text-4xl"} icon={faUser} />
            </div>
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div className="card bg-base-300 rounded-box grid h-32 flex-grow place-items-center">
            <div className={"flex flex-row justify-between items-center"}>
              <p className={"mr-10"}>Sekar | 08164829372</p>
              <FontAwesomeIcon className={"text-4xl"} icon={faUser} />
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER */}
      <Footer />
    </>
  );
};

export default Home;

const reviewsData = [
  {
    id: 1,
    title: "Great experience!",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut consectetur sapien.",
    author: "John Doe",
  },
  {
    id: 2,
    title: "Excellent service",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut consectetur sapien.",
    author: "Jane Smith",
  },
  {
    id: 3,
    title: "Highly recommended",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut consectetur sapien.",
    author: "Alice Johnson",
  },
  {
    id: 4,
    title: "Very professional",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut consectetur sapien.",
    author: "Michael Brown",
  },
  {
    id: 5,
    title: "Wonderful experience!",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut consectetur sapien.",
    author: "Emma Davis",
  },
  {
    id: 6,
    title: "Friendly staff",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut consectetur sapien.",
    author: "David Wilson",
  },
  {
    id: 7,
    title: "Impressive service",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut consectetur sapien.",
    author: "Sophia Martinez",
  },
  {
    id: 8,
    title: "Lovely salon",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut consectetur sapien.",
    author: "James Lee",
  },
  {
    id: 9,
    title: "Professional haircut",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut consectetur sapien.",
    author: "Olivia Moore",
  },
];
