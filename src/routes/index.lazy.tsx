import { createLazyFileRoute } from '@tanstack/react-router';
import NoteCard from '../components/NoteCard/NoteCard';
import { Field, SearchBox } from '@fluentui/react-components';
import './Home.css';
import AddNewNoteDialog from '../components/NewNoteDialog/AddNewNoteDialog';
import { useSelector } from 'react-redux';
import { Note } from '../types/type';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const notes = useSelector((state: any) => state.notes);
  // console.log('notes inside me', notes);

  return (
    <div className='mainContainer'>
      <Field className='m-50'>
        {/* TODO:  Increase the width of the search box */}
        <SearchBox placeholder='Search for notes..' />
      </Field>
      <Field>
        <br />
        <AddNewNoteDialog />
      </Field>
      {notes.map((note: Note) => (
        <div>
          <NoteCard key={note.id} title={note.title} tags={['react']} />
          <br />
        </div>
      ))}
    </div>
  );
}
