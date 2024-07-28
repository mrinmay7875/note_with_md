import {
  Dialog,
  DialogTrigger,
  Button,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  Label,
  Input,
  DialogActions,
  makeStyles,
  Field,
  Textarea,
} from '@fluentui/react-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../../slice/noteSlice';
import store from '../../store/store';

const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
  },
  errorMessage: {
    color: 'red',
    fontSize: '12px',
  },
});

// TODO:  Errors need to be displayed for all the cases like for blank spaces as well.

export default function NewNoteDialog() {
  const styles = useStyles();
  const [errors, setErrors] = useState({ title: '', body: '' });

  const dispatch = useDispatch();
  /**
   * Handles the form submission event.
   * Validates the note title and body fields, and displays error messages if they are empty.
   * If the form is valid, displays an alert with the note title and body.
   *
   * @param {React.FormEvent} ev - The form submission event.
   */
  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget as HTMLFormElement);
    const noteTitle = formData.get('note-title') as string;
    const noteBody = formData.get('note-body') as string;

    let hasError = false;
    const newErrors = { title: '', body: '' };

    if (!noteTitle.trim()) {
      newErrors.title = 'Note title is required';
      hasError = true;
    }
    if (!noteBody.trim()) {
      newErrors.body = 'Note body is required';
      hasError = true;
    }

    setErrors(newErrors);

    // TODO: Store the Note in Redux Store
    if (!hasError) {
      dispatch(
        addNote({
          id: Date.now().toString(),
          title: noteTitle,
          body: noteBody,
        })
      );
    }
  };

  store.subscribe(() => {
    console.log('store inside AddNewDialog', store.getState());
  });

  /**
   * Handles the change event of the title input field.
   * Clears the error message for the title field if it exists.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} ev - The change event object.
   * @return {void} This function does not return anything.
   */
  const handleTitleChange = () => {
    if (errors.title) {
      setErrors((prevErrors) => ({ ...prevErrors, title: '' }));
    }
  };

  /**
   * Handles the change event of the body textarea element.
   * Clears the error message for the body field if it exists.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement>} ev - The change event object.
   * @return {void} This function does not return anything.
   */
  const handleBodyChange = () => {
    if (errors.body) {
      setErrors((prevErrors) => ({ ...prevErrors, body: '' }));
    }
  };

  return (
    <div>
      <Dialog modalType='non-modal'>
        <DialogTrigger disableButtonEnhancement>
          <Button appearance='primary'>Create Note</Button>
        </DialogTrigger>
        <DialogSurface aria-describedby={undefined}>
          <form onSubmit={handleSubmit}>
            <DialogBody>
              <DialogTitle>Add New Note</DialogTitle>
              <DialogContent className={styles.content}>
                <Label required htmlFor='note-title'>
                  Note title
                </Label>
                <Input
                  required
                  type='text'
                  id='note-title'
                  name='note-title'
                  onChange={handleTitleChange}
                />
                {errors.title && (
                  <span className={styles.errorMessage}>{errors.title}</span>
                )}
                <Label required htmlFor='note-body'>
                  Note Body
                </Label>
                <Field label=''>
                  <Textarea
                    size='large'
                    resize='vertical'
                    id='note-body'
                    name='note-body'
                    onChange={handleBodyChange}
                  />
                </Field>
                {errors.body && (
                  <span className={styles.errorMessage}>{errors.body}</span>
                )}
              </DialogContent>
              <DialogActions>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance='secondary'>Close</Button>
                </DialogTrigger>
                <Button type='submit' appearance='primary'>
                  Save
                </Button>
              </DialogActions>
            </DialogBody>
          </form>
        </DialogSurface>
      </Dialog>
    </div>
  );
}
