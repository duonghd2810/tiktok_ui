import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import DefaultLayout from "./layouts";
function App() {
	return (
		<Router>
			<div>
				<Routes>
					{publicRoutes.map((item, i) => {
						const Page = item.component;
						let Layout = DefaultLayout;
						if (item.layout) {
							Layout = item.layout;
						} else if (item.layout === null) {
							Layout = Fragment;
						}
						return (
							<Route
								key={i}
								path={item.path}
								element={
									<Layout>
										<Page />
									</Layout>
								}
							/>
						);
					})}
				</Routes>
			</div>
		</Router>
	);
}
export default App;
