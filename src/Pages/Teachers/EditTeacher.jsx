import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateTeacher } from "../../Features/teacherSlice";

function MyVerticallyCenteredModal({ show, onHide, teacher }) {
  const dispatch = useDispatch();
  const [newTeacher, setNewTeacher] = useState({
    name: teacher?.name,
    subject: teacher?.subject,
    contact: teacher?.contact,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, subject, contact } = newTeacher;
    const bool = name && subject && contact;

    if (bool) {
      dispatch(updateTeacher({ id: teacher._id, newTeacher }));
      onHide();
    } else {
      toast.error("Fill all the fields!");
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Body>
        <form
          onSubmit={handleSubmit}
          className="d-flex w-75 m-auto flex-column justify-content-center align-items-center gap-2"
        >
          <div className="d-flex flex-column w-100">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={newTeacher.name}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="subject">Subject: </label>
            <select
              name="subject"
              value={newTeacher.subject}
              onChange={(e) => handleChange(e)}
            >
              <option value="">Select Subject</option>
              <option value="Physics">Physics</option>
              <option value="Biology">Biology</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Maths">Maths</option>
              <option value="English">English</option>
            </select>
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="contact">Contact: </label>
            <input
              type="number"
              id="contact"
              name="contact"
              placeholder="Contact"
              value={newTeacher.contact}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <button className="btn btn-dark mt-2">Edit Teacher</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

const EditTeacher = ({ teacher }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button onClick={() => setModalShow(true)} className="custom-btn">
        Edit
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        teacher={teacher}
      />
    </>
  );
};

export default EditTeacher;
