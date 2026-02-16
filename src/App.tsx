import { BrowserRouter, Routes, Route } from "react-router";
import { NearProvider } from "near-connect-hooks";
import { Toaster } from "sonner";

import { Navigation } from "@/components/navigation";
import { AuthGuard } from "@/components/auth-guard";
import Home from "@/pages/home";
import ProfileView from "@/pages/profile-view";
import ProfileEdit from "@/pages/profile-edit";
import PublicProfile from "@/pages/public-profile";

function App() {
  return (
    <NearProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={
              <AuthGuard>
                <ProfileView />
              </AuthGuard>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <AuthGuard>
                <ProfileEdit />
              </AuthGuard>
            }
          />
          <Route path="/u/:accountId" element={<PublicProfile />} />
        </Routes>
        <Toaster position="bottom-center" />
      </BrowserRouter>
    </NearProvider>
  );
}

export default App;
