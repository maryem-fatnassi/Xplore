import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getChallenges, deleteChallenge } from "../../../Services/Admin/ChallengesService";

import DataTable from "react-data-table-component";

import Modal from "../../../Components/Admin/Modal";

import '../../../CSS/Admin/variables.css';
import '../../../CSS/Admin/Common.css';
import '../../../CSS/Admin/ChallengesPage.css';
import '../../../CSSComponents/Admin/DataTable.css';



export default function ChallengesPage() {
  const [challenges, setChallenges] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");

  const [tab, setTab] = useState("easy");
  const [difficultyCount, setDifficultyCount] = useState({ easy: 0, medium: 0, hard: 0, extreme: 0});

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);


  const navigate = useNavigate();
  
  async function loadChallenges() {
    const res = await getChallenges({
      page,
      limit: rowsPerPage,
      difficulty: tab,
      sortBy: sortColumn,
      sortOrder: sortDirection
    });

    console.log(res);

    setChallenges(res.challenges);
    setTotalRows(res.total);
    setDifficultyCount(res.count);
  }


  useEffect(() => {
    loadChallenges();
  }, [page, tab,rowsPerPage, sortColumn, sortDirection]);


  const columns = [
    {
      name: "Image",
      cell: (row) => (
          <div className="media-cell">
          {row.image ? (
              <img
                  src={row.image}
                  className="media-img"
                  alt="media image"
              />
              ) : null}
        </div>
      )
    },
    {
      name: "Title",
      selector: row => row.title,
      sortable: true,
      sortField: "title"
    },
    {
      name: "Description",
      cell: row => (
        <div className="description-cell">
          {row.desc}
        </div>
      ),
      width: "200px"
    },
    {
      name: "Duration",
      selector: row => row.duration,
      sortField: "duration"
    },
    {
      name: "Type",
      selector: row => row.type,
      sortable: true,
      sortField: "type",
      width: "100px"
    },
    {
      name: "Joined Users",
      selector: row => row.countUsers,
      sortable: true,
      sortField: "countUsers",
      width: "100px"
    },
    {
      name: "Created",
      selector: row =>
        new Date(row.createdAt).toLocaleString("en-GB", {
          dateStyle: "medium",
          timeStyle: "short"
        }),
      sortable: true,
      sortField: "createdAt"
    },
    {
      name: "Last Updated",
      selector: row =>
        new Date(row.updatedAt).toLocaleString("en-GB", {
          dateStyle: "medium",
          timeStyle: "short"
        }),
      sortable: true,
      sortField: "updatedAt"
    },
    {
      name: "Equipements",
      selector: row => row.countEquipment,
      sortable: true,
      sortField: "countEquipment",
      width: "100px"
    },
    {
      name: "Rules",
      selector: row => row.countRules,
      sortable: true,
      sortField: "countRules",
      width: "100px"
    },
    {
      name: "Actions",
      cell: row => (
        <div className="actions-cell">
          <button
            className="action-btn edit"
            onClick={() => navigate(`/admin/challenges/edit/${row._id}`)}
          >
            <i className="fa fa-pen"></i>
          </button>

          <button
            className="action-btn delete"
            onClick={() => {
              setSelectedChallenge(row);
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
      await deleteChallenge(id);

      loadChallenges();
      setShowDeleteModal(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>

      <h1> Challenges Management </h1>
        <div className="tabs">
          <button
            className={`tab ${tab === "easy" ? "active" : ""}`}
            onClick={() => { setTab("easy"); setPage(1); }}
          >
            Easy ({difficultyCount['easy']})
          </button>

          <button
            className={`tab ${tab === "medium" ? "active" : ""}`}
            onClick={() => { setTab("medium"); setPage(1); }}
          >
            Medium ({difficultyCount['medium']})
          </button>

          <button
            className={`tab ${tab === "hard" ? "active" : ""}`}
            onClick={() => { setTab("hard"); setPage(1); }}
          >
            Hard ({difficultyCount['hard']})
          </button>

          <button
            className={`tab ${tab === "extreme" ? "active" : ""}`}
            onClick={() => { setTab("extreme"); setPage(1); }}
          >
            Extreme ({difficultyCount['extreme']})
          </button>
        </div>
    
      

      <div className="table-container challenges-table-container">
        <DataTable
          title="Challenges"
          columns={columns}
          data={challenges}
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
            <button className="add-user-btn" onClick={() => navigate("/admin/challenges/new")}>
              <i className="fa fa-plus"></i>
              Add Challenge
            </button>
          }

        />
      </div>

      {showDeleteModal && (
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Delete Challenge"
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
                onClick={() => handleDelete(selectedChallenge._id)}
              >
                Delete
              </button>
            </>
          }
        >
          <p>
            Are you sure you want to delete{" "}
            <strong>{selectedChallenge?.userName}</strong>?
          </p>
        </Modal>
      )}

    </div>

  );
}

