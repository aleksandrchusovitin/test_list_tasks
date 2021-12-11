import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Button } from "react-bootstrap";
import {
  removeTask,
} from '../../store/slices/tasks';
import { modalSetting } from '../../store/slices/modal';
import getModal from '../modals';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const [currendTaskId, setCurrentTaskId] = useState(null);
  const dispatch = useDispatch();
  const { modal: { modal },tasks: { tasks } } = useSelector((state) => state);

  const handleRemoveTask = (id) => () => {
    dispatch(removeTask({ id }));
  };

  const handleUpdateTask = (id, action) => () => {
    setCurrentTaskId(id);
    dispatch(modalSetting(action));
  };

  const handleAddTask = (action) => () => {
    dispatch(modalSetting(action));
  };

  const renderTasks = (tasks) => {
    const taskList = tasks.map(({ id, name }) => (
      <Link key={id} to={`/desc/${id}`}>
        <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 border-end-0">{name}
          <div>
            <Button type="button" variant="outline-warning" onClick={handleUpdateTask(id, 'updatedTask')}>Изменить запись</Button>
            <Button type="button" variant="outline-danger" onClick={handleRemoveTask(id)}>Удалить запись</Button>
          </div>
        </ListGroup.Item>
      </Link>
    ));
    return (
      <ListGroup className="mb-4">{taskList}</ListGroup>
    );
  };
  
  const getModalContent = (modalState) => {
    if (modalState === null) {
      return null;
    }
    const Modal = getModal(modalState);

    return <Modal currendTaskId={currendTaskId} />;
  };

  return (
    <div className="d-flex flex-column h-100 mt-3">
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6 mb-4">
            {renderTasks(tasks)}
            <Button type="button" variant="outline-primary" onClick={handleAddTask('addingTask')}>Добавить запись</Button>
          </div>
        </div>
      </div>
      {getModalContent(modal)}
    </div>
  );
};

export default MainPage;
