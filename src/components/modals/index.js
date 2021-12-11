import AddTask from './AddTask';
import UpdateTask from './UpdateTask';

const modals = {
  addingTask: AddTask,
  updatedTask: UpdateTask,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (modalName) => modals[modalName];
