import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./Screens/HomeScreen";
const App = () => {
  return (
    <>
      <Header></Header>
      <main>
        <Container>
          <HomeScreen></HomeScreen>
        </Container>
      </main>
      <Footer></Footer>
    </>
  );
};

export default App;
