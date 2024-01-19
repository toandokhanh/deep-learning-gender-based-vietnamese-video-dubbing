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
import Summary from './components/Summary/Summary';
import SummaryHistory from './components/Summary/History';
import SubtitleHistory from './components/Subtitle/History';
import SummaryDetail from './components/Summary/Detail';
import SubtitleDetail from './components/Subtitle/Detail';
import AuthContextProvider from './contexts/authContext';
import ProtectedRoute from './components/routing/ProtectedRoute'
import Subtitle from './components/Subtitle/Subtitle'
const App = () => {
  return ( 
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route exact path='/login' element={<Auth authRoute='login'/>}/>
          <Route exact path='/register' element={<Auth authRoute='register'/>}/>
          <Route exact path='/summary' element={<ProtectedRoute component={Summary} />}/>
          <Route exact path='/subtitle' element={<ProtectedRoute component={Subtitle} />}/>
          <Route exact path='/history/summary' element={<ProtectedRoute component={SummaryHistory} />}/>
          <Route exact path='/history/subtitle' element={<ProtectedRoute component={SubtitleHistory} />}/>
          <Route exact path='/video/summary/detail/:id' element={<ProtectedRoute component={SummaryDetail} />}/>
          <Route exact path='/video/subtitle/detail/:id' element={<ProtectedRoute component={SubtitleDetail} />}/>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
   );
}
 
export default App;
