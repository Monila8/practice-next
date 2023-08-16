import axios from "axios";
import { useEffect, useState } from "react";

export default function CategorySelector({ onChange }) {
  const [categories, setCategories] = useState([]);
  function fetchCategories(params) {
    axios.get("http://localhost:3001/categories").then(function name(response) {
      setCategories(response.data);
    });
  }
  useEffect(() => {
    fetchCategories();
  }, []);
  function handleSelectCategoryChange(event) {
    onChange(event.target.value);
  }

  return (
    <select onChange={handleSelectCategoryChange}>
      <option value="0"> All</option>
      {categories.map((c) => (
        <option value={c.id}>{c.name}</option>
      ))}
    </select>
  );
}
