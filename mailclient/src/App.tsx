import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserProvider";
import Congrats from "./pages/Congrats";
import Index from "./pages/Index";
import Login from "./pages/Login";
import CongratsRoute from "./routes/CongratsRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import RestrictedRoute from "./routes/RestrictedRoute";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<UserProvider>
					<Routes>
						<Route path="/" element={<ProtectedRoute />}>
							<Route path="/" element={<Index />} />
						</Route>
						<Route path="/congrats" element={<CongratsRoute />}>
							<Route path="/congrats" element={<Congrats />} />
						</Route>
						{/* <Route path="/" element={<Index />} /> */}
						<Route path="/login" element={<RestrictedRoute />}>
							<Route path="/login" element={<Login />} />
						</Route>
					</Routes>
				</UserProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;

//This is the app's tree
