import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import ProjectDetail from "./pages/ProjectDetail";
import ProcessPage from "./pages/Process/ProcessPage";
import InquiryProvider from "./context/InquiryProvider";
import InquiryOverlay from "./components/Inquiry/InquiryOverlay";

function App() {
  return (
    <InquiryProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:projectSlug" element={<ProjectDetail />} />
      </Routes>
      <InquiryOverlay />
    </InquiryProvider>
  );
}

export default App;
