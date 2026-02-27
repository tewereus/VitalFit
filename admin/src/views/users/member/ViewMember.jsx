import React from "react";
import {
  FiX,
  FiUser,
  FiActivity,
  FiMapPin,
  FiPhone,
  FiMail,
  FiCalendar,
  FiAward,
  FiHeart,
  FiKey,
} from "react-icons/fi";
import Barcode from "react-barcode";

const ViewMember = ({ setIsView, selectedUser }) => {
  const member = selectedUser || {};

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden flex flex-col h-full w-full mx-auto">
      <div className="flex justify-between items-center p-6 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-teal-600 flex items-center justify-center text-white text-xl font-semibold">
            {member.fullname ? member.fullname.charAt(0).toUpperCase() : "M"}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {member.fullname || "Member"}
              </h2>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
              <FiMail className="w-4 h-4" />
              {member.email}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 flex items-center gap-2">
              <FiCalendar className="w-4 h-4" />
              {member.createdAt
                ? new Date(member.createdAt).toLocaleDateString()
                : ""}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsView(false)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                <FiUser className="text-teal-500" />
                Personal Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Full Name
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {member.fullname}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Email
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <FiMail className="text-teal-500" />
                    {member.email}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Mobile
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <FiPhone className="text-teal-500" />
                    {member.mobile}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Gender
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {member.gender || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Date of Birth
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {member.dob
                      ? new Date(member.dob).toLocaleDateString()
                      : "-"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                <FiAward className="text-teal-500" />
                Membership Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Membership Type
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {member.membershipType || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Access Level
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {member.accessLevel || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Start Date
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {member.startDate
                      ? new Date(member.startDate).toLocaleDateString()
                      : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    End Date
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {member.endDate
                      ? new Date(member.endDate).toLocaleDateString()
                      : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Trainer
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {member.trainer || "-"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                <FiActivity className="text-teal-500" />
                Health & Goals
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Height
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {member.height ? `${member.height} cm` : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Weight
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {member.weight ? `${member.weight} kg` : "-"}
                  </p>
                </div>
                <div className="md:col-span-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Fitness Goals
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {member.fitnessGoals || "-"}
                  </p>
                </div>
                <div className="md:col-span-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Medical Conditions
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {member.medicalConditions || "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                <FiKey className="text-teal-500" />
                Access Credentials
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Membership ID
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {member.membershipId || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    RFID / Key Fob
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {member.rfid || "-"}
                  </p>
                </div>
              </div>
            </div>

            {member.barcode && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 flex flex-col items-center">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-4">
                  Member Barcode
                </h3>
                <Barcode
                  value={member.barcode}
                  format="CODE128"
                  background="#ffffff"
                  height={80}
                  margin={0}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {member.fullname} · {member.membershipId || member.email}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMember;
