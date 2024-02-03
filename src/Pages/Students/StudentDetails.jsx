import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function MyVerticallyCenteredModal({ show, onHide, student }) {
  return (
    <Modal show={show} onHide={onHide} size="sm" centered>
      <Modal.Body className="text-center px-5">
        <div className="d-flex justify-content-start gap-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Name:
          </p>
          <p className="m-0">{student.name}</p>
        </div>
        <div className="d-flex justify-content-start gap-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Age:
          </p>
          <p className="m-0">{student.age} years</p>
        </div>
        <div className="d-flex justify-content-start gap-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Gender:
          </p>
          <p className="m-0">{student.gender}</p>
        </div>
        <div className="d-flex justify-content-start gap-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Grade:
          </p>
          <p className="m-0">{student.grade}</p>
        </div>
        <div className="d-flex justify-content-start gap-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Attendance:
          </p>
          <p className="m-0">{student.attendance}</p>
        </div>
        <div className="d-flex justify-content-start gap-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Marks:
          </p>
          <p className="m-0">{student.marks}</p>
        </div>
        <div className="d-flex justify-content-start gap-2">
          <p className="m-0" style={{ fontWeight: "600" }}>
            Class:
          </p>
          <p className="m-0">{student.class}</p>
        </div>
        <button className="custom-btn mt-3" onClick={onHide}>
          Close
        </button>
      </Modal.Body>
    </Modal>
  );
}

const StudentDetails = ({ student }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button onClick={() => setModalShow(true)} className="custom-btn">
        Details
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        student={student}
      />
    </>
  );
};

export default StudentDetails;
