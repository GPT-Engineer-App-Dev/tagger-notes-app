import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import ViewNotes from "./pages/ViewNotes.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/view-notes" element={<ViewNotes />} />
      </Routes>
    </Router>
  );
}

export default App;