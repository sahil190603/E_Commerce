import React from 'react';
import MainRoute from './Route/route';
import Navbar from './components/Navbar/Navbar';
import AuthProvider from './Context/AuthProvider';

const App = () => {
  return (
    <div>
      <AuthProvider>
       <Navbar/>
       <MainRoute/>
     </AuthProvider>
    </div>
  );
};

export default App;