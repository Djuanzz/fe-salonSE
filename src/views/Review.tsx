import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlus } from "@fortawesome/free-solid-svg-icons";

type ReviewType = {
  id: number;
  comment: string;
  star: number;
  user: {
    id: number;
    fullname: string;
  };
};

const Review: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewType[]>([]); // Specify ReviewType[] as the type
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0); // State to store the number of stars chosen

  const fetchReviews = async () => {
    try {
      const req = await fetch("http://localhost:5000/api/review", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await req.json();
      if (res.error) {
        throw new Error(res.error);
      }
      console.log("Res:", res);
      setReviews(res.data); // Update to res.data assuming reviews are in res.data
    } catch (err) {
      console.error("Error getting reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleStarClick = (starCount: number) => {
    setStars(starCount);
  };

  const handleSubmitReview = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ comment, star: stars }),
      });

      const data = await response.json();
      console.log("Review submitted:", data);

      fetchReviews();

      // Close the modal after submission
      const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
      if (modal) {
        modal.close();
      }

      // Reset form fields
      setComment("");
      setStars(0);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-8">Reviews</h1>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {reviews.map((review) => (
          <div key={review.id} className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{review.comment}</h2>
              <div className="flex items-center mb-2">
                {Array.from({ length: review.star }, (_, index) => (
                  <FontAwesomeIcon
                    key={index}
                    icon={faStar}
                    className="text-yellow-500"
                  />
                ))}
              </div>
              <div className="card-actions justify-end">
                <div className="badge">{review.user.fullname}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD REVIEW */}
      <button
        className={"btn btn-circle fixed text-xl "}
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
              handleSubmitReview();
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
            <h3 className="font-bold text-lg mb-3">Drop review here</h3>
            <input
              type="text"
              placeholder="comment"
              className="input input-bordered w-full max-w-md mb-3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon
                  key={star}
                  icon={faStar}
                  className={`text-xl cursor-pointer ${
                    star <= stars ? "text-yellow-500" : "text-gray-300"
                  }`}
                  onClick={() => handleStarClick(star)}
                />
              ))}
            </div>
            <div className="flex items-center justify-center">
              <button type="submit" className="btn ">
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Review;
