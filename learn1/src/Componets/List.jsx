import { useDispatch } from 'react-redux';
import { removeBookmarks } from '../redux/slice/bookmarkSlice';
import { Text, Menu, Divider } from '@mantine/core';
import { EllipsisVertical, Trash } from 'lucide-react';

const List = ({ items = [], type = 'bookmark' }) => {
  const dispatch = useDispatch();

  const handleDelete = (articleUrl) => {
    if (type === 'bookmark') {
      dispatch(removeBookmarks(articleUrl));
    }
  };

  if (!items.length) {
    return (
      <Text size="sm" color="dimmed" className="italic">
        No {type === 'bookmark' ? 'bookmarks' : 'reading history'} found.
      </Text>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.url}>
          <div className="flex justify-between items-start">
            <a
              href={item.url}
              className="flex-1 p-2 hover:underline transition-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.title}
            </a>

            {type === 'bookmark' && (
              <Menu>
                <Menu.Target>
                  <EllipsisVertical
                    className="cursor-pointer mt-1"
                    size={18}
                    aria-label="Options"
                  />
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    color="red"
                    leftSection={<Trash size={16} />}
                    onClick={() => handleDelete(item.url)}
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </div>
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default List;
