import './App.css';
import { Route, Routes } from 'react-router-dom';
import CreateUser from './pages/CreateUser';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={ <Login /> }/>
        <Route path='/register' element={ <CreateUser /> }/>
        <Route path='/dashboard' element={ <Dashboard /> }/>
      </Routes>
      {/* <CreateUser /> */}
      {/* <Login /> */}
    </div>
  );
}

export default App;
