import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import Router from './Router';

const App = () => {
  return (
    <AuthProvider>
      <ChatProvider>
        <Router />
      </ChatProvider>
    </AuthProvider>
  );
};

export default App;