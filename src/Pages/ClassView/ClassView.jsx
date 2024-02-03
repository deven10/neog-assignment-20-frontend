import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents } from "../../Features/studentSlice";

const ClassView = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state?.students);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filters, setFilters] = useState({
    class: "",
    gender: "",
    sort: "",
  });

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  useEffect(() => {
    const filterByClass = students.filter((student) =>
      filters.class !== "" ? student.class === filters.class : student
    );

    const filterByGender = filterByClass.filter((student) =>
      filters.gender !== "" ? student.gender === filters.gender : student
    );

    const sortedStudents = filterByGender.sort((a, b) => {
      switch (filters.sort) {
        case "name":
          return a.name.localeCompare(b.name);
        case "age":
          return a.age - b.age;
        case "class":
          return a.class.localeCompare(b.class);
        case "attendance":
          return a.attendance - b.attendance;
        case "marks":
          return a.marks - b.marks;
        default:
          return filterByGender;
      }
    });

    console.log("sortedStudents: ", sortedStudents);
    setFilteredStudents(sortedStudents);
  }, [filters, students]);

  return (
    <div>
      <h4>Class View</h4>
      <div className="d-flex justify-content-start gap-4">
        <select
          value={filters.class}
          onChange={(e) => setFilters({ ...filters, class: e.target.value })}
        >
          <option value="" selected>
            Select a Class
          </option>
          <option value="First">First</option>
          <option value="Second">Second</option>
          <option value="Third">Third</option>
          <option value="Fourth">Fourth</option>
        </select>

        <select
          value={filters.gender}
          onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
        >
          <option value="" selected>
            Select Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <select
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        >
          <option value="" selected>
            Sort Student by...
          </option>
          <option value="name">Name</option>
          <option value="age">Age</option>
          <option value="attendance">Attendance</option>
          <option value="marks">Marks</option>
        </select>
      </div>
      {filteredStudents.length > 0 && (
        <div className="mt-4">
          <h5 className="text-start mb-2">Students</h5>
          <ol>
            {filteredStudents.map((student) => (
              <li className="text-start mb-3" key={student._id}>
                <p className="m-0">Name: {student.name}</p>
                <p className="m-0">Age: {student.age}</p>
                <p className="m-0">Gender: {student.gender}</p>
                <p className="m-0">Class: {student.class}</p>
                <p className="m-0">Attendance: {student.attendance}</p>
                <p className="m-0">Grade: {student.grade}</p>
                <p className="m-0">Marks: {student.marks}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default ClassView;
