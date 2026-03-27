import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getRarePlaces, deleteRarePlace } from "../../../Services/Admin/RarePlacesService";

import DataTable from "react-data-table-component";

import Modal from "../../../Components/Admin/Modal";

import '../../../CSS/Admin/variables.css';
import '../../../CSS/Admin/Common.css';
import '../../../CSS/Admin/RarePlacesPage.css';
import '../../../CSSComponents/Admin/DataTable.css';



export default function RarePlacesPage() {
  const [places, setPlaces] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");


  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);


  const navigate = useNavigate();
  
  async function loadPlaces() {
    const res = await getRarePlaces({
      page,
      limit: rowsPerPage,
      sortBy: sortColumn,
      sortOrder: sortDirection
    });

    console.log(res);

    setPlaces(res.places);
    setTotalRows(res.total);
  }


  useEffect(() => {
    loadPlaces();
  }, [page,rowsPerPage, sortColumn, sortDirection]);


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
      name: "Name",
      selector: row => row.name,
      sortable: true,
      sortField: "name"
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
      name: "Location",
      selector: row => row.location,
      sortField: "location"
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
      name: "Actions",
      cell: row => (
        <div className="actions-cell">
          <button
            className="action-btn edit"
            onClick={() => navigate(`/admin/places/edit/${row._id}`)}
          >
            <i className="fa fa-pen"></i>
          </button>

          <button
            className="action-btn delete"
            onClick={() => {
              setSelectedPlace(row);
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
      await deleteRarePlace(id);

      loadPlaces();
      setShowDeleteModal(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>

      <h1> Rare Places Management </h1>

      <div className="table-container rare-places-table-container">
        <DataTable
          title="RarePlaces"
          columns={columns}
          data={places}
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
            <button className="add-user-btn" onClick={() => navigate("/admin/places/new")}>
              <i className="fa fa-plus"></i>
              Add Rare Place
            </button>
          }

        />
      </div>

      {showDeleteModal && (
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Delete Place"
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
                onClick={() => handleDelete(selectedPlace._id)}
              >
                Delete
              </button>
            </>
          }
        >
          <p>
            Are you sure you want to delete{" "}
            <strong>{selectedPlace?.name}</strong>?
          </p>
        </Modal>
      )}

    </div>

  );
}

