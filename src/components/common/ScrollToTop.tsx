import { useEffect, useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";

const ScrollToTop = () => {
  const [show, setShow] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  function handleScroll() {
    const scrollTotal =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollCurrent = window.scrollY;
    const progress = (scrollCurrent / scrollTotal) * 100;
    setScrollProgress(progress);
    if (window.scrollY >= 150) {
      setShow(true);
    } else {
      setShow(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`${
        show ? "opacity-100" : "opacity-0"
      } fixed bottom-4 right-2 rounded-full l-8 w-12 h-12 bg-blue-400 text-white flex items-center justify-center disabled:bg-gray-600 transition-opacity z-20`}
      style={{
        background: `conic-gradient(#4b5563 ${scrollProgress}%, #111827 ${scrollProgress}%)`,
      }}
    >
      <MdKeyboardArrowUp size={28} />
    </button>
  );
};

export default ScrollToTop;
