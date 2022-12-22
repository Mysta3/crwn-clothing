import { useEffect, lazy, Suspense} from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import { checkUserSession } from "./store/user/user.action";
import Spinner from "./components/spinner/spinner.component";
import { GlobalStyle } from './global.styles';

/*
CONVERT THE REST OF THE ROUTE IMPORTS TO DYNAMIC LOADING
*/
const Home = lazy(() => import('./routes/home/home.component'));
const Authentication = lazy(() => import('./routes/authentication/authentication.component.jsx'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(checkUserSession());
    
    // eslint-disable-next-line
  }, []);
  
  return (
    <Suspense fallback={<Spinner/>}>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Navigation/>}>
          <Route index element={ <Home/> } />
          <Route path='shop/*' element={ <Shop/> } />
          <Route path='auth' element={ <Authentication/> } />
          <Route path='checkout' element={ <Checkout/> } />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;

