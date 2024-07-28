import { useSelector } from 'react-redux';
// import store from '../../store/store';
import { Tag } from '../../types/type';

const TagsList = () => {
  const tags = useSelector((state: any) => state.tags);

  return (
    <div>
      Hey!TagsList Page
      {tags.map((tag: Tag) => (
        <div key={tag.id}>{tag.name}</div>
      ))}
    </div>
  );
};

export default TagsList;
