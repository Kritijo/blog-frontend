import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Link } from "react-router-dom";

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isAuthenticated, logout } = useContext(AuthContext);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className="bg-white sticky top-0 right-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-14 items-center">
                <Link to="/" className="text-xl font-semibold text-black">
                    Home
                </Link>

                <button
                    onClick={toggleMenu}
                    className="text-gray-800 text-xl focus:outline-none"
                >
                    ☰
                </button>
            </div>

            <div
                className={`fixed top-0 right-0 h-full w-40 sm:w-60 bg-[#151515] text-gray-400 z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
                    menuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex flex-col h-full justify-between p-6">
                    <ul className="space-y-4 text-sm uppercase tracking-widest">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-400 text-xl focus:outline-none hover:text-white transition-colors duration-200"
                        >
                            ✖
                        </button>
                        <NavItem item="Home" href="/" onClick={toggleMenu} />
                        <NavItem
                            item="About"
                            href="/about"
                            onClick={toggleMenu}
                        />
                        <NavItem
                            item="All Posts"
                            href="/posts"
                            onClick={toggleMenu}
                        />
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
                                <NavItem
                                    item="Sign in"
                                    href="/signin"
                                    onClick={toggleMenu}
                                />
                                <NavItem
                                    item="Sign up"
                                    href="/signup"
                                    onClick={toggleMenu}
                                />
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

const NavItem = ({ item, href, onClick }) => {
    return (
        <li className="border-b border-gray-600 pb-1">
            <Link
                to={href}
                onClick={onClick}
                className="hover:text-white transition-colors duration-200"
            >
                {item}
            </Link>
        </li>
    );
};

export default NavBar;
