import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Main from './pages/Main'
import Page404 from './pages/404'

export default function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route path={"/"} element={<Main />} />
				<Route path={`/*`} element={<Page404 />} />
			</Routes>
			<ToastContainer />
		</BrowserRouter>
	)
}
