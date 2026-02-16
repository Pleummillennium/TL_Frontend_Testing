import { BrowserRouter, Routes, Route } from "react-router";
import MyRequestsPage from "./pages/MyRequestsPage";
import RequestDetailPage from "./pages/RequestDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyRequestsPage />} />
        <Route path="/requests/:id" element={<RequestDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
