import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { FiTrash } from "react-icons/fi";
import ViewMember from "./ViewMember";
import EditMember from "./EditMember";
import DeleteMember from "./DeleteMember";
import BlockMemberModal from "./BlockMemberModal";
import MemberDashboard from "./MemberDashboard";
import MemberTabs from "./MemberTabs";
import Pagination from "../../../components/shared/Pagination";
import { customModalStyles } from "../../../components/shared/modalStyles";
import AddMember from "./AddMember";

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
    fullname: "Blocked Member",
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
    fullname: "Trial Member",
    email: "trialuser@example.com",
    isBlocked: false,
    status: "active",
    joined: "2026-02-25T00:00:00.000Z",
  },
];

const userStats = {
  total: {
    count: 9,
  },
  active: {
    count: 8,
    percentage: 89,
  },
  blocked: {
    count: 1,
    percentage: 11,
  },
  newUsers: {
    count: 0,
    trend: 0,
  },
  recentUsers: [
    {
      _id: "68569603088cb904eb26a009",
      username: "ddd",
      fullname: "sasa",
      email: "ddd@ddd.ddd",
      createdAt: "2025-06-21T11:22:43.644Z",
    },
    {
      _id: "68235d4d5db113269123f9e8",
      username: "mmmdsa",
      fullname: "ghffdfdgd",
      email: "mmm@mmm.mmm",
      createdAt: "2025-05-13T14:55:09.510Z",
    },
    {
      _id: "682304a946aad12499b38059",
      username: "mmm",
      fullname: "mmm",
      email: "tewereus16@gmail.com",
      createdAt: "2025-05-13T08:36:57.946Z",
    },
    {
      _id: "6823006c145abe6609719755",
      username: "kkk",
      fullname: "kkkdfb",
      email: "jjj@jjj.jjj",
      createdAt: "2025-05-13T08:18:52.944Z",
    },
    {
      _id: "67443f357ba768bb8b489d06",
      username: "gfdgsfd",
      fullname: "tteqwteewqeq",
      email: "ghgasd@sadsd.das",
      createdAt: "2024-11-25T09:11:17.945Z",
    },
  ],
};

const Members = () => {
  // Use mock data only
  const [users, setUsers] = useState(mockUsers);
  const [isView, setIsView] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Members
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => setIsAdd(true)}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700
                     focus:ring-4 focus:ring-teal-500/50 transition-colors"
          >
            Add Member
          </button>
        </div>
      </div>
      {/* User Dashboard */}
      {userStats && <MemberDashboard stats={userStats} />}

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
        <MemberTabs
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
        isOpen={isAdd}
        onRequestClose={() => setIsAdd(false)}
        style={customModalStyles}
        contentLabel="Add Member"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <AddMember setIsOpen={setIsAdd} />
      </Modal>

      <Modal
        isOpen={isView}
        onRequestClose={() => setIsView(false)}
        overlayClassName="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50 enhanced-scrollbar"
        className="w-full h-full"
        contentLabel="View Member"
      >
        <ViewMember setIsView={setIsView} selectedUser={modifyUser} />
      </Modal>

      <Modal
        isOpen={isEdit}
        onRequestClose={() => setIsEdit(false)}
        style={customModalStyles}
        contentLabel="Edit Member"
      >
        <EditMember setIsEdit={setIsEdit} selectedUser={modifyUser} />
      </Modal>

      <Modal
        isOpen={isDelete}
        onRequestClose={() => setIsDelete(false)}
        style={customModalStyles}
        contentLabel="Delete Member"
      >
        <DeleteMember setIsDelete={setIsDelete} selectedUser={modifyUser} />
      </Modal>

      <BlockMemberModal
        isOpen={isBlock}
        onClose={() => setIsBlock(false)}
        userToBlock={modifyUser}
      />
    </div>
  );
};

export default Members;
