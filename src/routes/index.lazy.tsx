import { createLazyFileRoute } from '@tanstack/react-router';
import NoteCard from './../components/NoteCard';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className='p-2'>
      <h3>This is the Index page where we will all the notes</h3>
      <NoteCard title='Note 1' tags={['tag1', 'tag2']} />
    </div>
  );
}
