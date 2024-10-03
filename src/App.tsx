import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DownloadScreen from './screens/DownloadScreen';
import LoginScreen from './screens/LoginScreen';
import CatConfirmationScreen from './screens/CatConfirmationScreen';
import CameraScreen from './screens/CameraScreen';
import BalanceScreen from './screens/BalanceScreen';
import InterestSelectionScreen from './screens/InterestSelectionScreen';
import "./App.css"

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path="/" element={<DownloadScreen />} /> */}
          <Route path="/" element={<LoginScreen />} />
          <Route path="/screen3" element={<CatConfirmationScreen />} />
          <Route path="/screen4" element={<CameraScreen />} />
          <Route path="/screen5" element={<BalanceScreen />} />
          <Route path="/screen6" element={<InterestSelectionScreen />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
