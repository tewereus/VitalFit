import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaChartBar,
  FaPrint,
  FaMotorcycle,
} from "react-icons/fa";
import TrainerTable from "./TrainerTable";
import TrainerSummary from "./TrainerSummary";

// Helper function to combine class names conditionally
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const TrainerTabs = ({
  managers,
  isLoading,
  handleView,
  handleEdit,
  handleDelete,
  showPagination = true,
}) => {
  const [activeTab, setActiveTab] = useState("all");
  const [filteredTrainers, setFilteredTrainers] = useState([]);

  const dispatch = useDispatch();

  // Filter managers based on active tab
  useEffect(() => {
    if (!managers) return;

    if (activeTab === "all") {
      setFilteredTrainers(managers);
    } else if (activeTab === "active") {
      setFilteredTrainers(
        managers.filter((manager) => manager.status === "active"),
      );
    } else if (activeTab === "inactive") {
      setFilteredTrainers(
        managers.filter((manager) => manager.status === "inactive"),
      );
    } else if (activeTab === "waiting") {
      setFilteredTrainers(
        managers.filter((manager) => manager.main_status === "waiting"),
      );
    }
  }, [activeTab, managers]);

  // Define tabs
  const tabs = [
    {
      id: "all",
      label: "All Trainers",
      icon: <FaUsers className="w-4 h-4" />,
    },
    {
      id: "active",
      label: "Active Trainers",
      icon: <FaUserCheck className="w-4 h-4" />,
      badge:
        managers?.filter((manager) => manager.status === "active")?.length || 0,
      badgeClass:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    },
    {
      id: "inactive",
      label: "Inactive Trainers",
      icon: <FaUserTimes className="w-4 h-4" />,
      badge:
        managers?.filter((manager) => manager.status === "inactive")?.length ||
        0,
      badgeClass:
        "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    },
    {
      id: "waiting",
      label: "Waiting Approval",
      icon: <FaUserTimes className="w-4 h-4" />,
      badge:
        managers?.filter((manager) => manager.main_status === "waiting")
          ?.length || 0,
      badgeClass:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    },
    {
      id: "analytics",
      label: "Trainer Analytics",
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
        {/* All Trainers Tab */}
        {activeTab === "all" && (
          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
              All Trainers
            </h3>
            <TrainerTable
              managers={filteredTrainers}
              isLoading={isLoading}
              handleView={handleView}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              showPagination={showPagination}
            />
          </div>
        )}

        {/* Active Trainers Tab */}
        {activeTab === "active" && (
          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
              Active Trainers
            </h3>
            <TrainerTable
              managers={filteredTrainers}
              isLoading={isLoading}
              handleView={handleView}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              showPagination={showPagination}
            />
          </div>
        )}

        {/* Inactive Trainers Tab */}
        {activeTab === "inactive" && (
          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
              Inactive Trainers
            </h3>
            <TrainerTable
              managers={filteredTrainers}
              isLoading={isLoading}
              handleView={handleView}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              showPagination={showPagination}
            />
          </div>
        )}

        {/* Waiting Approval Tab */}
        {activeTab === "waiting" && (
          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
              Trainers Waiting Approval
            </h3>
            <TrainerTable
              managers={filteredTrainers}
              isLoading={isLoading}
              handleView={handleView}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              showPagination={showPagination}
            />
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
              Trainer Analytics
            </h3>
            <TrainerSummary />
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainerTabs;
