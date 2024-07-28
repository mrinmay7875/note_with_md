import {
  Card,
  CardHeader,
  Body1,
  Caption1,
  makeStyles,
  Badge,
} from '@fluentui/react-components';

import './NoteCard.css';
import { Link } from '@tanstack/react-router';

type NoteCardProps = {
  id: string;
  title: string;
  tags: string[];
};

const useStyles = makeStyles({
  card: {
    margin: 'auto',
    width: '300px',
    maxWidth: '300px',
  },
});

export default function NoteCard({ title, tags, id }: NoteCardProps) {
  const styles = useStyles();

  return (
    <div>
      <Card className={styles.card}>
        <CardHeader
          header={
            <Body1>
              <Link to='/notes/$noteId' params={{ noteId: id }}>
                {title}
              </Link>
            </Body1>
          }
          description={<Caption1>Note Content....</Caption1>}
        />
        <div className={'tagsContainer'}>
          {tags.map((tag, index) => (
            <Badge appearance='filled' color='brand' key={index}>
              {tag}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  );
}
