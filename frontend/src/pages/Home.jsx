import { useAuth } from '../contexts/AuthContext';
import ChatWindow from '../components/Chat/ChatWindow';
import Sidebar from '../components/Layout/Sidebar';
import Header from '../components/Layout/Header';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="max-w-4xl mx-auto h-full flex flex-col">
            <ChatWindow />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;