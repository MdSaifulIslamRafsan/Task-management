import { Outlet } from "react-router-dom";
import Navbar from "./components/share/Navbar";

const App = () => {
  return (
    <div className="">
      <Navbar></Navbar>
      <div className="container mx-auto px-4 lg:px-8 ">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default App;
