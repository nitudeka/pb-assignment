import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="bg-gray-100 py-10 min-h-screen w-screen flex items-center justify-center">
      <Outlet />
    </div>
  );
}

export default App;
