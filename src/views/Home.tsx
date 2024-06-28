import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import aFront from "../assets/KM_AFront.jpg";
import bLeft from "../assets/KE_AFront.jpg";
import panda from "../assets/panda1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

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
  {
    id: 10,
    title: "Best salon in town",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut consectetur sapien.",
    author: "William Taylor",
  },
  {
    id: 11,
    title: "Great experience!",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut consectetur sapien.",
  },
  {
    id: 12,
    title: "Excellent service",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut consectetur sapien.",
  },
];

const Home: React.FC = () => {
  const [startIndex, setStartIndex] = React.useState(0);
  const reviewsPerPage = 3;

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

  const displayedReviews = reviewsData.slice(
    startIndex,
    startIndex + reviewsPerPage
  );

  const currentUser = async () => {
    try {
      const req = await fetch("http://localhost:5000/api/user/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const res = await req.json();
      if (res.error) {
        throw new Error(res.error);
      }
      console.log("Current user:", res);
    } catch (err) {
      console.error("Error getting current user:", err);
    }
  };

  useEffect(() => {
    currentUser();
  }, []);

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

      {/* --- BRANCHS */}
      <section className="container mx-auto py-16">
        <h2 className="text-2xl text-center">Our Branch</h2>
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"></div> */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {/* Branch content here */}
          <div className="card card-compact bg-base-100 w-96 shadow-xl">
            <figure>
              <img src={aFront} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>

          <div className="card card-compact bg-base-100 w-96 shadow-xl">
            <figure>
              <img src={aFront} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>

          <div className="card card-compact bg-base-100 w-96 shadow-xl">
            <figure>
              <img src={aFront} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              {/* <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div> */}
            </div>
          </div>
        </div>
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
      <footer className="footer bg-neutral text-neutral-content p-10">
        <aside>
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-current">
            <path d="M4 3h-2v-2h2v2zm2 0h4v-2h-4v2zm10-2v2h-8v-2h8zm2 0h2v2h-2v-2zm4 4v19h-24v-19h24zm-22 2h2v-2h-2v2zm20-2h-2v2h2v-2zm-20 4v13h20v-13h-20z"></path>
          </svg>
          <p>
            KMSalon
            <br />
            Providing reliable hair cut service since 2023
          </p>
        </aside>
        <div>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
      </footer>
    </>
  );
};

export default Home;
