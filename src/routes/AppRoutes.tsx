import { useRoutes } from "react-router-dom";
import { HomePage } from "../pages/Home/HomePage";
import { TopsPage } from "../pages/Tops/TopsPage";
import { GlobalTopsPage } from "../pages/Tops/GlobalTopsPage";
import { StoriesPage } from "../pages/Stories/StoriesPage";
import { MediaPage } from "../pages/Media/MediaPage";
import { AboutPage } from "../pages/About/AboutPage";
import { ContactPage } from "../pages/Contact/ContactPage";
import { PrivacyPage } from "../pages/Legal/PrivacyPage";
import { TermsPage } from "../pages/Legal/TermsPage";

export const AppRoutes = () => {
  return useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/tops", element: <GlobalTopsPage /> },
    { path: "/tops/rio", element: <TopsPage /> },
    { path: "/historias", element: <StoriesPage /> },
    { path: "/midia", element: <MediaPage /> },
    { path: "/sobre", element: <AboutPage /> },
    { path: "/contato", element: <ContactPage /> },
    { path: "/politica-de-privacidade", element: <PrivacyPage /> },
    { path: "/termos-de-uso", element: <TermsPage /> }
  ]);
};

