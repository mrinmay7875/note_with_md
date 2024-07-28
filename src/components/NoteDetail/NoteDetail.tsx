import { useParams } from '@tanstack/react-router';
import { useSelector } from 'react-redux';

const NoteDetail = () => {
  // Fetching the noteID from route params
  const noteId = useParams({
    from: '/notes/$noteId',
    select: (params) => params.noteId,
  });

  const notes = useSelector((state: any) => state.notes);

  const note = notes.find((note: any) => note.id === noteId);

  return (
    <div>
      NoteDetail and ID: {noteId}
      <div>
        <h2>{note?.title}</h2>
        <h2>{note?.body}</h2>
      </div>
    </div>
  );
};

export default NoteDetail;
