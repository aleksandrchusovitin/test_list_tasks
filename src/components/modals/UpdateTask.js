import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import {
  Modal,
  Form,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { modalSetting } from '../../store/slices/modal';
import { updateTask } from '../../store/slices/tasks.js';

const UpdateTask = ({ currendTaskId }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const { tasks: { tasks } } = useSelector((state) => state);
  const { name, description } = tasks.find((t) => t.id === currendTaskId);

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  const handleClose = () => {
    dispatch(modalSetting(null));
  };

  const formik = useFormik({
    initialValues: {
      name,
      description,
    },
    onSubmit: (values, { resetForm }) => {
      const task = { name: values.name, description: values.description, id: currendTaskId };
      dispatch(updateTask({ task }));
      resetForm('');

      dispatch(modalSetting(null));
    },
  });

  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Изменить запись</Modal.Title>
        <button
          aria-label="Close"
          data-bs-dismiss="modal"
          type="button"
          className="btn btn-close"
          onClick={handleClose}
        />
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup className="form-group">
            <FormControl
              placeholder="Название записи" 
              className="mb-2"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              ref={inputRef}
              required
            />
            <Form.Control 
              className="mb-2"
              name="description"
              as="textarea" 
              placeholder="Добавьте описание" 
              onChange={formik.handleChange}
              value={formik.values.description}
              required
            />
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="me-2 btn btn-secondary"
                onClick={handleClose}
              >
                Отменить
              </button>
              <Button type="submit">Изменить</Button>
            </div>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateTask;

