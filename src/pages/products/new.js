import axios from "axios";
import { useState, useEffect } from "react";
import Categories from "../categories";

export default function NewUsers(params) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("1");

  function fetchCategories(params) {
    axios.get("http://localhost:3001/categories").then(function name(response) {
      setCategories(response.data);
    });
  }

  function handleSendBtnClick() {
    axios
      .post(`http://localhost:3001/category/${category}/products`, {
        name: name,
        price: price,
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .then(function onSucces(params) {
        setName("");
      })
      .catch(function onError(params) {
        alert("Error");
      });
  }

  function handleNameInputChange(event) {
    setName(event.target.value);
  }
  function handlePriceInputChange(event) {
    setPrice(event.target.value);
  }
  function handleSelectCategoryChange(event) {
    setCategory(event.target.value);
  }
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Insert product name"
        value={name}
        onChange={handleNameInputChange}
      />
      <input
        type="text"
        placeholder="Insert price"
        value={price}
        onChange={handlePriceInputChange}
      />
      <select onChange={handleSelectCategoryChange} value={category}>
        {categories.map((c) => (
          <option value={c.id}>{c.name}</option>
        ))}
      </select>
      <button onClick={handleSendBtnClick} disabled={!name.length}>
        Save
      </button>
    </div>
  );
}
