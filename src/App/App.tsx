import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import Header from 'components/Header/Header';
import MainPage from 'pages/MainPage/MainPage';
import ProfilePage from 'pages/ProfilePage/ProfilePage';
import AuthPage from 'pages/AuthPage/AuthPage';
import Footer from 'components/Footer/Footer';
import CreateRoomPage from 'pages/CreateRoomPage/CreateRoomPage';
import './App.scss';

const App: React.FC = () => (
	<BrowserRouter>
		<Header isUserLogged={false} />
		<div className='AppContainer'>
		<Routes>
			<Route path='/' element={<MainPage />}		/>
			<Route path='/profile' element={<ProfilePage />}	/>
			<Route path='/auth' element={<AuthPage />}		/>
			<Route path='/create' element={<CreateRoomPage />} />
			<Route path='/credits' element={<MainPage />}		/>
			<Route path='/settings' element={<MainPage />}		/>
			<Route path='/faq' element={<MainPage />}		/>
		</Routes>
		</div>
		<Footer />
	</BrowserRouter>
);

export default App;
