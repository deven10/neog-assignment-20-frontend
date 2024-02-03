import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { deleteStudent } from "../../Features/studentSlice";

function MyVerticallyCenteredModal({ show, onHide, student }) {
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
          <h5>Delete Student named "{student.name}"?</h5>
          <button
            className="btn btn-dark mt-2"
            onClick={() => dispatch(deleteStudent(student._id))}
          >
            Confirm Delete
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

const DeleteStudent = ({ student }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button onClick={() => setModalShow(true)} className="custom-btn">
        Delete
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        student={student}
      />
    </>
  );
};

export default DeleteStudent;
