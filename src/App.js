import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/login';
import Search from './pages/search';
import Album from './pages/album';
import Favorites from './pages/favorites';
import NotFound from './pages/notFound';
import Profile from './pages/profile/index';
import Edit from './pages/profile/edit/index';

class App extends React.Component {
  render() {
    return (
      <main>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/search" component={ Search } />
            <Route exact path="/album/:id" component={ Album } />
            <Route exact path="/favorites" component={ Favorites } />
            <Route exact path="/notFound" component={ NotFound } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/profile/edit" component={ Edit } />

            <Route path="*" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
