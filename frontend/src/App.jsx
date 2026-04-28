import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import NoteDetailPage from './pages/NoteDetailPage.jsx';
import CreatePage from './pages/CreatePage.jsx';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" index element={<HomePage />}></Route>

        <Route path="/create" element={<CreatePage />}></Route>
        <Route path="/note/:id" element={<NoteDetailPage />}></Route>
      </Routes>
    </div>
  );
};

export default App;
