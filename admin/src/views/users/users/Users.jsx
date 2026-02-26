import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { FiTrash } from "react-icons/fi";
import { FaUserCheck, FaUserTimes } from "react-icons/fa";
import ViewUser from "./ViewUser";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
import BlockUserModal from "./BlockUserModal";
import UserDashboard from "./UserDashboard";
import UserTabs from "./UserTabs";
import Pagination from "../../../components/shared/Pagination";
import { customModalStyles } from "../../../components/shared/modalStyles";

// const Users = () => {
//   const dispatch = useDispatch();
//   const [isView, setIsView] = useState(false);
//   const [isEdit, setIsEdit] = useState(false);
//   const [isDelete, setIsDelete] = useState(false);
//   const [isBlock, setIsBlock] = useState(false);
//   const [modifyUser, setModifyUser] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [parPage, setParPage] = useState(20);
//   const [search, setSearch] = useState("");
//   const [blocked, setBlocked] = useState("All");
//   const [searchField, setSearchField] = useState("username");
//   const [sort, setSort] = useState("-createdAt");
//   const [sortValue, setSortValue] = useState({
//     sortBy: "createdAt",
//     order: "desc",
//   });

//   const { users, totalUsers, userStats, userSummary, recentUsers, isLoading } =
//     useSelector((state) => state.users);
//   const sortOptions = ["createdAt", "username", "fullname"];

//   useEffect(() => {
//     const obj = {
//       limit: parseInt(parPage),
//       page: parseInt(pageNumber),
//       sort,
//       search,
//       searchField,
//       blocked,
//     };
//     dispatch(getAllUsers(obj));
//     dispatch(getUserStats());
//     dispatch(getUserSummary());
//   }, [dispatch, pageNumber, parPage, sort, search, searchField, blocked]);

//   // Listen for block filter toggle event
//   useEffect(() => {
//     const handleToggleBlockFilter = () => {
//       setBlocked((prev) => {
//         if (prev === "All") return "false";
//         if (prev === "false") return "true";
//         return "All";
//       });
//     };

//     window.addEventListener("toggleBlockFilter", handleToggleBlockFilter);

//     return () => {
//       window.removeEventListener("toggleBlockFilter", handleToggleBlockFilter);
//     };
//   }, []);

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const mockUsers = [
  {
    id: 1,
    username: "john",
    fullname: "John Doe",
    email: "john@example.com",
    isBlocked: false,
    status: "active",
    joined: "2026-02-01T00:00:00.000Z",
  },
  {
    id: 2,
    username: "jane",
    fullname: "Jane Smith",
    email: "jane@example.com",
    isBlocked: false,
    status: "active",
    joined: "2026-02-10T00:00:00.000Z",
  },
  {
    id: 3,
    username: "blockeduser",
    fullname: "Blocked User",
    email: "blockeduser@example.com",
    isBlocked: true,
    status: "blocked",
    joined: "2026-01-15T00:00:00.000Z",
  },
  {
    id: 4,
    username: "goldmember",
    fullname: "Gold Member",
    email: "goldmember@example.com",
    isBlocked: false,
    status: "active",
    joined: "2026-02-20T00:00:00.000Z",
  },
  {
    id: 5,
    username: "trialuser",
    fullname: "Trial User",
    email: "trialuser@example.com",
    isBlocked: false,
    status: "active",
    joined: "2026-02-25T00:00:00.000Z",
  },
];

