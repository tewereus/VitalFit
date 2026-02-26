import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import { useSelector, useDispatch } from "react-redux";
import AddStaff from "./AddStaff";
import Pagination from "../../../components/shared/Pagination";
import EditStaff from "./EditStaff";
import DeleteStaff from "./DeleteStaff";
import ViewStaff from "./ViewStaff";
import { customModalStyles } from "../../../components/shared/modalStyles";
import StaffTabs from "./StaffTabs";
import StaffDashboard from "./StaffDashboard";

Modal.setAppElement("#root");

const managers = [
  {
    preference: {
      mode: "dark",
      language: "en",
    },
    riders: {
      riders: ["681de41e8c1dea86f9665935"],
      count: 1,
    },
    address: {
      country: {
        _id: "6730f786cb2352abe4944194",
        country_name: "Ethiopia",
      },
      region: {
        _id: "67339ec3e13c8bd68f9f6019",
        region_name: "Addis Ababa",
      },
      subRegion: {
        _id: "674ea8bd91bd52b4a4fdf87e",
        subregion_name: "Lemi Kura",
      },
    },
    lockUntil: null,
    _id: "681de3048c1dea86f96658c6",
    fullname: "abcde",
    email: "wqeqweq@wqew.qw",
    mobile: "111111111",
    password: "$2a$10$lXWuCdWkTl.hBnPaa82FWenkATLgpe7hB7eVuErNG4pn103xagmRK",
    role: "manager",
    status: "active",
    main_status: "active",
    printers: ["681de4368c1dea86f966593e"],
    profile: "",
    workArea: [
      {
        _id: "674ea8bd91bd52b4a4fdf87e",
        subregion_name: "Lemi Kura",
      },
    ],
    sold: 0,
    payment: [],
    createdAt: "2025-05-09T11:12:04.721Z",
    updatedAt: "2026-02-14T06:46:27.029Z",
    unique_id: "4911ba",
    managerToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJpZCI6IjY4MWRlMzA0OGMxZGVhODZmOTY2NThjNiIsInJvbGUiOiJtYW5hZ2VyIn0sImlhdCI6MTc0Njc5MjkxMiwiZXhwIjoxNzQ3MDUyMTEyfQ.ITVZfBCRDXNMS5GP-hywFbephOvdDstnI3hoX3YCAVI",
    isLocked: false,
    lastLoginAt: "2026-02-14T06:45:59.778Z",
    lastLoginIp: "::1",
    refreshToken: "",
  },
  {
    preference: {
      mode: "light",
      language: "en",
    },
    riders: [],
    address: {
      country: {
        _id: "6730f786cb2352abe4944194",
        country_name: "Ethiopia",
      },
      region: {
        _id: "67339e99e13c8bd68f9f6010",
        region_name: "Tigray",
      },
      subRegion: {
        _id: "673846acfcb49e967768b1c3",
        subregion_name: "Mekelle",
      },
    },
    isLocked: false,
    lockUntil: null,
    lastLoginAt: null,
    lastLoginIp: null,
    _id: "6759d4c603c43dde49ff23ab",
    fullname: "jhkgljhkdfjs",
    email: "qqq@qq.qq",
    mobile: "124578963",
    password: "$2a$10$OPolTW6EqN6EWvyNWfHiB.gdGXi6j8I89YF00GY5pk/.LdLcmEs.6",
    role: "manager",
    status: "inactive",
    main_status: "inactive",
    printers: [],
    profile: "",
    workArea: [
      {
        _id: "673846acfcb49e967768b1c3",
        subregion_name: "Mekelle",
      },
    ],
    sold: 0,
    payment: [],
    createdAt: "2024-12-11T18:07:02.216Z",
    updatedAt: "2024-12-11T18:07:02.348Z",
    unique_id: "0b3e74",
  },
  {
    preference: {
      mode: "dark",
      language: "en",
    },
    riders: [],
    address: {
      country: {
        _id: "6730f786cb2352abe4944194",
        country_name: "Ethiopia",
      },
      region: {
        _id: "67339ec3e13c8bd68f9f6019",
        region_name: "Addis Ababa",
      },
      subRegion: {
        _id: "67339edee13c8bd68f9f6021",
        subregion_name: "Yeka",
      },
    },
    isLocked: false,
    lockUntil: null,
    lastLoginAt: null,
    lastLoginIp: null,
    _id: "6756a81c3ec625e747834c12",
    fullname: "Abrham Yhune",
    email: "aaa@aaa.aa",
    mobile: "123654789",
    password: "$2a$10$2fPXnNFAeb2pLawJVvyK3.7nC6Tz.QsFwXifEat7vpNvz1oNoygIO",
    role: "manager",
    status: "inactive",
    main_status: "active",
    printers: ["675e825390770b1fa10d69e4"],
    profile: "",
    workArea: [
      {
        _id: "67339edee13c8bd68f9f6021",
        subregion_name: "Yeka",
      },
      {
        _id: "673846acfcb49e967768b1c3",
        subregion_name: "Mekelle",
      },
    ],
    sold: 0,
    payment: [],
    createdAt: "2024-12-09T08:19:40.225Z",
    updatedAt: "2025-05-09T15:55:16.439Z",
    unique_id: "88c040",
    managerToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTZhODFjM2VjNjI1ZTc0NzgzNGMxMiIsImlhdCI6MTczNDE2NTA4MiwiZXhwIjoxNzM0NDI0MjgyfQ.lFE5tti4LQJLD1cp5gnfNxGhvouGSgsEKsPCIy_o_88",
  },
  {
    preference: {
      mode: "dark",
      language: "en",
    },
    riders: {
      riders: [
        "676bbfe5049170726e847c6b",
        "676bbff5049170726e847c71",
        "676bc035049170726e847c7b",
        "676bc061049170726e847c85",
        "676bc0ae840fc5dd1329c5d0",
        "676bc18a302aa3fccfe85e3a",
        "6815e86649159885a402a339",
        "681de2cf8c1dea86f96658ab",
      ],
      count: 8,
    },
    address: {
      country: {
        _id: "6730f786cb2352abe4944194",
        country_name: "Ethiopia",
      },
      region: {
        _id: "67339ec3e13c8bd68f9f6019",
        region_name: "Addis Ababa",
      },
      subregion: "67339edee13c8bd68f9f6021",
    },
    lockUntil: null,
    _id: "6700f217096652f25b0357ab",
    email: "qqq@qqq.qq",
    mobile: "123123123",
    password: "$2a$10$olI7HFODThqA0At.0Ergj.EOJfzM/M58NU0rHb87HglavwEJNir4K",
    role: "manager",
    status: "active",
    main_status: "active",
    printers: [
      "6738c2f0109f7a34fb1a663e",
      "67fb7c746062810aa3399ea5",
      "680dfc399184f5246796f515",
    ],
    profile:
      "https://product-images.obsv3.et-global-1.ethiotelecom.et/profiles/managers/1751878173442-5209e5635404195f.png",
    sold: 0,
    payment: [],
    createdAt: "2024-10-05T08:00:23.216Z",
    updatedAt: "2026-02-25T12:08:00.712Z",
    unique_id: "296c6e",
    fullname: "tewe reus",
    managerToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJpZCI6IjY3MDBmMjE3MDk2NjUyZjI1YjAzNTdhYiIsInJvbGUiOiJtYW5hZ2VyIn0sImlhdCI6MTc0NjgwNjE5MywiZXhwIjoxNzQ3MDY1MzkzfQ.UhKnYaVtT7Pf4fu4L1PSI2i7-G0NbNH6pEFL0Spqx_w",
    workArea: [
      {
        _id: "67339edee13c8bd68f9f6021",
        subregion_name: "Yeka",
      },
    ],
    isLocked: false,
    lastLoginAt: "2026-02-25T12:07:43.936Z",
    lastLoginIp: "::1",
    refreshToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDBmMjE3MDk2NjUyZjI1YjAzNTdhYiIsInVzZXJUeXBlIjoiIiwiaWF0IjoxNzcyMDIxMjgwLCJleHAiOjE3NzIyODA0ODB9.eZawIiXs_vU_8Ps13Faz0vFv23ZgUL9RpR6jt5j5sGQ",
    passwordChangedAt: "2025-05-27T11:56:14.532Z",
  },
  {
    preference: {
      mode: "light",
      language: "en",
    },
    riders: {
      riders: [],
      count: 0,
    },
    workArea: [],
    isLocked: false,
    lockUntil: null,
    lastLoginAt: null,
    lastLoginIp: null,
    _id: "66ffd7211160aa94cc77cdce",
    email: "fds@fds.df",
    mobile: "934221719",
    role: "manager",
    status: "inactive",
    main_status: "unavailable",
    printers: [],
    profile: "",
    sold: 0,
    payment: [],
    createdAt: "2024-08-31T15:42:09.737Z",
    updatedAt: "2024-09-14T15:51:08.631Z",
    unique_id: "140af1",
    fullname: "iuhihuhidew",
    password: "sfdfdsfs",
  },
  {
    preference: {
      mode: "light",
      language: "en",
    },
    riders: {
      riders: [],
      count: 0,
    },
    workArea: [],
    isLocked: false,
    lockUntil: null,
    lastLoginAt: null,
    lastLoginIp: null,
    _id: "66ffd7041160aa94cc77cdca",
    email: "tewe@gmail.com",
    mobile: "934221718",
    role: "manager",
    status: "inactive",
    main_status: "waiting",
    printers: [],
    profile: "",
    sold: 0,
    payment: [],
    createdAt: "2024-08-31T15:34:02.141Z",
    updatedAt: "2024-11-11T08:47:07.073Z",
    unique_id: "cba86d",
    fullname: "Tewolde Gebreyesus",
    password: "$2a$10$K0KYa7bjOLcgPc34m5waGusEWM5cktr6j1hdO/e1aUIaaThSLd6WG",
  },
];

