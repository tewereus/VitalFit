import React, { useState, useEffect } from "react";
import { FaUsers, FaUserCheck, FaUserTimes, FaChartBar } from "react-icons/fa";
import UserTable from "./UserTable";
import UserSummary from "./UserSummary";

// Helper function to combine class names conditionally
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const UserTabs = ({
  users,
  isLoading,
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
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
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
                  ? "text-teal-600 border-teal-600 dark:text-teal-400 dark:border-teal-400"
                  : "text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300",
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
            <UserTable
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
            <UserTable
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
            <UserTable
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
            <UserSummary />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTabs;
