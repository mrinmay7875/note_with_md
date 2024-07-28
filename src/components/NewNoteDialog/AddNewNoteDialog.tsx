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
  Caption1,
} from '@fluentui/react-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../../slice/noteSlice';
import generateId from '../../utils/generateUniqueId';
import { TagsDropdown } from '../TagsDropdown/TagsDropdown';
import Editor from 'react-simple-wysiwyg';
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

  // Tracks whether the Add new note dialog is open or not
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const dispatch = useDispatch();

  const [noteBodyHTML, setNoteBodyHTML] = useState('');

  function onChangeText(e) {
    setNoteBodyHTML(e.target.value);
    console.log('html', noteBodyHTML);
  }
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
    // const noteBody = formData.get('note-body') as string;

    let hasError = false;
    const newErrors = { title: '', body: '' };

    if (!noteTitle.trim()) {
      newErrors.title = 'Note title is required';
      hasError = true;
    }
    if (!noteBodyHTML.trim()) {
      newErrors.body = 'Note body is required';
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      console.log('selectedTags', selectedTags);
      dispatch(
        addNote({
          id: generateId(),
          title: noteTitle,
          body: noteBodyHTML,
          tags: selectedTags,
        })
      );
      setIsDialogOpen(false);

      // Hide the dialog once the Note is updated
    }
  };

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

  return (
    <div>
      <Dialog open={isDialogOpen} modalType='alert'>
        <DialogTrigger disableButtonEnhancement>
          <Button appearance='primary' onClick={() => setIsDialogOpen(true)}>
            Create Note
          </Button>
        </DialogTrigger>
        <DialogSurface aria-describedby={undefined}>
          <form onSubmit={handleSubmit}>
            <DialogBody>
              <DialogTitle>Add New Note</DialogTitle>
              <DialogContent className={styles.content}>
                <Label required htmlFor='note-title'>
                  Title
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
                  Body
                </Label>
                <Field label=''>
                  <Editor
                    style={{ height: '280px' }}
                    value={noteBodyHTML}
                    onChange={onChangeText}
                  />
                </Field>
                <Label htmlFor='note-body'>Tags:</Label>
                <Caption1>
                  💡Tip: Navigate to Tags page to create tags and those will be
                  available here.
                </Caption1>
                <Field label=''>
                  <TagsDropdown
                    setSelectedOptionsFromParent={setSelectedTags}
                  />
                </Field>

                {errors.body && (
                  <span className={styles.errorMessage}>{errors.body}</span>
                )}
              </DialogContent>
              <DialogActions>
                <DialogTrigger disableButtonEnhancement>
                  <Button
                    onClick={() => setIsDialogOpen(false)}
                    appearance='secondary'
                  >
                    Close
                  </Button>
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
