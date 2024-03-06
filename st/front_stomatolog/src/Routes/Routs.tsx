import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import Price from '../Pages/Price'
import Auth from '../Pages/Auth'
import Registration from '../Pages/Registration'
import { BottomBarProvider } from '../components/BottomBarContext'




function Routs() {
  return (
    <Router>
      <BottomBarProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/price" element={<Price />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
      </BottomBarProvider>
    </Router>
  );
}

export default Routs;
