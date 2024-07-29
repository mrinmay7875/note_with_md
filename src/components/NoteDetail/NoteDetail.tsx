import { useState } from 'react';
import { Link, useNavigate, useParams } from '@tanstack/react-router';
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
} from '@fluentui/react-components';
import { EditRegular, DeleteRegular, SaveRegular } from '@fluentui/react-icons';
import { deleteNote, updateNote } from '../../slice/noteSlice';
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from 'react-simple-wysiwyg';
import { RICHTEXT_EDITOR_HEIGHT_IN_PX_FOR_EDIT_NOTE } from '../../config/config';

const useStyles = makeStyles({
  card: {
    ...shorthands.margin('auto'),
    maxWidth: '90%',
    ...shorthands.padding('20px'),
    boxShadow: tokens.shadow4,
    '@media (max-width: 600px)': {
      maxWidth: '100%',
      padding: '10px',
    },
  },
  header: {
    marginBottom: '16px',
    '@media (max-width: 600px)': {
      fontSize: '1.5rem',
    },
  },
  body: {
    marginTop: '16px',
    width: '100%',
  },
  tagSection: {
    marginTop: '16px',
    flexWrap: 'wrap',
    display: 'flex',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
    },
  },
  tag: {
    marginRight: '8px',
    marginBottom: '8px',
  },
  editableInput: {
    width: '100%',
    marginBottom: '16px',
  },
  editorContainer: {
    '@media (max-width: 600px)': {
      height: `${RICHTEXT_EDITOR_HEIGHT_IN_PX_FOR_EDIT_NOTE / 1.5}px`,
    },
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    '@media (max-width: 300px)': {
      flexDirection: 'column',
    },
  },
});

import type { RootState } from '../../store/store';
import { Note } from '../../types/type';
import { PDFExport } from '../PDFExport';
import { PDFDownloadLink } from '@react-pdf/renderer';

const NoteDetail = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetching the noteID from route params
  const noteId = useParams({
    from: '/notes/$noteId',
    select: (params) => params.noteId,
  });

  const notes = useSelector((state: RootState) => state.notes);
  const note = notes.find((n: Note) => n.id === noteId) as Note | undefined;

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState<string>(note?.title || '');
  const [editedBody, setEditedBody] = useState<string>(note?.body || '');

  let pdfFileName = note?.title.slice(0, 10) + '.pdf';

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
    if (confirm('Are you sure you want to delete this note?')) {
      dispatch(
        deleteNote({ id: noteId, title: editedTitle, body: editedBody })
      );
      navigate({ to: '/' });
    }
  };

  return (
    <div>
      <Card className={styles.card}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '16px',
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
          <div className={styles.buttonGroup}>
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
          <EditorProvider>
            <Editor
              className={styles.editorContainer}
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
            >
              <Toolbar>
                <BtnUndo />
                <BtnRedo />
                <Separator />
                <BtnBold />
                <BtnItalic />
                <BtnUnderline />
                <BtnStrikeThrough />
                <Separator />
                <BtnNumberedList />
                <BtnBulletList />
                <Separator />
                <BtnLink />
                <BtnClearFormatting />
                <HtmlButton />
                <Separator />
                <BtnStyles />
              </Toolbar>
            </Editor>
          </EditorProvider>
        ) : (
          <Body1>
            <div dangerouslySetInnerHTML={{ __html: note.body }} />
          </Body1>
        )}
      </Card>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '16px',
          fontSize: '1.1rem',
        }}
      >
        <Link to='/'>Home</Link>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '16px',
          fontSize: '1.1rem',
        }}
      >
        <PDFDownloadLink
          document={<PDFExport content={note.body} />}
          fileName={pdfFileName}
        >
          {({ loading }) => (loading ? 'Loading document...' : 'Download now!')}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default NoteDetail;
