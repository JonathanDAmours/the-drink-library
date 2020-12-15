import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import { HomePage } from "./components/homepage-components/homepage";
import { Popular } from "./components/popular-component/popular-component";
import { Favourites } from "./components/favourites-component/favourites-component";
import { Contact } from "./components/contact-component/contact-component";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/favourites">
          <Favourites />
        </Route>
        <Route exact path="/popular">
          <Popular />
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
