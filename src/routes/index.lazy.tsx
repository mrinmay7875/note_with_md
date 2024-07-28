import { createLazyFileRoute } from '@tanstack/react-router';
import NoteCard from '../components/NoteCard/NoteCard';
import { Field, SearchBox } from '@fluentui/react-components';
import './Home.css';
import AddNewNoteDialog from '../components/NewNoteDialog/AddNewNoteDialog';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../slice/counterSlice';
import store from '../store/store';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const count = useSelector((state: any) => state.counter.value);
  const notes = useSelector((state: any) => state.notes);
  console.log('notes', notes);

  store.subscribe(() => {
    console.log(store.getState());
  });

  const dispatch = useDispatch();
  return (
    <div className='mainContainer'>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <Field className='m-50'>
        {/* TODO:  Increase the width of the search box */}
        <SearchBox placeholder='Search for notes..' />
      </Field>
      <Field>
        <br />
        <AddNewNoteDialog />
      </Field>
      <h3>This is the Index page where we will all the notes</h3>
      <NoteCard title='Note 1' tags={['tag1', 'tag2']} />
    </div>
  );
}
