import { useParams } from '@tanstack/react-router';
import { useSelector } from 'react-redux';
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
} from '@fluentui/react-components';

import { EditRegular, DeleteRegular } from '@fluentui/react-icons';

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
  },
  tagSection: {
    marginTop: '16px',
  },
  tag: {
    marginRight: '8px',
    marginBottom: '8px',
  },
});

const NoteDetail = () => {
  const styles = useStyles();

  // Fetching the noteID from route params
  const noteId = useParams({
    from: '/notes/$noteId',
    select: (params) => params.noteId,
  });

  const notes = useSelector((state: any) => state.notes);
  const note = notes.find((note: any) => note.id === noteId);

  if (!note) {
    return (
      <Card className={styles.card}>
        <Text>Note not found</Text>
      </Card>
    );
  }

  return (
    <Card className={styles.card}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <CardHeader
          header={<Title1 className={styles.header}>{note.title}</Title1>}
        />
        <div>
          <Button appearance='primary' icon={<EditRegular />}>
            Edit
          </Button>
          <Button
            style={{ marginLeft: '8px' }}
            appearance='primary'
            icon={<DeleteRegular />}
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
      <Body1 className={styles.body}>{note.body}</Body1>
    </Card>
  );
};

export default NoteDetail;
