import React from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

const Home = () => {
  // const navigate = useNavigate();

  // const handleClickSignUp = (e) => {
  //   e.preventDefault();
  //   navigate("/register");
  // };

  // const handleClickLogin = (e) => {
  //   e.preventDefault();
  //   navigate("/login");
  // };

  const userRole = useSelector((state) => state.users.userAuth);
  const handleClick = (e) => console.log(userRole);


  return (
    <div className="mt-12 p-2">
      {/* <button
        className="mr-4"
        onClick={(e) => {
          handleClickSignUp(e);
        }}
      >
        Register
      </button>

      <button
        onClick={(e) => {
          handleClickLogin(e);
        }}
      >
        Login
      </button> */}
      <div className="text-white text-lg bg-blue-900 p-4 rounded-lg">
        <p>
          If you can think, you can do it creatively, it becomes better when you
          write it down and here is an avenue to do that.
        </p>

        <p>
          Writeit provides you with a platform to pen down your ideas.
        </p>

        <p>Join us today and start penning down your ideas.</p>
      </div>
      <section className="featured flex flex-col items-center">
        <div className="post-header">
          <h2 className="text-3xl underline decoration-blue-400 underline-offset-8">Recent posts</h2>
        </div>
<button onClick={handleClick}> click me</button>
      </section>
    </div>
  );
};

export default Home;
