import { createLazyFileRoute } from '@tanstack/react-router';
import NoteCard from '../components/NoteCard/NoteCard';
import {
  Field,
  SearchBox,
  SearchBoxChangeEvent,
} from '@fluentui/react-components';
import './HomePage.css';
import AddNewNoteDialog from '../components/NewNoteDialog/AddNewNoteDialog';
import { useSelector } from 'react-redux';
import { Note } from '../types/type';
import { useState } from 'react';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const notes = useSelector((state: any) => state.notes);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const filteredNotes = notes.filter((note: Note) =>
    note.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className='mainContainer'>
      <Field style={{ position: 'relative', right: '4%' }}>
        <SearchBox
          style={{ width: '150%' }}
          placeholder='Search for notes..'
          onChange={(e: SearchBoxChangeEvent) =>
            setSearchKeyword((e.target as HTMLInputElement).value)
          }
        />
      </Field>
      <Field>
        <br />
        <AddNewNoteDialog />
      </Field>
      <br />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {filteredNotes.map((note: Note) => (
          <div
            key={note.id}
            style={{ flex: '0 0 300px', marginBottom: '1.5rem' }}
            className='noteCard'
          >
            <NoteCard
              key={note.id}
              title={note.title}
              tags={note.tags ?? []}
              id={note.id}
              body={note.body}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
