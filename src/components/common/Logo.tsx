const Logo = ({ color }: { color: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 65"
      width="35"
      height="28"
      fill="none"
    >
      <g id="logo-dark" fill={color}>
        <path
          d="M45.4666258,13.0490789 L49.1680471,16.8564364 L24.4580293,41.6528067 C18.8628999,47.2601865 9.79144396,47.2601865 4.19634705,41.6528067 C-1.39878235,36.0457526 -1.39878235,26.95428 4.19634705,21.3471282 L25.4970858,0 L29.231202,3.83986308 L8.06033319,25.1869912 C4.58134167,28.7095175 4.61039664,34.3914844 8.12526813,37.8781828 C11.6401721,41.3648813 17.3098239,41.3355676 20.788848,37.8130413 L45.4666258,13.0490789 Z M40.9205303,8.75361626 L16.2429475,33.4850405 L12.3464614,29.6452751 L37.0891092,4.88118243 C42.6898286,-0.712387379 51.7501695,-0.712387379 57.3508889,4.88118243 L59.266437,6.80113026 L55.4350158,10.6735641 L53.5191427,8.75361626 C51.8544944,7.06840581 49.5863217,6.12023879 47.219999,6.12023879 C44.8536764,6.12023879 42.5855037,7.06840581 40.9205303,8.75361626 Z M73.7484225,21.3471282 C68.1477031,15.7535584 59.0876872,15.7535584 53.4866428,21.3471282 L28.776625,46.1436613 L32.6405136,50.0159974 L57.3183889,25.2521327 C60.7981605,21.7985587 66.4044049,21.7985587 69.8845014,25.2521327 C73.3519229,28.7433911 73.3519229,34.3869244 69.8845014,37.8781828 L48.7136975,59.1602346 L52.5776187,63 L73.8784224,41.6528067 C79.4242168,36.004062 79.3660419,26.9243149 73.7484225,21.3471282 Z M37.0241092,54.2466117 L61.7019846,29.5149921 L65.5984057,33.3550832 L40.8880304,58.1189479 C35.287311,63.7126479 26.2272625,63.7126479 20.6264781,58.1189479 L18.710735,56.1989023 L22.5097862,52.2939955 L24.4255618,54.2466117 C27.9166108,57.7039965 33.5332877,57.7039965 37.0241092,54.2466117 Z"
          id="Shape"
        />
      </g>
    </svg>
  );
};

export default Logo;