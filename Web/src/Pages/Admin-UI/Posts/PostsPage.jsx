import { useEffect, useState } from "react";
import { getPosts, acceptPost, rejectPost } from "../../../Services/Admin/PostsService";

import DataTable from "react-data-table-component";

import Modal from "../../../Components/Admin/Modal";

import '../../../CSS/Admin/variables.css';
import '../../../CSS/Admin/Common.css';
import '../../../CSS/Admin/PostPage.css';
import '../../../CSSComponents/Admin/DataTable.css';



export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");

  const [tab, setTab] = useState("pending");
  const [typesCount, setTypesCount] = useState({ pending: 0, published: 0, rejected: 0 });

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  
  useEffect(() => {
    loadPosts(page, rowsPerPage);
  }, [page, tab, rowsPerPage, sortColumn, sortDirection]);


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
      name: "Name",
      selector: row => row.userName,
      sortable: true,
      sortField: "userName"
    },
    {
      name: "Image/Video",
      cell: (row) => (
          <div className="media-cell">
          {row.media ? (
              row.mediatype === "image" ? (
              <img
                  src={row.media}
                  className="media-img"
                  alt="media image"
              />
              ) : (
              <video
                  src={row.media}
                  className="media-video"
                  controls
              />
            )
        ) : null}
        </div>
      )
    },
    {
      name: "Description",
      cell: row => (
        <div className="description-cell">
          {row.description}
        </div>
      ),
      width: "200px"
    },
    {
      name: "Location",
      selector: row => row.location,
      sortable: true,
      sortField: "location"
    },
    {
      name: "Comments",
      selector: row => row.countComments,
      sortable: true,
      sortField: "countComments",
      width: "100px"
    },
    {
      name: "Likes",
      selector: row => row.countLikes,
      sortable: true,
      sortField: "countLikes",
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
      name: "Actions",
      cell: row => (
        <div className="actions-cell">
          {row.status === "pending" ? (
            <>
              <button
                className="action-btn accept"
                onClick={() => handleAccept(row._id)}
              >
                <i className="fa fa-check"></i>
              </button>

              <button
                className="action-btn delete"
                onClick={() => {
                  setSelectedPost(row);
                  setShowRejectModal(true);
                }}
              >
                <i className="fa fa-times"></i>
              </button>
            </>
          ) : row.status === "rejected" ? (
            <>
              <button
                className="action-btn accept"
                onClick={() => handleAccept(row._id)}
              >
                <i className="fa fa-check"></i>
              </button>
            </>
          ) : (
            <>
              <button
                className="action-btn delete"
                onClick={() => {
                  setSelectedPost(row);
                  setShowRejectModal(true);
                }}
              >
                <i className="fa fa-times"></i>
              </button>
            </>
          )}

          <button
            className="action-btn view"
            onClick={() => {
              setSelectedPost(row);
              setShowDetailModal(true);
            }}
          >
            <i className="fa fa-eye"></i>
          </button>
        </div>
      ),
      width: "150px"
    }
  ];

  async function handleReject(id) {
    try {
      await rejectPost(id);
      loadPosts();
      setShowRejectModal(false);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAccept(id) {
    try {
      await acceptPost(id);
      loadPosts();
    } catch (err) {
      console.error(err);
    }
  }

  async function loadPosts(currentPage = page, limit = rowsPerPage) {
    try {
      const res = await getPosts({
        page: currentPage,
        limit: limit,
        status: tab,
        sortBy: sortColumn,
        sortOrder: sortDirection
      });

      setPosts(res.posts);
      setTotalRows(res.total);
      setTypesCount(res.count);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>

      <h1> Posts Management </h1>
        <div className="tabs">
          <button
            className={`tab ${tab === "pending" ? "active" : ""}`}
            onClick={() => { setTab("pending"); setPage(1); }}
          >
            Pending ({typesCount['pending']})
          </button>

          <button
            className={`tab ${tab === "published" ? "active" : ""}`}
            onClick={() => { setTab("published"); setPage(1); }}
          >
            Published ({typesCount['published']})
          </button>

          <button
            className={`tab ${tab === "rejected" ? "active" : ""}`}
            onClick={() => { setTab("rejected"); setPage(1); }}
          >
            Rejected ({typesCount['rejected']})
          </button>
        </div>
    
      

      <div className="table-container posts-table-container">
        <DataTable
          title="Posts"
          columns={columns}
          data={posts}
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
        />
      </div>

      {showRejectModal && (
        <Modal
          isOpen={showRejectModal}
          onClose={() => setShowRejectModal(false)}
          title="Reject Post"
          actions={
            <>
              <button
                className="modal-btn cancel"
                onClick={() => setShowRejectModal(false)}
              >
                Cancel
              </button>

              <button
                className="modal-btn danger"
                onClick={() => handleReject(selectedPost._id)}
              >
                Reject
              </button>
            </>
          }
        >
          <p>Are you sure you want to reject this post?</p>
        </Modal>
      )}

      {showDetailModal && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title="View Post"
          actions={
            <>
              <button
                className="modal-btn accept"
              onClick={() => handleAccept(selectedPost._id)}
              >
                Accept
              </button>
              <button
                className="modal-btn danger"
                onClick={() => handleReject(selectedPost._id)}
              >
                Delete
              </button>
            </>
          }
        >
          <p>{selectedPost.description}</p>
        </Modal>
      )}

    </div>

  );
}

