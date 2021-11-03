import "./styles.css";

export const Search = ({ searchValue, handleChange }) => {
  return (
    <input
      className="text-input"
      type="search"
      placeholder="Type your search"
      onChange={handleChange}
      value={searchValue}
    />
  );
};