const managerStats = {
  total: {
    count: 6,
  },
  active: {
    count: 2,
    percentage: 33,
  },
  inactive: {
    count: 4,
    percentage: 67,
  },
  mainStatus: {
    active: 3,
    inactive: 1,
    waiting: 1,
    unavailable: 1,
  },
  new: {
    count: 1,
    percentage: 12,
  },
  workAreaDistribution: {
    "67339edee13c8bd68f9f6021": 2,
    "673846acfcb49e967768b1c3": 2,
    "674ea8bd91bd52b4a4fdf87e": 1,
  },
};

const Staff = () => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [parPage, setParPage] = useState(20);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("email");
  const [sort, setSort] = useState("-createdAt");

  const [sortValue, setSortValue] = useState({
    sortBy: "createdAt",
    order: "desc",
  });

  const sortOptions = ["createdAt", "email", "mobile", "status"];

  // useEffect(() => {
  //   const obj = {
  //     limit: parseInt(parPage),
  //     page: parseInt(pageNumber),
  //     sort,
  //     search,
  //     searchField,
  //   };
  //   dispatch(getAllStaff(obj));
  //   dispatch(getStaffStats());
  //   dispatch(getStaffSummary());
  //   dispatch(getRecentStaff());
  // }, [dispatch, pageNumber, parPage, sort, search, searchField]);

  const handleSearchChange = (e) => {
    if (e.key === "Enter") {
      setSearch(e.target.value);
      setPageNumber(1);
    }
  };

  const handleSort = () => {
    const { sortBy, order } = sortValue;
    setSort(`${order === "desc" ? "-" : ""}${sortBy}`);
  };

  const handleView = (manager) => {
    setSelectedUser(manager);
    setIsView(true);
  };

  const handleEdit = (manager) => {
    setSelectedUser(manager);
    setIsEdit(true);
  };

  const handleDelete = (manager) => {
    setSelectedUser(manager);
    setIsDelete(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Staff
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => setIsAdd(true)}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700
                     focus:ring-4 focus:ring-teal-500/50 transition-colors"
          >
            Add Staff
          </button>
        </div>
      </div>

      {/* Dashboard Stats */}
      <StaffDashboard stats={managerStats} />

      {/* Search and Sort Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search with integrated field selector */}
          <div className="flex-1 relative flex items-center">
            <input
              type="text"
              placeholder="Search managers..."
              onKeyDown={handleSearchChange}
              className="w-full pl-4 pr-32 py-2 rounded-lg border border-gray-300
                       dark:border-gray-600 bg-gray-50 dark:bg-gray-700
                       text-gray-800 dark:text-gray-100"
            />
            <div className="absolute right-1 top-1 bottom-1">
              <select
                onChange={(e) => setSearchField(e.target.value)}
                className="h-full px-3 rounded-md border-0 bg-transparent
                         text-gray-500 dark:text-gray-400 focus:ring-0"
              >
                <option value="email">Email</option>
                <option value="mobile">Mobile</option>
                <option value="status">Status</option>
                <option value="main_status">Main Status</option>
              </select>
            </div>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-300 dark:bg-gray-600"></div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <select
              onChange={(e) =>
                setSortValue({ ...sortValue, sortBy: e.target.value })
              }
              className="px-4 py-2 rounded-lg border border-gray-300
                       dark:border-gray-600 bg-gray-50 dark:bg-gray-700
                       text-gray-800 dark:text-gray-100"
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
              className="px-4 py-2 rounded-lg border border-gray-300
                       dark:border-gray-600 bg-gray-50 dark:bg-gray-700
                       text-gray-800 dark:text-gray-100"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
            <button
              onClick={handleSort}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg
                       hover:bg-teal-700 focus:ring-4 focus:ring-teal-500/50
                       transition-colors"
            >
              Sort
            </button>
          </div>
        </div>
      </div>

      {/* Tabbed Interface */}
      <StaffTabs
        managers={managers}
        handleView={handleView}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        showPagination={false}
      />

      {/* Pagination Section */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <Pagination
          totalItems={6}
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
            className="w-20 px-3 py-1 rounded-lg border border-gray-300
                     dark:border-gray-600 bg-gray-50 dark:bg-gray-700
                     text-gray-800 dark:text-gray-100"
          />
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={isAdd}
        onRequestClose={() => setIsAdd(false)}
        style={customModalStyles}
        contentLabel="Add Staff"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <AddStaff setIsOpen={setIsAdd} />
      </Modal>

      <Modal
        isOpen={isView}
        onRequestClose={() => setIsView(false)}
        style={customModalStyles}
        contentLabel="View Staff"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <ViewStaff setIsView={setIsView} selectedUser={selectedUser} />
      </Modal>

      <Modal
        isOpen={isEdit}
        onRequestClose={() => setIsEdit(false)}
        style={customModalStyles}
        contentLabel="Edit Staff"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <EditStaff setIsEdit={setIsEdit} selectedUser={selectedUser} />
      </Modal>

      <Modal
        isOpen={isDelete}
        onRequestClose={() => setIsDelete(false)}
        style={customModalStyles}
        contentLabel="Delete Staff"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <DeleteStaff setIsDelete={setIsDelete} selectedUser={selectedUser} />
      </Modal>
    </div>
  );
};

export default Staff;