const Users = () => {
  // Use mock data only
  const [users, setUsers] = useState(mockUsers);
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isBlock, setIsBlock] = useState(false);
  const [modifyUser, setModifyUser] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [parPage, setParPage] = useState(20);
  const [search, setSearch] = useState("");
  const [blocked, setBlocked] = useState("All");
  const [searchField, setSearchField] = useState("username");
  const [sort, setSort] = useState("-createdAt");
  const [sortValue, setSortValue] = useState({
    sortBy: "createdAt",
    order: "desc",
  });
  const isLoading = false;
  const sortOptions = ["createdAt", "username", "fullname"];

  // All handlers operate on mock data
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    // Filter mock users
    setUsers(
      mockUsers.filter((user) =>
        user.username.toLowerCase().includes(e.target.value.toLowerCase()),
      ),
    );
  };

  const handleSort = () => {
    // Sort mock users
    setUsers(
      [...users].sort((a, b) =>
        sortValue.order === "desc"
          ? b[sortValue.sortBy].localeCompare(a[sortValue.sortBy])
          : a[sortValue.sortBy].localeCompare(b[sortValue.sortBy]),
      ),
    );
  };

  const handleView = (user) => {
    setModifyUser(user);
    setIsView(true);
  };

  const handleEdit = (user) => {
    setModifyUser(user);
    setIsEdit(true);
  };

  const handleDelete = (user) => {
    setModifyUser(user);
    setIsDelete(true);
  };

  const handleBlock = (user) => {
    setModifyUser(user);
    setIsBlock(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* User Dashboard */}
      {/* {userStats && <UserDashboard stats={userStats} />} */}

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 relative flex items-center">
            <input
              type="text"
              placeholder="Search users..."
              onKeyDown={handleSearchChange}
              className="w-full pl-4 pr-32 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
            />
            <div className="absolute right-1 top-1 bottom-1">
              <select
                onChange={(e) => setSearchField(e.target.value)}
                className="h-full px-3 rounded-md border-0 bg-transparent text-gray-500 dark:text-gray-400 focus:ring-0"
              >
                <option value="username">Username</option>
                <option value="fullname">Full Name</option>
                <option value="email">Email</option>
                <option value="mobile">Mobile</option>
              </select>
            </div>
          </div>

          <div className="h-8 w-px bg-gray-300 dark:bg-gray-600"></div>

          <div className="flex items-center gap-2">
            <select
              onChange={(e) =>
                setSortValue({ ...sortValue, sortBy: e.target.value })
              }
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              onChange={(e) =>
                setSortValue({ ...sortValue, order: e.target.value })
              }
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
            <button
              onClick={handleSort}
              className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors"
            >
              Sort
            </button>
          </div>
        </div>
      </div>

      {/* User Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <UserTabs
          users={users}
          isLoading={isLoading}
          handleView={handleView}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleBlock={handleBlock}
          showPagination={false}
        />
      </div>

      {/* Pagination */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <Pagination
          totalItems={users.length}
          parPage={parPage}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          showItem={5}
        />
        <div className="flex items-center gap-2">
          <label className="text-gray-700 dark:text-gray-300">
            Items per page:
          </label>
          <input
            type="number"
            value={parPage}
            onChange={(e) => {
              if (e.target.value >= 1) {
                setParPage(parseInt(e.target.value));
                setPageNumber(1);
              }
            }}
            min="1"
            className="w-20 px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          />
        </div>
      </div>

      <Modal
        isOpen={isView}
        onRequestClose={() => setIsView(false)}
        overlayClassName="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50 enhanced-scrollbar"
        className="w-full h-full"
        contentLabel="View User"
      >
        <ViewUser setIsView={setIsView} selectedUser={modifyUser} />
      </Modal>

      <Modal
        isOpen={isEdit}
        onRequestClose={() => setIsEdit(false)}
        style={customModalStyles}
        contentLabel="Edit User"
      >
        <EditUser setIsEdit={setIsEdit} selectedUser={modifyUser} />
      </Modal>

      <Modal
        isOpen={isDelete}
        onRequestClose={() => setIsDelete(false)}
        style={customModalStyles}
        contentLabel="Delete User"
      >
        <DeleteUser setIsDelete={setIsDelete} selectedUser={modifyUser} />
      </Modal>

      <BlockUserModal
        isOpen={isBlock}
        onClose={() => setIsBlock(false)}
        userToBlock={modifyUser}
      />
    </div>
  );
};

export default Users;
