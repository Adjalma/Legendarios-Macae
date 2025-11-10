import { useRoutes } from "react-router-dom";
import { HomePage } from "../pages/Home/HomePage";
import { TopsPage } from "../pages/Tops/TopsPage";
import { StoriesPage } from "../pages/Stories/StoriesPage";
import { MediaPage } from "../pages/Media/MediaPage";
import { AboutPage } from "../pages/About/AboutPage";

export const AppRoutes = () => {
  return useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/tops", element: <TopsPage /> },
    { path: "/historias", element: <StoriesPage /> },
    { path: "/midia", element: <MediaPage /> },
    { path: "/sobre", element: <AboutPage /> }
  ]);
};

