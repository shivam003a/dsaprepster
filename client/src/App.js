import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Register from './Pages/Register';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Logout from './Pages/Logout';
import Error from './Pages/Error'
import Footer from './Components/Footer';
import Dashboard from './Pages/Dashboard';
import AppContextProvider from './ContextAPI/AppContext';
import UploadQuestion from './Pages/UploadQuestion';
import UpdateDetails from './Pages/UpdateDetails';

function App() {
	return (
		<div>
			<AppContextProvider>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />
					<Route path='/profile/:id' element={<Profile />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/admin/upload-question' element={<UploadQuestion />} />
					<Route path='/update-details' element={<UpdateDetails />} />
					<Route path='/logout' element={<Logout />} />
					<Route path='/*' element={<Error />} />
				</Routes>
				<Footer />
				<Toaster />
			</AppContextProvider>
		</div>
	);
}

export default App;
