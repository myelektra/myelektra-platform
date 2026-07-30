import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import SolutionDetail from './pages/SolutionDetail';
import Industries from './pages/Industries';
import HowItWorks from './pages/HowItWorks';
import GetQuoteHere from './pages/GetQuoteHere';
import Pricing from './pages/Pricing';
import Academy from './pages/Academy';
import About from './pages/About';
import Consultation from './pages/Consultation';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/:id" element={<SolutionDetail />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/get-quote-here-new" element={<GetQuoteHere />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/consultation" element={<Consultation />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
