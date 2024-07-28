import React, { useState } from 'react';
import { Link, redirect, useNavigate, useParams } from '@tanstack/react-router';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  CardHeader,
  CardPreview,
  Text,
  Title1,
  Body1,
  Label,
  makeStyles,
  shorthands,
  tokens,
  Badge,
  Button,
  Input,
  Textarea,
} from '@fluentui/react-components';

import { EditRegular, DeleteRegular, SaveRegular } from '@fluentui/react-icons';
import { deleteNote, updateNote } from '../../slice/noteSlice';

const useStyles = makeStyles({
  card: {
    ...shorthands.margin('auto'),
    maxWidth: '80%',
    ...shorthands.padding('20px'),
    boxShadow: tokens.shadow4,
  },
  header: {
    marginBottom: '16px',
  },
  body: {
    marginTop: '16px',
    width: '100%',
  },
  tagSection: {
    marginTop: '16px',
  },
  tag: {
    marginRight: '8px',
    marginBottom: '8px',
  },
  editableInput: {
    width: '100%',
    marginBottom: '16px',
  },
});

const NoteDetail = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetching the noteID from route params
  const noteId = useParams({
    from: '/notes/$noteId',
    select: (params) => params.noteId,
  });

  // FIXME: Remove any and resolve TS errors
  const notes = useSelector((state: any) => state.notes);
  const note = notes.find((note: any) => note.id === noteId);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note?.title || '');
  const [editedBody, setEditedBody] = useState(note?.body || '');

  if (!note) {
    return (
      <Card className={styles.card}>
        <Text>Note not found</Text>
      </Card>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Dispatch an action to update the note in your Redux store
    dispatch(updateNote({ id: noteId, title: editedTitle, body: editedBody }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    // Dispatch an action to delete the note from your Redux store
    if (confirm('Are you sure you want to delete this note ?') == true) {
      // text = 'You pressed OK!';
      dispatch(
        deleteNote({ id: noteId, title: editedTitle, body: editedBody })
      );
      // TODO: Redirect to notes list once the Note is deleted
      navigate({ to: '/' });
    }
  };

  return (
    <div>
      <Card className={styles.card}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <CardHeader
            header={
              isEditing ? (
                <Input
                  size='medium'
                  className={styles.editableInput}
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              ) : (
                <Title1 className={styles.header}>{note.title}</Title1>
              )
            }
          />
          <div>
            {isEditing ? (
              <Button
                appearance='primary'
                icon={<SaveRegular />}
                onClick={handleSave}
              >
                Save
              </Button>
            ) : (
              <Button
                appearance='primary'
                icon={<EditRegular />}
                onClick={handleEdit}
              >
                Edit
              </Button>
            )}
            <Button
              style={{ marginLeft: '8px' }}
              appearance='primary'
              icon={<DeleteRegular />}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </div>

        <CardPreview>
          <div className={styles.tagSection}>
            <Label>Tags: </Label>
            {note.tags && note.tags.length > 0 ? (
              note.tags.map((tag: string, index: number) => (
                <Badge
                  key={index}
                  className={styles.tag}
                  appearance='filled'
                  color='brand'
                >
                  {tag}
                </Badge>
              ))
            ) : (
              <Text>No tags</Text>
            )}
          </div>
        </CardPreview>
        {isEditing ? (
          <Textarea
            className={styles.body}
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
          />
        ) : (
          <Body1 className={styles.body}>{note.body}</Body1>
        )}
      </Card>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}
      >
        <Link to='/'>Home</Link>
      </div>
    </div>
  );
};

export default NoteDetail;
