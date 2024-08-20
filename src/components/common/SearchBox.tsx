import "../../searchbox.css";
const SearchBox = () => {
  return (
    <div className="wrap-input-17">
      <div className="search-box">
        <button className="btn-search">🔍</button>
        <input
          type="text"
          className="input-search"
          placeholder="Type to Search..."
        />
      </div>
    </div>
  );
};

export default SearchBox;
