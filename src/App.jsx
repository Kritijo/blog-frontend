import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/utils/ScrollToTop.jsx";
import { AuthProvider } from "./components/contexts/AuthContext.jsx";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <ScrollToTop />
      <AuthProvider>
        <NavBar />
        <main className="min-h-screen overflow-x-hidden">
          <Outlet />
        </main>
      </AuthProvider>
      <Footer />
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
