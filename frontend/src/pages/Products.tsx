import { useEffect, useState } from "react";
import { api } from "../api/api";
import { Link } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  price: number;
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get<Product[]>("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Produtos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - R$ {product.price}
          </li>
        ))}
      </ul>
      <Link to={"/home"}>Home</Link>
      <br />
      <Link to={"/products"}>Produtos</Link>
    </div>
  );
};

export default Products;
