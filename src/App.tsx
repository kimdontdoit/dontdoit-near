import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router";
import { NearProvider } from "near-connect-hooks";
import { Toaster } from "sonner";

import { Navigation } from "@/components/navigation";
import Footer from "@/components/landing/Footer";
import { AuthGuard } from "@/components/auth-guard";
import Home from "@/pages/home";
import ProfileEdit from "@/pages/profile-edit";

const FOOTER_ROUTES = ["/"];

const AppShell = () => {
  const location = useLocation();
  const showFooter = FOOTER_ROUTES.includes(location.pathname);

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Navigate to="/profile/edit" replace />} />
        <Route
          path="/profile/edit"
          element={
            <AuthGuard>
              <ProfileEdit />
            </AuthGuard>
          }
        />
        {/* Public profiles live on dontdoit.club/iki/:accountId */}
        <Route path="/u/:accountId" element={<Navigate to="/" replace />} />
      </Routes>
      {showFooter && <Footer />}
      <Toaster position="bottom-center" />
    </>
  );
};

function App() {
  return (
    <NearProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </NearProvider>
  );
}

export default App;
