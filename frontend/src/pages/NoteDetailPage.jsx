import axiosInstance from '../libs/axios.js';
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import {
  ArrowLeftIcon,
  LoaderIcon,
  Trash2Icon,
  SaveIcon,
  ClockIcon,
} from 'lucide-react';
import { formatDate } from '../libs/utils.js';

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axiosInstance.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error('Failed to fetch note');
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await axiosInstance.delete(`/notes/${id}`);
      toast.success('Note deleted');
      navigate('/');
    } catch (error) {
      toast.error('Failed to delete note');
      console.log('error', error);
    }
  };

  const handleSave = async () => {
    if (!note.title?.trim() || !note.content?.trim()) {
      toast.error('Title and content are required');
      return;
    }
    setSaving(true);
    try {
      await axiosInstance.put(`/notes/${id}`, note);
      toast.success('Note saved successfully');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Failed to save note');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center gap-4">
        <p className="text-base-content/60 text-lg">Note not found.</p>
        <Link to="/" className="btn btn-primary">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost gap-2">
              <ArrowLeftIcon className="h-4 w-4" />
              Back
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline gap-2"
            >
              <Trash2Icon className="h-4 w-4" />
              Delete
            </button>
          </div>

          {/* Card */}
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body gap-5">
              {/* Timestamp */}
              {note.updatedAt && (
                <div className="flex items-center gap-1.5 text-xs text-base-content/40">
                  <ClockIcon className="h-3 w-3" />
                  Last updated {formatDate(note.updatedAt)}
                </div>
              )}

              {/* Title field — plain div avoids DaisyUI label padding quirks */}
              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-medium text-base-content/70">
                  Title
                </p>
                <input
                  type="text"
                  placeholder="Note title"
                  value={note.title}
                  className="input input-bordered w-full focus:input-primary transition-colors"
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              {/* Content field */}
              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-medium text-base-content/70">
                  Content
                </p>
                <textarea
                  id="note-content"
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered w-full h-52 focus:textarea-primary transition-colors resize-none"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>

              {/* Footer */}
              <div className="flex justify-end items-center gap-2 pt-2 border-t border-base-200">
                <Link to="/" className="btn btn-ghost">
                  Cancel
                </Link>
                <button
                  className="btn btn-primary gap-2"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? (
                    <>
                      <LoaderIcon className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <SaveIcon className="h-4 w-4" />
                      Save note
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
