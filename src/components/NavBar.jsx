import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Link } from "react-router-dom";

const NavItem = ({ item, href, onClick }) => {
  return (
    <li className="text-center text-xl py-2 my-4 transition-transform hover:scale-105">
      <Link
        to={href}
        onClick={onClick}
        className="hover:text-purple-200 transition-colors duration-200"
      >
        {item}
      </Link>
    </li>
  );
};

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-purple-100">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 flex justify-end h-10 items-center">
        <button
          onClick={toggleMenu}
          className="text-purple-950 text-2xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      <div
        className={`fixed top-0 right-0 h-screen w-full sm:w-72 bg-[#2c1e30] text-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full justify-between p-6">
          <button
            onClick={toggleMenu}
            className="text-white text-xl font-extrabold hover:text-purple-500 transition-colors duration-200"
          >
            ←
          </button>
          <ul className="flex flex-col uppercase tracking-widest">
            <NavItem item="Home" href="/" onClick={toggleMenu} />
            <NavItem item="About" href="/about" onClick={toggleMenu} />
            <NavItem item="All Posts" href="/posts" onClick={toggleMenu} />
            {isAuthenticated ? (
              <NavItem
                item="Sign out"
                href="/"
                onClick={() => {
                  toggleMenu();
                  logout();
                }}
              />
            ) : (
              <>
                <NavItem item="Sign in" href="/signin" onClick={toggleMenu} />
                <NavItem item="Sign up" href="/signup" onClick={toggleMenu} />
              </>
            )}
          </ul>
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30"
          onClick={toggleMenu}
        />
      )}
    </nav>
  );
};

export default NavBar;
