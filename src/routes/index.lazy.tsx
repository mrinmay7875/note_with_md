import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className='p-2'>
      <h3>This is the Index page where we will all the notes</h3>
    </div>
  );
}
