import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="border-t text-center text-gray-500 px-4 text-xs sm:text-sm">
            <div className="max-w-7xl mx-auto flex flex-col justify-center sm:flex-row sm:justify-between min-h-20 sm:items-center gap-2">
                <p>
                    © {new Date().getFullYear()} InklingEcho. All rights
                    reserved.
                </p>
                <p>
                    Designed and developed by{" "}
                    <Link to="/" className="underline hover:text-gray-700">
                        InklingEcho
                    </Link>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
