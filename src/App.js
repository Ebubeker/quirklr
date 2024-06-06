import { RouterProvider } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { router } from "./router/navigation";
function App() {
  return (
    <AuthContext>
      <RouterProvider router={router}/>
    </AuthContext>
  );
}

export default App;
