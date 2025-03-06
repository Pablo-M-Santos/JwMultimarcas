import { useEffect, useState } from "react";
import { api } from "../apis/api";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
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
        {products.map((product: any) => (
          <li key={product.id}>{product.name} - R$ {product.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
