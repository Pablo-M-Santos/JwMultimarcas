import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import Navbar from "../components/Navbar";

interface Product {
  id: number;
  name: string;
  price: number;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos", error);
      }
    };

    fetchProducts();

    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    const role = localStorage.getItem("role");
    setUserRole(role);

    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (product: Product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    if (!isLoggedIn) {
      navigate("/login", { state: { from: "/" } });
    }
  };

  const handleCheckout = () => {
    if (isLoggedIn) {
      navigate("/checkout");
    } else {
      navigate("/login", { state: { from: "/checkout" } });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
      {userRole === "admin" && <Navbar />}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            style={{ padding: "10px", cursor: "pointer" }}
          >
            Logout
          </button>
        )}
      </div>
      <p>{isLoggedIn ? "Usuário Logado ✅" : "Usuário Não Logado ❌"}</p>

      <h1>Produtos</h1>
      <div>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h2>{product.name}</h2>
            <p>R$ {product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          borderTop: "2px solid #ddd",
        }}
      >
        <h2>Carrinho</h2>
        {cart.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - R$ {item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={handleCheckout}
          style={{ marginTop: "20px", padding: "10px", cursor: "pointer" }}
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
};

export default Home;
