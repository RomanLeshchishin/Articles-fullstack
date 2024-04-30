import ReactDOM from 'react-dom/client';
import './main.css';
import App from './App.tsx';
import {setupStore} from "./store";
import {Provider} from "react-redux";

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<App/>
	</Provider>
)
