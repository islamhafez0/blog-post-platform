import Logo from "../common/Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-900 px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <span className="font-normal text-white text-2xl flex items-center gap-2 cursor-pointer">
            <Logo color="#fff" />
            <span className="text-base">Code Space</span>
          </span>
          <div className="flex gap-2">
            <a
              href={`https://wa.me/+201097423297?text=${encodeURIComponent(
                "Hello From Code Space!"
              )}`}
              target="_blank"
            >
              <img
                src="/assets/social/whatsapp.svg"
                className="w-8"
                alt="whatsapp"
              />
            </a>
            <a
              href="https://twitter.com/eslamhafez72?t=_C-MXKbbmjoWB-nD0WkkkA&s=08"
              target="_blank"
            >
              <img
                src="/assets/social/twitter.svg"
                className="w-8"
                alt="twitter"
              />
            </a>
            <a
              href="https://www.facebook.com/eslam.aboesha.9?mibextid=ZbWKwL"
              target="_blank"
            >
              <img
                src="/assets/social/facebook.svg"
                className="w-8"
                alt="facebook"
              />
            </a>
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-8 text-center">
          &copy; Eslam Hafez {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
