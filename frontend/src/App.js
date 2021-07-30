import { AuthContextProvider } from './components/AuthContextProvider';
import MainRouter from './components/MainRouter'


function App() {
  return (
    <AuthContextProvider>
      <MainRouter/>
    </AuthContextProvider>
    
  );
}

export default App;
