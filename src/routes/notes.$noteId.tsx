import { createFileRoute } from '@tanstack/react-router';
import NoteDetail from '../components/NoteDetail/NoteDetail';

export const Route = createFileRoute('/notes/$noteId')({
  component: NoteDetail,
});
