import "./styles.css";

export const Search = ({
  searchValue,
  searchOrder,
  searchCategory,
  allCategories,
  handleChange,
  handleOrder,
  handleCategory,
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

      <select
        className="text-select"
        type="search"
        onChange={handleCategory}
        defaultValue={searchCategory}
      >
        <option value="#" disabled>
          Category
        </option>
        {allCategories &&
          allCategories.map((category) => {
            return <option value={category}>{category}</option>;
          })}
      </select>
    </>
  );
};
