import * as React from 'react';
import { connect } from 'react-redux';

import { cn } from '@bem-react/classname';

import './Auth.scss';

import IState from 'store/types';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';

const cnAuth = cn('Auth');

interface IOwnState {
	login: boolean;
	userName: string;
	password: string;
	email: string;
	confirmEmail : string;
	displayPass: boolean;
}

interface IStatePropsRedux {
	userName: string;
}

type IAuthProps = IStatePropsRedux

class Auth extends React.Component<IAuthProps, IOwnState> {
	constructor(props: IAuthProps) {
		super(props);
		this.state = {
			login: true,
			userName: props.userName,
			password: '',
			email: '',
			confirmEmail: '',
			// TODO add display pass feature
			displayPass: false,
		};
	}

	render() {
		const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
			this.setState({ login: event.target.name === 'in' });
		};

		const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
		};

		const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			this.setState({ email: event.target.value });
		};

		const onConfirmEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			this.setState({ confirmEmail: event.target.value });
		};

		const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			this.setState({ userName: event.target.value });
		};

		const onPassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			this.setState({ password: event.target.value });
		};

		return (
			<form className={cnAuth()} onSubmit={onSubmit}>
				<div className={cnAuth('Tabs')}>
					<div className={cnAuth('Tab')}>
						<span className={cnAuth('TabPlaceholder')}>
							Sign In
						</span>
						<Input className={cnAuth('TabContent')} type='radio' name='in' onChange={onChangeHandler} checked={this.state.login} />
					</div>
					<div className={cnAuth('Tab')}>
						<span className={cnAuth('TabPlaceholder')}>
							Sign Up
						</span>
						<Input className={cnAuth('TabContent')} type='radio' name='up' onChange={onChangeHandler} checked={!this.state.login} />
					</div>
				</div>
				<div className={cnAuth('Body')}>
					{
						this.state.login ?
							null :
							<>
								<div className={cnAuth('Input')}>
									<Input
										className={cnAuth('TextInput')}
										mods={{ type: 'email' }}
										value={this.state.email}
										onChange={onEmailChange}
									/>
									<span className={cnAuth('TextInputPlaceholder')}>
										Email
									</span>
								</div>
								<div className={cnAuth('Input')}>
									<Input
										className={cnAuth('TextInput')}
										mods={{ type: 'email-repeat' }}
										value={this.state.confirmEmail}
										onChange={onConfirmEmailChange}
									/>
									<span className={cnAuth('TextInputPlaceholder')}>
										Repeat email
									</span>
								</div>
							</>
					}
					<div className={cnAuth('Input')}>
						<Input
							className={cnAuth('TextInput')}
							mods={{ type: 'username' }}
							value={this.state.userName}
							onChange={onNameChange}
						/>
						<span className={cnAuth('TextInputPlaceholder')}>
							Username
						</span>
					</div>
					<div className={cnAuth('Input')}>
						<Input
							className={cnAuth('TextInput')}
							type={this.state.displayPass ? 'text' : 'password'}
							value={this.state.password}
							onChange={onPassChange}
						/>
						<span className={cnAuth('TextInputPlaceholder')}>
							Password
						</span>
					</div>
					<Button className={cnAuth('InputSubmit')} text='Submit' />
				</div>
			</form>
		);
	}
}

const mapStateToProps = (state: IState): IStatePropsRedux => (
	{ userName: state.app.userName }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default connect<IStatePropsRedux, any, any>(mapStateToProps)(Auth);
