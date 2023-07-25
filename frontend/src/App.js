import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Outlet />
    </div>
  );
}

export default App;
