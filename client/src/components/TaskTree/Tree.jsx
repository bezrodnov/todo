import React, { useEffect } from 'react';
import { createStore } from 'redux';
import { Provider, createStoreHook, createDispatchHook, createSelectorHook } from 'react-redux';

import Node from './Node';

const TreeContext = React.createContext(null);

export const useStore = createStoreHook(TreeContext);
export const useDispatch = createDispatchHook(TreeContext);
export const useSelector = createSelectorHook(TreeContext);

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TASK':
      return state;
    default:
      return state;
  }
};

const Tree = ({ task }) => {
  const taskStore = useMemo(() => createStore(reducer, task), [task]);

  return (
    taskStore && (
      <Provider context={TreeContext} store={taskStore}>
        <Node task={task} expanded={true} subtasks={[]} />
      </Provider>
    )
  );
};

export default React.memo(Tree);
