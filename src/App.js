import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/login';
import Search from './pages/search';
import Album from './pages/album';
import Favorites from './pages/favorites';
import NotFound from './pages/notFound';
import Profile from './pages/profile';

class App extends React.Component {
  render() {
    return (
      <main>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/search" component={ Search } />
            <Route path="/album" component={ Album } />
            <Route path="/favorites" component={ Favorites } />
            <Route path="/notFound" component={ NotFound } />
            <Route path="/profile" component={ Profile } />
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
