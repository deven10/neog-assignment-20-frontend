import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";

import SkeletonTable from "../../Templates/SkeletonTable";
import { fetchStudents } from "../../Features/studentSlice";
import AddStudent from "./AddStudent";
import ReactTable from "../../Templates/Table";
import StudentDetails from "./StudentDetails";
import EditStudent from "./EditStudent";
import DeleteStudent from "./DeleteStudent";

const Students = () => {
  const dispatch = useDispatch();
  const { loading, students } = useSelector((state) => state?.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  const tableColumns = [
    {
      Header: "Sr no.",
      accessor: "job_id",
      Cell: ({ row }) => row.index + 1,
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Age",
      accessor: "age",
    },
    {
      Header: "Gender",
      accessor: "gender",
    },
    {
      Header: "Class",
      accessor: "class",
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <div className="d-flex justify-content-center gap-2">
          <StudentDetails student={row.original} />
          <EditStudent student={row.original} />
          <DeleteStudent student={row.original} />
        </div>
      ),
    },
  ];

  const columns = useMemo(() => tableColumns, []);
  const data = useMemo(() => students, [students]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const columnHeaders = ["Sr no", "Name", "Age", "Gender", "Class", "Actions"];

  return (
    <div>
      <h4>Students</h4>
      <div className="d-flex justify-content-start">
        <AddStudent />
      </div>
      <div className="w-100 mt-3">
        {loading ? (
          <SkeletonTable columnHeaders={columnHeaders} />
        ) : students?.length > 0 ? (
          <>
            <ReactTable tableInstance={tableInstance} />
          </>
        ) : (
          <p className="mt-4 fs-5 text-start">No data found!</p>
        )}
      </div>
    </div>
  );
};

export default Students;
