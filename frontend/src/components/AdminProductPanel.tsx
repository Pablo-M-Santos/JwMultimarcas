import { useState, useEffect } from "react";
import { api } from "../api/api";


interface Product {
  id: string;
  name: string;
  price: number;
}

const AdminProductPanel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalType, setModalType] = useState<
    "create" | "edit" | "delete" | null
  >(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get<Product[]>("/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (modalType === "create") {
        await api.post("/api/products", { name, price });
        alert("Produto cadastrado!");
      } else if (modalType === "edit" && selectedProduct) {
        await api.put(`/api/products/${selectedProduct.id}`, { name, price });
        alert("Produto atualizado!");
      } else if (modalType === "delete" && selectedProduct) {
        await api.delete(`/api/products/${selectedProduct.id}`);
        alert("Produto deletado!");
      }
      setModalType(null);
      fetchProducts(); 
    } catch (error) {
      console.error("Erro na operação", error);
    }
  };

  return (
    <div>
      <h2>Painel de Administração</h2>
      <button onClick={() => setModalType("create")}>Cadastrar Produto</button>
      <button onClick={() => setModalType("edit")}>Editar Produto</button>
      <button onClick={() => setModalType("delete")}>Deletar Produto</button>

      <h3>Lista de Produtos</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - R$ {product.price}
          </li>
        ))}
      </ul>

      {modalType && (
        <div className="modal">
          <div className="modal-content">
            <h3>
              {modalType === "create"
                ? "Cadastrar Produto"
                : modalType === "edit"
                ? "Editar Produto"
                : "Deletar Produto"}
            </h3>
            {(modalType === "edit" || modalType === "delete") && (
              <select
                onChange={(e) => {
                  const product = products.find((p) => p.id === e.target.value);
                  setSelectedProduct(product || null);
                  if (modalType === "edit" && product) {
                    setName(product.name);
                    setPrice(product.price);
                  }
                }}
              >
                <option value="">Selecione um produto</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} - R$ {product.price}
                  </option>
                ))}
              </select>
            )}
            {(modalType === "create" || modalType === "edit") && (
              <>
                <input
                  type="text"
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="number"
                  placeholder="Preço"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </>
            )}
            <button onClick={handleSubmit}>
              {modalType === "delete" ? "Confirmar Deleção" : "Salvar"}
            </button>
            <button onClick={() => setModalType(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductPanel;
