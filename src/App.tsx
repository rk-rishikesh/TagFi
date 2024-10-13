import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DownloadScreen from './screens/DownloadScreen';
import LoginScreen from './screens/LoginScreen';
import CameraScreen from './screens/CameraScreen';
import BalanceScreen from './screens/BalanceScreen';
import InterestSelectionScreen from './screens/InterestSelectionScreen';
import FruitConfirmationScreen from './screens/FruitConfirmationScreen';
import "./App.css"
import CatConfirmationScreen from './screens/CatConfirmationScreen';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path="/" element={<DownloadScreen />} /> */}
          <Route path="/" element={<LoginScreen />} />
          <Route path="/screen3" element={<CatConfirmationScreen />} />
          <Route path="/screen7" element={<FruitConfirmationScreen />} />
          <Route path="/screen4" element={<CameraScreen />} />
          <Route path="/screen5" element={<BalanceScreen />} />
          <Route path="/screen6" element={<InterestSelectionScreen />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
