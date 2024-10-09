import { RouterProvider } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { router } from "./router/navigation";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthContext>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" />
    </AuthContext>
  );
}

export default App;
