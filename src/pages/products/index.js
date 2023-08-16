import CategorySelector from "@/components/categorySelector";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Products() {
  const [products, setProducts] = useState([]);

  function fetchProducts() {
    axios
      .get("http://localhost:3001/products/?_expand=category")
      .then(function name(response) {
        setProducts(response.data);
      });
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  function handleCategoryChange(categoryId) {
    if (categoryId === "0") {
      fetchProducts();
    } else {
      axios
        .get(
          `http://localhost:3001/categories/${categoryId}/products?_expand=category`
        )
        .then(function name(response) {
          setProducts(response.data);
        });
    }
  }
  return (
    <div>
      <h1>Products</h1>
      <Link href="/products/new">New product</Link>
      <br />
      <br />

      <CategorySelector onChange={handleCategoryChange} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
