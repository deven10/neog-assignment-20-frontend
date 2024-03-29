import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateStudent } from "../../Features/studentSlice";

function MyVerticallyCenteredModal({ show, onHide, student }) {
  const dispatch = useDispatch();
  const [newStudent, setNewStudent] = useState({
    name: student?.name,
    age: student?.age,
    grade: student?.grade,
    gender: student?.gender,
    attendance: student?.attendance,
    marks: student?.marks,
    class: student?.class,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, age, grade, gender, attendance, marks } = newStudent;
    const bool = name && age && grade && gender && attendance && marks;

    if (bool && newStudent.class) {
      // console.log("new student: ", newStudent);
      dispatch(updateStudent({ id: student._id, newStudent }));
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
              value={newStudent.name}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="age">Age: </label>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="Age"
              value={newStudent.age}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="grade">Grade: </label>
            <select value={newStudent.grade} onChange={(e) => handleChange(e)}>
              <option value="">Select Grade</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="gender">Gender: </label>
            <select value={newStudent.gender} onChange={(e) => handleChange(e)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="attendance">Attendance: </label>
            <input
              type="number"
              id="attendance"
              name="attendance"
              placeholder="Attendance"
              value={newStudent.attendance}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="marks">Marks: </label>
            <input
              type="number"
              id="marks"
              name="marks"
              placeholder="Marks"
              value={newStudent.marks}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="class">Class: </label>
            <select value={newStudent.class} onChange={(e) => handleChange(e)}>
              <option value="">Select Class</option>
              <option value="First">First</option>
              <option value="Second">Second</option>
              <option value="Third">Third</option>
              <option value="Fourth">Fourth</option>
            </select>
          </div>

          <button className="btn btn-dark mt-2">Edit Student</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

const EditStudent = ({ student }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button onClick={() => setModalShow(true)} className="custom-btn">
        Edit
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        student={student}
      />
    </>
  );
};

export default EditStudent;
