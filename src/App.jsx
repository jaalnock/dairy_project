import { Routes, Route } from "react-router-dom";
import "./App.css";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ContactUs } from "./pages/ContactUs";
import { ProductList } from "./pages/ProductList";
import { ProductDetails } from "./pages/ProductDetail";
import { Home } from "./pages/Home";
import { AboutUs } from "./pages/AboutUs";
import { EditImageSlider } from "./pages/EditImageSlider.jsx";
import { BranchList } from "./pages/BranchList.jsx";
import { SubAdminList } from "./pages/SubAdminList.jsx";
import { AdminReport } from "./pages/AdminReport.jsx";
import { Login } from "./pages/Login.jsx";
import {
  CustomerLayout,
  AdminLayout,
  SubAdminLayout,
} from "./components/index.js";
import { SubAdminProductsList } from "./pages/SubAdminProductsList.jsx";
import TransactionList from "./pages/TransactionList.jsx";
import { SubAdminReport } from "./pages/SubAdminReport.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductList />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="contact-us" element={<ContactUs />} />
        </Route>

        <Route path="products/:id" element={<ProductDetails />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<EditImageSlider />} />
          <Route path="branch" element={<BranchList />} />
          <Route path="subadmin" element={<SubAdminList />} />
          <Route path="reports" element={<AdminReport />} />
        </Route>

        <Route path="/login" element={<Login />} />

        <Route path="/subadmin" element={<SubAdminLayout />}>
          <Route index element={<TransactionList />} />
          <Route path="product" element={<SubAdminProductsList />} />
          <Route path="report" element={<SubAdminReport />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
