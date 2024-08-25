

import React, { useState } from 'react';
import { useTodoListContext } from '@/providers/TodoListProvider';

const sortButtons = [
  {
    id: 1,
    text: 'Alphabet',
    handleToggleSort: (setSortAscending, sortAscending, setOptions) => {
      setSortAscending((prevSortAscending) => !prevSortAscending);
      setOptions((options) => ({
        ...options,
        sort: sortAscending ? 'a-z' : 'z-a',
      }));
    }
  },
  {
    id: 2,
    text: 'Creation Date',
    handleToggleSort: (setSortAscending, sortAscending, setOptions) => {
      setSortAscending((prevSortAscending) => !prevSortAscending);
      setOptions((options) => ({
        ...options,
        sort: sortAscending ? '-creation_date_oldest' : 'creation_date_newest',
      }));
    }
  },
  {
    id: 3,
    text: 'Completion Date',
    handleToggleSort: (setSortAscending, sortAscending, setOptions) => {
      setSortAscending((prevSortAscending) => !prevSortAscending);
      setOptions((options) => ({
        ...options,
        sort: sortAscending ? 'completion_date_oldest' : 'completion_date_newest',
      }));
    }
  },
];

const SortButtons = () => {
  const { setOptions } = useTodoListContext();
  const [sortAscending, setSortAscending] = useState(true);

  return (
    <div>
      <span>Sort by:</span>
      {sortButtons.map((button) => (
        <button
          className="w-[150px] py-2 bg-green-100 rounded-lg ml-2 text-green-700 hover:text-green-950"
          onClick={() => button.handleToggleSort(setSortAscending, sortAscending, setOptions)}
          key={button.id}
        >
          {button.text}
        </button>
      ))}
    </div>
  );
};

export default SortButtons;
