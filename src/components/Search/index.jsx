import "./styles.css";

export const Search = ({
  searchValue,
  searchOrder,
  handleChange,
  handleOrder,
}) => {
  return (
    <>
      <input
        className="text-input"
        type="search"
        placeholder="Type your search"
        onChange={handleChange}
        value={searchValue}
      />
      <select
        className="text-select"
        type="search"
        onChange={handleOrder}
        defaultValue={searchOrder}
      >
        <option value="name">Name</option>
        <option value="score">Score</option>
      </select>
    </>
  );
};
