import { createLazyFileRoute } from '@tanstack/react-router';
import NoteCard from './../components/NoteCard';
import { Field, SearchBox } from '@fluentui/react-components';
import './Home.css';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className='mainContainer'>
      <Field className='m-50' label='Search for Notes..'>
        <SearchBox />
      </Field>
      <h3>This is the Index page where we will all the notes</h3>
      <NoteCard title='Note 1' tags={['tag1', 'tag2']} />
    </div>
  );
}
