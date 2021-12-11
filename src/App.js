import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { MainPage, Page404, DetailedTask } from "./components/pages";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/desc/:id" element={<DetailedTask />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  </Router>
);

export default App;
