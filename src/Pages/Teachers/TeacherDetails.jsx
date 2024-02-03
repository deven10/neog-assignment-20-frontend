import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function MyVerticallyCenteredModal({ show, onHide, teacher }) {
  return (
    <Modal show={show} onHide={onHide} size="sm" centered>
      <Modal.Body className="text-center px-5">
        <div className="d-flex justify-content-start gap-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Name:
          </p>
          <p className="m-0">{teacher.name}</p>
        </div>
        <div className="d-flex justify-content-start gap-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Subject:
          </p>
          <p className="m-0">{teacher.subject}</p>
        </div>
        <div className="d-flex justify-content-start gap-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Contact:
          </p>
          <p className="m-0">{teacher.contact}</p>
        </div>
        <button className="custom-btn mt-3" onClick={onHide}>
          Close
        </button>
      </Modal.Body>
    </Modal>
  );
}

const TeacherDetails = ({ teacher }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button onClick={() => setModalShow(true)} className="custom-btn">
        Details
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        teacher={teacher}
      />
    </>
  );
};

export default TeacherDetails;
