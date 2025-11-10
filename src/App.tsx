import { Outlet } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { AppRoutes } from "./routes/AppRoutes";

const App = () => {
  return (
    <AppLayout>
      <AppRoutes />
      <Outlet />
    </AppLayout>
  );
};

export default App;

