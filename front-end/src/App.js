import Footer from "./Components/Footer/Footer";
import { BrowserRouter as Router, Route, Switch}  from "react-router-dom";
import Header from "./Components/Header/Header";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import Contact from "./Components/Contact";
import { Container } from "react-bootstrap";
import CartScreen from "./Screens/CartScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import OrderScreen from "./Screens/OrderScreen";
import UserListScreen from "./Screens/UserListScreen";
const App = () => {
  return (
    <div>
      <Router>
        <Header></Header>
        <Container>
        <Switch>
          <Route  path="/" exact>
            <HomeScreen></HomeScreen>
          </Route>
          <Route path="/productDetail/:id">
            <ProductScreen></ProductScreen>
          </Route>
          <Route path="/contact">
            <Contact></Contact>
          </Route>
          <Route path='/cart/:id?'>
            <CartScreen></CartScreen>
          </Route>
          <Route path='/shipping'>
            <ShippingScreen></ShippingScreen>
          </Route>
          <Route path='/payment'>
           <PaymentScreen></PaymentScreen>
          </Route>
          <Route path='/placeorder'>
            <PlaceOrderScreen></PlaceOrderScreen>
          </Route>
          <Route path='/order/:id'>
            <OrderScreen></OrderScreen>
          </Route>
          <Route path='/login'>
            <LoginScreen></LoginScreen>
          </Route>
          <Route path='/register'>
            <RegisterScreen></RegisterScreen>
          </Route>
          <Route path='/profile'>
            <ProfileScreen></ProfileScreen>
          </Route>
          <Route path='/admin/userList'>
            <UserListScreen></UserListScreen>
          </Route>
        </Switch>
        </Container>
        <Footer></Footer>
      </Router>
      
    </div>
  );
};

export default App;
