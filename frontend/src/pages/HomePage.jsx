import Navbar from '../components/Navbar.jsx';
import axios from 'axios';
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import { useEffect, useState } from 'react';
const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(true);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/notes/');
        console.log(res.data);
        setNotes(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotes();
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}
    </div>
  );
};

export default HomePage;
