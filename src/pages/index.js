import {AuthProvider} from './context/AuthProvider';

ReactDOM.render(
    <React.StrictMode>
    <AuthProvider>
        <App />
    </AuthProvider>
  </React.StrictMode>
)