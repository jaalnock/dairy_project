import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-center">
      <div className="p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Oops! Something went wrong.
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          The page you’re looking for doesn’t exist or has been moved. But don’t
          worry, we’ll get you back on track!
        </p>
        <p className="text-md text-gray-500 mb-8">
          You can either go back to the{" "}
          <a
            href="/"
            className="text-blue-500 hover:text-blue-600 font-semibold"
          >
            Home Page
          </a>{" "}
          or explore other parts of the site.
        </p>
        <div className="mt-6">
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-blue-500 text-white px-6 py-2 rounded-full text-lg hover:bg-blue-600 transition duration-300"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
