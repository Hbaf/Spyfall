import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';
import Header from 'components/Header/Header';
import MainPage from 'pages/MainPage/MainPage';
import ProfilePage from 'pages/ProfilePage/ProfilePage';
import AuthPage from 'pages/AuthPage/AuthPage';

class App extends React.Component {
	render() {
		return (
			<div className="app">
				<BrowserRouter>
					<Header isUserLogged={false} />
					<Switch>
						<Route exact path='/' component={ MainPage }/>
						<Route exact path='/profile' component={ ProfilePage }/>
						<Route exact path='/auth' component = { AuthPage }/>
						<Redirect to="/" />
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
