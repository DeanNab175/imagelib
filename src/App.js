import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import ImageDetails from "./pages/ImageDetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<ImageDetails />} />
      </Routes>
    </div>
  );
}

export default App;
