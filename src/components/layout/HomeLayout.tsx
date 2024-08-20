import { Link } from "react-router-dom";

const HomeLayout = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-16">
      <div className="flex text-center items-center flex-col">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-2">
          Share Your Voice with the World
        </h1>
        <p className="text-base md:text-2xl font-medium text-gray-400">
          Join our community of writers and explore a wide array of fascinating
          topics.
        </p>
        <Link
          to="/blog/add-new-post"
          className="mt-8 bg-blue-600 hover:bg-blue-500 transition-all ease-in-out duration-150 py-2 px-6 rounded-md text-white"
        >
          Add new post
        </Link>
      </div>
      <div className="flex gap-4 pt-16 justify-center">
        <img src="/assets/hero-1.jpg" className="w-40 h-40" alt="hero" />
        <img src="/assets/hero-2.jpg" className="w-40 h-40" alt="hero" />
        <img src="/assets/hero-3.jpg" className="w-40 h-40" alt="hero" />
      </div>
    </section>
  );
};

export default HomeLayout;
