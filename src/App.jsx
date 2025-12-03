import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/utils/ScrollToTop.jsx";
import { AuthProvider } from "./components/contexts/AuthContext.jsx";
import { Toaster } from "sonner";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" richColors closeButton />
        <ScrollToTop />
        <AuthProvider>
          <NavBar />
          <main className="min-h-screen overflow-x-hidden">
            <Outlet />
          </main>
        </AuthProvider>
        <Footer />
      </QueryClientProvider>
    </>
  );
}

export default App;
