import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import React from 'react';
import './App.css';
import Auth from './views/Auth';
import Home from './components/Home/Home';
// import About from './components/Home/About';
import SubtitleHistory from './components/Subtitle/History';
import SubtitleDetail from './components/Subtitle/Detail';
import AuthContextProvider from './contexts/authContext';
import ProtectedRoute from './components/routing/ProtectedRoute'
import Subtitle from './components/Subtitle/Subtitle'
import SubtitleYtbLink from './components/Subtitle/SubtitleYtbLink';
const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Auth authRoute='login'/>}/>
          <Route path='/register' element={<Auth authRoute='register'/>}/>
          {/* <Route path='/about' element={<ProtectedRoute component={About} />}/> */}
          <Route path='/subtitle/video-files' element={<ProtectedRoute component={Subtitle} />}/>
          <Route path='/subtitle/youtube-link' element={<ProtectedRoute component={SubtitleYtbLink} />}/>
          <Route path='/history/subtitle' element={<ProtectedRoute component={SubtitleHistory} />}/>
          <Route path='/video/subtitle/detail/:id' element={<ProtectedRoute component={SubtitleDetail} />}/>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
   );
}

export default App;
