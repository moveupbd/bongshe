import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import OrderReview from './components/OrderReview/OrderReview';
import Shop from './components/Shop/Shop';
import PlaceOrder from './components/PlaceOrder/PlaceOrder';
import Login from './components/Login/Login/Login';
import Register from './components/Login/Register/Register';
import AuthProvider from './contexts/AuthProvider/AuthProvider';
import PrivateRoute from './components/Login/PrivateRoute/PrivateRoute';
import Products from './components/Product/Products';


function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/review" element={<PrivateRoute>
              <OrderReview />
            </PrivateRoute>}>
            </Route>

            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/products' element={<Shop />} />
            <Route path='/detail/:productId' element={<Products />} />
            <Route path='/placeorder' element={<PlaceOrder />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />


          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </div>
  );
}

export default App;
