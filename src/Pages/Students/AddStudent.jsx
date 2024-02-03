import Modal from "react-bootstrap/Modal";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

import { addStudent } from "../../Features/studentSlice";
import { useState } from "react";

function MyVerticallyCenteredModal({ show, onHide }) {
  const dispatch = useDispatch();
  const [student, setStudent] = useState({
    name: "",
    age: "",
    grade: "",
    gender: "",
    attendance: "",
    marks: "",
    class: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, age, grade, gender, attendance, marks } = student;
    const bool = name && age && grade && gender && attendance && marks;
    if (bool && student.class) {
      dispatch(addStudent(student));
      onHide();
      setStudent({
        name: "",
        age: "",
        grade: "",
        gender: "",
        attendance: "",
        marks: "",
        class: "",
      });
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
              value={student.name}
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
              value={student.age}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="grade">Grade: </label>
            <select
              name="grade"
              value={student.grade}
              onChange={(e) => handleChange(e)}
            >
              <option value="">Select Grade</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="gender">Gender: </label>
            <select
              name="gender"
              value={student.gender}
              onChange={(e) => handleChange(e)}
            >
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
              value={student.attendance}
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
              value={student.marks}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="class">Class: </label>
            <select
              name="class"
              value={student.class}
              onChange={(e) => handleChange(e)}
            >
              <option value="">Select Class</option>
              <option value="First">First</option>
              <option value="Second">Second</option>
              <option value="Third">Third</option>
              <option value="Fourth">Fourth</option>
            </select>
          </div>

          <button className="btn btn-dark mt-2">Add New Student</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

const AddStudent = ({}) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button onClick={() => setModalShow(true)} className="custom-btn">
        Add New Student
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default AddStudent;
