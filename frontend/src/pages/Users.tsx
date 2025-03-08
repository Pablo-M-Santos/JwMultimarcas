import { useEffect, useState } from "react";
import { api } from "../api/api";
import { Link, useNavigate } from "react-router-dom";

type User = {
  id: number;
  name: string;
  role: string;
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários", error);
        navigate("/login");
      }
    };

    fetchUsers();
  }, [navigate]);

  return (
    <div>
      <h2>Usuários</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.role}
          </li>
        ))}
      </ul>
      <Link to={"/home"}>Home</Link>
      <br />
      <Link to={"/products"}>Produtos</Link>
    </div>
  );
};

export default Users;
