import './App.css';
import Signin from './content/signin_login/signin';
import Login from './content/signin_login/login';
import Home from './content/chat/Home';
import {BrowserRouter,Navigate,Route,Routes} from "react-router-dom"
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

// ...

function App() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/Login" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="Login" element={<Login />} />
          <Route path="SingIn" element={<Signin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// ...


export default App;
