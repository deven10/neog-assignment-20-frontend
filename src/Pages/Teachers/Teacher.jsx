import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";

import SkeletonTable from "../../Templates/SkeletonTable";
import { fetchTeachers } from "../../Features/teacherSlice";
import AddTeacher from "./AddTeacher";
import ReactTable from "../../Templates/Table";
import TeacherDetails from "./TeacherDetails";
import EditTeacher from "./EditTeacher";
import DeleteTeacher from "./DeleteTeacher";

const Teachers = () => {
  const dispatch = useDispatch();
  const { loading, teachers } = useSelector((state) => state?.teachers);

  useEffect(() => {
    dispatch(fetchTeachers());
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
      Header: "Subject",
      accessor: "subject",
    },
    // {
    //   Header: "Contact",
    //   accessor: "contact",
    // },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <div className="d-flex justify-content-center gap-2">
          <TeacherDetails teacher={row.original} />
          <EditTeacher teacher={row.original} />
          <DeleteTeacher teacher={row.original} />
        </div>
      ),
    },
  ];

  const columns = useMemo(() => tableColumns, []);
  const data = useMemo(() => teachers, [teachers]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const columnHeaders = ["Sr no", "Name", "Subject", "Actions"];

  return (
    <div>
      <h4>Teachers</h4>
      <div className="d-flex justify-content-start">
        <AddTeacher />
      </div>
      <div className="w-100 mt-3">
        {loading ? (
          <SkeletonTable columnHeaders={columnHeaders} />
        ) : teachers?.length > 0 ? (
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

export default Teachers;
