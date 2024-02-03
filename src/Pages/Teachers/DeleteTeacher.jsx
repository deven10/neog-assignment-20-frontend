import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { deleteTeacher } from "../../Features/teacherSlice";

function MyVerticallyCenteredModal({ show, onHide, teacher }) {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Body>
        <form
          onSubmit={handleSubmit}
          className="d-flex w-75 m-auto flex-column justify-content-center align-items-center gap-2"
        >
          <h5>Delete Teacher named "{teacher.name}"?</h5>
          <button
            className="btn btn-dark mt-2"
            onClick={() => dispatch(deleteTeacher(teacher._id))}
          >
            Confirm Delete
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

const DeleteTeacher = ({ teacher }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button onClick={() => setModalShow(true)} className="custom-btn">
        Delete
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        teacher={teacher}
      />
    </>
  );
};

export default DeleteTeacher;
