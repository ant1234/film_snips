import React from "react";
import { Auth, Hub } from "aws-amplify";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Authenticator, AmplifyTheme } from "aws-amplify-react";
import Homepage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import MarketPage from "./pages/MarketPage";
import Navbar from "./components/Navbar";
import "./App.css";

export const UserContext = React.createContext()

class App extends React.Component {

  state = {
    user: null
  };

  componentDidMount() {
    this.getUserData();
    Hub.listen('auth', this, 'onHubCapsule');
  }

  getUserData = async () => {
    const user = await Auth.currentAuthenticatedUser()
    user ? this.setState({ user }) : this.setState({ user: null })
  }

  onHubCapsule = capsule => {
    switch(capsule.payload.event) {
      case "signIn":
        console.log("signed in")
        this.getUserData()
        break;
      case "signUp":
        console.log("signed up")
        break;
      case "signOut":
        console.log("signed out")
        this.setState({ user: null })
        break;
      default:
        return;
    }
  }

  handleSignout = async () => {
    try {
      await Auth.signOut()
    } catch(err){
      console.error('Error signing out user', err);
    }
  }

  render() {

    const { user } = this.state;
    
    return !user ? (
      <Authenticator />
    ) : (
        <UserContext.Provider value={{ user }}>
        <Router>
          <>
            {/* Navigation */}
            <Navbar user = { user } handleSignout={this.handleSignout} />

            {/* Routes */}
            <div className="app-containers">
              <Route exact path="/" component={Homepage} />
              <Route path="/profile" component={ProfilePage} />
              <Route path="/market/:marketId" component={
                ({ match }) => <MarketPage marketId={match.params.marketId}/>
              } />

            </div>
          </>
        </Router>
        </UserContext.Provider>
    );
  }
}

// export default withAuthenticator(App);
export default App;