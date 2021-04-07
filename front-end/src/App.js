import Footer from "./Components/Footer/Footer";
import { BrowserRouter as Router, Route, Switch}  from "react-router-dom";
import Header from "./Components/Header/Header";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import Contact from "./Components/Contact";
import { Container } from "react-bootstrap";
import CartScreen from "./Screens/CartScreen";
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
        </Switch>
        </Container>
        <Footer></Footer>
      </Router>
      
    </div>
  );
};

export default App;
