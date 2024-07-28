import { createLazyFileRoute } from '@tanstack/react-router';
import TagsList from '../components/TagsList/TagsList';

export const Route = createLazyFileRoute('/tags')({
  component: TagsList,
});
