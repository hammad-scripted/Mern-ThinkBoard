import axiosInstance from '../libs/axios.js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import toast from 'react-hot-toast';
const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axiosInstance.get(`/notes/${id}`);
        setNote(res.data);
        console.log(res.data);
      } catch (error) {
        toast.error('Failed to fetch note');
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);
  return (
    <div>
      <h1>Details of note</h1>
    </div>
  );
};

export default NoteDetailPage;
