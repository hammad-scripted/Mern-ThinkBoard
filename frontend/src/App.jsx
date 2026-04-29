// App.jsx
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import NoteDetailPage from './pages/NoteDetailPage.jsx';
import CreatePage from './pages/CreatePage.jsx';

const App = () => {
  return (
    <div className="relative min-h-screen w-full bg-background">
      <div className="fixed inset-0 -z-10 bg-gradient" />
      <Routes>
        <Route path="/" index element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
