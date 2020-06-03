import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';
import Header from 'components/Header/Header';
import MainPage from 'pages/MainPage/MainPage';
import ProfilePage from 'pages/ProfilePage/ProfilePage';
import AuthPage from 'pages/AuthPage/AuthPage';
import Footer from 'components/Footer/Footer';
import CreateRoom from 'components/CreateRoom/CreateRoom';

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Header isUserLogged={false} />
				<Switch>
					<Route path='/' exact	component={ MainPage }		/>
					<Route path='/profile'	component={ ProfilePage }	/>
					<Route path='/auth'		component={ AuthPage }		/>
					<Route path='/create'	component={ CreateRoom }	/>
					<Route path='/credits'	component={ MainPage }		/>
					<Route path='/settings'	component={ MainPage }		/>
					<Route path='/faq'		component={ MainPage }		/>
					<Redirect to="/" />
				</Switch>
				<Footer />
			</BrowserRouter>
		);
	}
}

export default App;
