import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getUsers, getRolesCount, deleteUser } from "../../../Services/Admin/UsersService";

import DataTable from "react-data-table-component";

import Modal from "../../../Components/Admin/Modal";

import '../../../CSS/Admin/variables.css';
import '../../../CSS/Admin/Common.css';
import '../../../CSS/Admin/UserPage.css';
import '../../../CSSComponents/Admin/DataTable.css';



export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");

  const [tab, setTab] = useState("users");
  const [rolesCount, setRolesCount] = useState({ admins: 0, users: 0 });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);


  const navigate = useNavigate();
  
  async function loadUsers() {
    const res = await getUsers({
      page,
      limit: rowsPerPage,
      role: tab,
      sortBy: sortColumn,
      sortOrder: sortDirection
    });

    console.log(res.users);

    setUsers(res.users);
    setTotalRows(res.total);
  }


  useEffect(() => {
    loadUsers();
  }, [page, tab,rowsPerPage, sortColumn, sortDirection]);

  useEffect(() => {
    async function loadRolesCount() {
      try {
        const data = await getRolesCount();
        setRolesCount(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadRolesCount();
  }, []);

  const columns = [
    {
      name: "Avatar",
      cell: row => (
        <div className="avatar-cell">
          {row.avatar ? (
            <img src={row.avatar} className="avatar-img" alt='avatar' />
          ) : (
            <div className="avatar-fallback">
              {row.gender === "female" ? (
                <img src="/images/unknown_user_female1.jpg" className="avatar-img" alt='female' />
              ) : (
                <img src="/images/unknown_user_male1.jpg" className="avatar-img" alt='male' />
              )
              }
            </div>
          )}
        </div>
      ),
      width: "100px"
    },
    {
      name: "Gender",
      cell: row => (
        <i
          className={`fa ${
            row.gender === "female" ? "fa-venus female-icon" : "fa-mars male-icon"
          }`}
        ></i>
      ),
      width: "100px"
    },
    {
      name: "Name",
      selector: row => row.userName,
      sortable: true,
      sortField: "userName"
    },
    {
      name: "Email",
      selector: row => row.email,
      sortable: true,
      sortField: "email"
    },
    {
      name: "Created",
      selector: row =>
        new Date(row.createdAt).toLocaleString("en-GB", {
          dateStyle: "medium",
          timeStyle: "short"
        }),
      sortable: true,
      sortField: "createdAt",
    },
    {
      name: "Last Updated",
      selector: row =>
        new Date(row.updatedAt).toLocaleString("en-GB", {
          dateStyle: "medium",
          timeStyle: "short"
        }),
      sortable: true,
      sortField: "updatedAt",
    },
    {
      name: "Actions",
      cell: row => (
        <div className="actions-cell">
          <button
            className={`action-btn toggle ${row.active ? "active" : "inactive"}`}
            // onClick={() => handleToggleActive(row)}
          >
            <i className={`fa ${row.active ? "fa-lock-open" : "fa-lock"}`}></i>
          </button>

          <button
            className="action-btn edit"
            onClick={() => navigate(`/admin/users/edit/${row._id}`)}
          >
            <i className="fa fa-pen"></i>
          </button>

          <button
            className="action-btn delete"
            onClick={() => {
              setSelectedUser(row);
              setShowDeleteModal(true);
            }}
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>
      ),
      width: "150px"
    }
  ];

  async function handleDelete(id) {
    try {
      await deleteUser(id);

      loadUsers();
      setShowDeleteModal(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>

      <h1> User Management </h1>
        <div className="tabs">
          <button
            className={`tab ${tab === "users" ? "active" : ""}`}
            onClick={() => { setTab("users"); setPage(1); }}
          >
            Users ({rolesCount['users']})
          </button>

          <button
            className={`tab ${tab === "admins" ? "active" : ""}`}
            onClick={() => { setTab("admins"); setPage(1); }}
          >
            Admins ({rolesCount['admins']})
          </button>
        </div>
    
      

      <div className="table-container">
        <DataTable
          title="Users"
          columns={columns}
          data={users}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangePage={(page) => setPage(page)}
          onChangeRowsPerPage={(newPerPage, page) => {
            setRowsPerPage(newPerPage);
            setPage(1);
          }}
          onSort={(column, sortDirection) => {
            setSortColumn(column.sortField);
            setSortDirection(sortDirection);
          }}
          highlightOnHover
          striped
          actions={
            <button className="add-user-btn" onClick={() => navigate("/admin/users/new")}>
              <i className="fa fa-plus"></i>
              Add User
            </button>
          }

        />
      </div>

      {showDeleteModal && (
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Delete User"
          actions={
            <>
              <button
                className="modal-btn cancel"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>

              <button
                className="modal-btn danger"
                onClick={() => handleDelete(selectedUser._id)}
              >
                Delete
              </button>
            </>
          }
        >
          <p>
            Are you sure you want to delete{" "}
            <strong>{selectedUser?.userName}</strong>?
          </p>
        </Modal>
      )}

    </div>

  );
}

