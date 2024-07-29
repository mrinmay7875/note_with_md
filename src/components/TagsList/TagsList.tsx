import { useSelector, useDispatch } from 'react-redux';
import { Tag } from '../../types/type';
import { addTag, deleteTag } from '../../slice/tagsSlice';
import { Button, Input } from '@fluentui/react-components';
import generateId from '../../utils/generateUniqueId';
import { RootState } from '../../store/store';

const TagsList = () => {
  const tags = useSelector((state: RootState) => state.tags);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteTag({ id }));
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget as HTMLFormElement);
    const tagName = formData.get('tag-name') as string;
    // Prevent users from adding duplicate tag names
    const foundTag = tags.find((tag) => tag.name === tagName);
    if (foundTag) {
      alert('Tag already exists');
      return;
    }
    if (!tagName) return;
    dispatch(addTag({ name: tagName, id: generateId() }));
  };

  return (
    <div>
      <h1>Tags List</h1>
      <form onSubmit={handleSubmit}>
        <Input type='text' placeholder='Add new tag' name='tag-name' />
        <br />
        <br />
        <Button appearance='primary' type='submit'>
          Add new tag
        </Button>
      </form>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>Tag Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag: Tag) => (
            <tr key={tag.id}>
              <td>{tag.name}</td>
              <td>
                <button onClick={() => handleDelete(tag.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TagsList;
