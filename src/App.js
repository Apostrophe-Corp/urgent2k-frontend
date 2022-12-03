import React from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom'
import { useAuth } from './hooks'
import AppView from './views/App'
import ReachContextProvider from './context/ReachContext'
import AuthContextProvider from './context/AuthContext'
import { Landing, Loans, Profile } from './layouts'

const PrivateRoute = ({ children, ...rest }) => {
	const { isAuthenticated } = useAuth()
	return (
		<Route
			{...rest}
			render={({ location }) =>
				isAuthenticated ? (
					children
				) : (
					<Navigate
						to='/sign-in'
						replace={true}
					/>
				)
			}
		/>
	)
}

const App = () => {
	return (
		<ReachContextProvider>
			<AuthContextProvider>
				<AppView>
					<Router>
						<Routes>
							<Route path='/'>
								<Landing />
							</Route>
							<PrivateRoute path='/loans'>
								<Loans />
							</PrivateRoute>
							<PrivateRoute path='/account'>
								<Profile />
							</PrivateRoute>
							<PrivateRoute path='/account'>
								<Profile />
							</PrivateRoute>
							<Route path='/sign-in'>{/* <SignIn/> */}</Route>
						</Routes>
					</Router>
				</AppView>
			</AuthContextProvider>
		</ReachContextProvider>
	)
}

export default App
