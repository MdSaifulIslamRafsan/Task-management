import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="p-5">
      <div className="container flex border-2 border-border rounded-2xl  mx-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default App;
