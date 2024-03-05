import { 
  BrowserRouter, 
  Routes,
  Route,
} from 'react-router-dom';
import React from 'react';
import './App.css';
// import MyComponent from './components/MyComponent';
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
          <Route exact path='/' element={<Home />}/>
          <Route exact path='/login' element={<Auth authRoute='login'/>}/>
          <Route exact path='/register' element={<Auth authRoute='register'/>}/>
          {/* <Route exact path='/about' element={<ProtectedRoute component={About} />}/> */}
          <Route exact path='/subtitle/video-files' element={<ProtectedRoute component={Subtitle} />}/>
          <Route exact path='/subtitle/youtube-link' element={<ProtectedRoute component={SubtitleYtbLink} />}/>
          <Route exact path='/history/subtitle' element={<ProtectedRoute component={SubtitleHistory} />}/>
          <Route exact path='/video/subtitle/detail/:id' element={<ProtectedRoute component={SubtitleDetail} />}/>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
   );
}
 
export default App;
