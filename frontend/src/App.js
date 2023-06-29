import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import ProductLists from "./components/ProductLists";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductLists></ProductLists>}></Route>
          <Route path="add" element={<AddProduct></AddProduct>}></Route>
          <Route path="edit/:id" element={<EditProduct></EditProduct>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
