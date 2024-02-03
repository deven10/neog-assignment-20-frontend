import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchStudents } from "../../Features/studentSlice";

const SchoolView = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state?.students);
  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  const data = useMemo(() => {
    const totalStudents = students?.length;
    const avgAttendance = students?.reduce((acc, curr) => {
      return +(acc + curr?.attendance / totalStudents).toFixed(0);
    }, 0);
    const avgMarks = students?.reduce((acc, curr) => {
      return +(acc + curr?.marks / totalStudents).toFixed(0);
    }, 0);
    const bestStudent = students?.reduce((acc, curr) => {
      return acc?.marks > curr?.marks ? acc.name : curr.name;
    }, "");
    console.log({ totalStudents, avgAttendance, avgMarks, bestStudent });
    return { totalStudents, avgAttendance, avgMarks, bestStudent };
  }, [students]);

  return (
    <div>
      <h4>School View</h4>
      <div className="d-flex flex-wrap justify-content-center mt-3 gap-4">
        <div className="card">
          <p className="m-0 title">Total Students</p>{" "}
          <p className="m-0 value">{data?.totalStudents}</p>
        </div>
        <div className="card">
          <p className="m-0 title">AVG Attendance</p>{" "}
          <p className="m-0 value">{data?.avgAttendance}</p>
        </div>
        <div className="card">
          <p className="m-0 title">AVG Marks</p>{" "}
          <p className="m-0 value">{data?.avgMarks}</p>
        </div>
        <div className="card">
          <p className="m-0 title">Best Student</p>{" "}
          <p className="m-0 value">{data?.bestStudent}</p>
        </div>
      </div>
    </div>
  );
};

export default SchoolView;
