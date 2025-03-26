import { FaUser, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-gray-100 shadow-md">
      <div className="d-flex items-center ">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800">Minha Loja</div>

        {/* Barra de Pesquisa */}
        <div className="">
          <input type="text" placeholder="Buscar produtos..." className="" />
        </div>

        {/* Ícones */}
        <div className="">
          <FaUser className="text-2xl cursor-pointer text-gray-700" />
          <FaShoppingCart className="text-2xl cursor-pointer text-gray-700" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
