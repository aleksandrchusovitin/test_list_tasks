import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import {
  Modal,
  Form,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { modalSetting } from '../../store/slices/modal';
import { addTask } from '../../store/slices/tasks.js';
import _ from 'lodash';
import * as yup from 'yup';

const AddTask = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleClose = () => {
    dispatch(modalSetting(null));
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: yup.object({
      name: yup.mixed().required('Обязательное поле'),
      description: yup.string('Должно быть строкой').min(6, 'Минимум 6 символов').max(50, 'Максимум 50 символов').required('Обязательное поле'),
    }),
    onSubmit: (values, { resetForm }) => {
      const task = { name: values.name, description: values.description, id: _.uniqueId() };
      dispatch(addTask({ task }));
      resetForm('');

      dispatch(modalSetting(null));
    },
  });

  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Добавить запись</Modal.Title>
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
              isInvalid={formik.errors.name && formik.touched.name}
            />
            <Form.Control.Feedback type="invalid" tooltip>{formik.errors.name}</Form.Control.Feedback>
            <Form.Control 
              className="mb-2"
              name="description"
              as="textarea" 
              placeholder="Добавьте описание" 
              onChange={formik.handleChange}
              value={formik.values.description}
              required
              isInvalid={formik.errors.description && formik.touched.description}
            />
            <Form.Control.Feedback type="invalid" tooltip>{formik.errors.description}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="me-2 btn btn-secondary"
                onClick={handleClose}
              >
                Отменить
              </button>
              <Button type="submit">Добавить</Button>
            </div>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTask;
