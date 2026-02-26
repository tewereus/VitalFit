import React, { useState, useEffect } from "react";
import { FaUsers, FaUserCheck, FaUserTimes, FaChartBar } from "react-icons/fa";
import MemberTable from "./MemberTable";
import MemberSummary from "./MemberSummary";

// Gold theme mock data
const mockUsers = [
  {
    id: 1,
    username: "john",
    isBlocked: false,
    status: "active",
    joined: "2026-02-01",
  },
  {
    id: 2,
    username: "jane",
    isBlocked: false,
    status: "active",
    joined: "2026-02-10",
  },
  {
    id: 3,
    username: "blockeduser",
    isBlocked: true,
    status: "blocked",
    joined: "2026-01-15",
  },
  {
    id: 4,
    username: "goldmember",
    isBlocked: false,
    status: "active",
    joined: "2026-02-20",
  },
  {
    id: 5,
    username: "trialuser",
    isBlocked: false,
    status: "active",
    joined: "2026-02-25",
  },
];

const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const MemberTabs = ({
  users = mockUsers,
  isLoading = false,
  handleView,
  handleEdit,
  handleBlock,
  handleDelete,
  showPagination = true,
}) => {
  const [activeTab, setActiveTab] = useState("all");
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Filter users based on active tab
  useEffect(() => {
    if (!users) return;

    if (activeTab === "all") {
      setFilteredUsers(users);
    } else if (activeTab === "active") {
      setFilteredUsers(users.filter((user) => !user.isBlocked));
    } else if (activeTab === "blocked") {
      setFilteredUsers(users.filter((user) => user.isBlocked));
    }
  }, [activeTab, users]);

  // Define tabs
  const tabs = [
    {
      id: "all",
      label: "All Users",
      icon: <FaUsers className="w-4 h-4" />,
    },
    {
      id: "active",
      label: "Active Users",
      icon: <FaUserCheck className="w-4 h-4" />,
      badge: users?.filter((user) => !user.isBlocked)?.length || 0,
      badgeClass:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    },
    {
      id: "blocked",
      label: "Blocked Users",
      icon: <FaUserTimes className="w-4 h-4" />,
      badge: users?.filter((user) => user.isBlocked)?.length || 0,
      badgeClass:
        "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    },
    {
      id: "analytics",
      label: "User Analytics",
      icon: <FaChartBar className="w-4 h-4" />,
    },
  ];

  return (
    <div>
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
        <div className="flex flex-wrap -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "inline-flex items-center px-4 py-2 text-sm font-medium border-b-2 rounded-t-lg",
                activeTab === tab.id
                  ? "text-yellow-600 border-yellow-500 dark:text-yellow-400 dark:border-yellow-400"
                  : "text-gray-500 border-transparent hover:text-yellow-600 hover:border-yellow-300 dark:text-gray-400 dark:hover:text-yellow-300",
              )}
            >
              <span className="mr-2">{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`ml-2 text-xs font-medium px-2.5 py-0.5 rounded-full ${tab.badgeClass}`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {/* All Users Tab */}
        {activeTab === "all" && (
          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
              All Users
            </h3>
            <MemberTable
              users={filteredUsers}
              isLoading={isLoading}
              handleView={handleView}
              handleEdit={handleEdit}
              handleBlock={handleBlock}
              handleDelete={handleDelete}
              showPagination={showPagination}
            />
          </div>
        )}

        {/* Active Users Tab */}
        {activeTab === "active" && (
          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
              Active Users
            </h3>
            <MemberTable
              users={filteredUsers}
              isLoading={isLoading}
              handleView={handleView}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleBlock={handleBlock}
              showPagination={showPagination}
            />
          </div>
        )}

        {/* Blocked Users Tab */}
        {activeTab === "blocked" && (
          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
              Blocked Users
            </h3>
            <MemberTable
              users={filteredUsers}
              isLoading={isLoading}
              handleView={handleView}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleBlock={handleBlock}
              showPagination={showPagination}
            />
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
              User Analytics
            </h3>
            <MemberSummary />
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberTabs;
