import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  FiX,
  FiUser,
  FiAward,
  FiHeart,
  FiKey,
  FiPhone,
  FiMail,
  FiCalendar,
  FiUsers,
  FiPlayCircle,
  FiChevronsRight,
  FiUserCheck,
  FiShield,
  FiTrendingUp,
  FiActivity,
  FiAlertTriangle,
  FiCreditCard,
  FiLock,
  FiCheck,
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import { addStaff } from "../../../store/auth/authSlice";

const STEPS = [
  { name: "Personal", icon: FiUser },
  { name: "Membership", icon: FiAward },
  { name: "Health", icon: FiHeart },
  { name: "Access", icon: FiKey },
];

const AddMember = ({ setIsOpen }) => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Personal
    fullname: "",
    mobile: "",
    email: "",
    dob: "",
    gender: "",
    // Membership
    membershipType: "",
    startDate: "",
    endDate: "",
    trainer: "",
    accessLevel: "",
    // Health
    height: "",
    weight: "",
    fitnessGoals: "",
    medicalConditions: "",
    // Access
    membershipId: "",
    rfid: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateStep = () => {
    const newErrors = {};
    if (activeStep === 0) {
      if (!formData.fullname.trim()) newErrors.fullname = "Full name required";
      if (!/^\d{9}$/.test(formData.mobile))
        newErrors.mobile = "Mobile must be 9 digits";
      if (!formData.email) newErrors.email = "Email required";
    }
    if (activeStep === 1) {
      if (!formData.membershipType) newErrors.membershipType = "Select type";
      if (!formData.startDate) newErrors.startDate = "Start date required";
    }
    if (activeStep === 2) {
      if (!formData.height) newErrors.height = "Height required";
      if (!formData.weight) newErrors.weight = "Weight required";
    }
    if (activeStep === 3) {
      if (!formData.membershipId) newErrors.membershipId = "ID required";
      if (!formData.password) newErrors.password = "Password required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setActiveStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  const handlePrev = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);
    try {
      const data = { ...formData, role: "member" };
      await dispatch(addStaff({ data })).unwrap();
      toast.success("Member added successfully!");
      setIsOpen(false);
    } catch (error) {
      toast.error(error?.message || "Failed to add member");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              error={errors.fullname}
              icon={FiUser}
            />
            <Input
              label="Mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="9 digits"
              error={errors.mobile}
              icon={FiPhone}
            />
            <Input
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              error={errors.email}
              icon={FiMail}
            />
            <Input
              label="Date of Birth"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              type="date"
              icon={FiCalendar}
            />
            <Select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={["Male", "Female", "Other"]}
              icon={FiUsers}
            />
          </div>
        );
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Membership Type"
              name="membershipType"
              value={formData.membershipType}
              onChange={handleChange}
              options={["Monthly", "Annual", "Premium"]}
              error={errors.membershipType}
              icon={FiAward}
            />
            <Input
              label="Start Date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              type="date"
              error={errors.startDate}
              icon={FiPlayCircle}
            />
            <Input
              label="End Date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              type="date"
              icon={FiChevronsRight}
            />
            <Input
              label="Assigned Trainer"
              name="trainer"
              value={formData.trainer}
              onChange={handleChange}
              icon={FiUserCheck}
            />
            <Select
              label="Access Level"
              name="accessLevel"
              value={formData.accessLevel}
              onChange={handleChange}
              options={[
                "Gym Floor",
                "All Classes",
                "Pool & Spa",
                "VIP Full Access",
              ]}
              icon={FiShield}
            />
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Height (cm)"
              name="height"
              value={formData.height}
              onChange={handleChange}
              type="number"
              error={errors.height}
              icon={FiTrendingUp}
            />
            <Input
              label="Weight (kg)"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              type="number"
              error={errors.weight}
              icon={FiActivity}
            />
            <div className="md:col-span-2">
              <Input
                label="Fitness Goals"
                name="fitnessGoals"
                value={formData.fitnessGoals}
                onChange={handleChange}
                placeholder="e.g., Weight loss, muscle gain"
                icon={FiHeart}
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="medicalConditions"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 mb-1"
              >
                Medical Conditions
              </label>
              <textarea
                id="medicalConditions"
                name="medicalConditions"
                value={formData.medicalConditions}
                onChange={handleChange}
                placeholder="e.g., Asthma, past injuries"
                className="block w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-teal-500 focus:ring-teal-200 dark:focus:ring-teal-900/30 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 py-3 px-4 transition-all duration-200 focus:outline-none focus:ring-4 resize-none"
                rows={4}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Membership ID"
              name="membershipId"
              value={formData.membershipId}
              onChange={handleChange}
              error={errors.membershipId}
              icon={FiCreditCard}
            />
            <Input
              label="RFID / Key Fob"
              name="rfid"
              value={formData.rfid}
              onChange={handleChange}
              icon={FiKey}
            />
            <div className="md:col-span-2">
              <Input
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                error={errors.password}
                icon={FiLock}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl bg-white dark:bg-gray-800 shadow-xl flex flex-col h-[85vh] overflow-hidden enhanced-scrollbar">
      {/* Header */}
      <div className="px-10 py-6 border-b flex justify-between items-center bg-gray-50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Add New Member
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Register a new member with our modern wizard
          </p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 rounded-full bg-gray-700 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-500 transition-all duration-200"
        >
          <FiX size={24} />
        </button>
      </div>

      <div className="relative px-4 sm:px-12 py-6">
        {/* Fluid connector line behind pills */}

        <div className="flex items-center justify-between relative z-10">
          {STEPS.map((step, index) => {
            const isActive = index === activeStep;
            const isCompleted = index < activeStep;
            return (
              <div
                key={step.name}
                className="flex-1 flex flex-col items-center relative"
              >
                {/* Step Circle */}
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 z-20 ${
                    isCompleted
                      ? "bg-teal-500 text-white shadow-md"
                      : isActive
                        ? "bg-teal-600 text-white shadow-lg scale-110 animate-pulse-slow"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    <FiCheck className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>

                {/* Step Label */}
                <p
                  className={`text-xs mt-2 font-semibold text-center ${
                    isActive || isCompleted
                      ? "text-teal-600 dark:text-teal-400"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {step.name}
                </p>

                {/* Fluid pill connector */}
                {index < STEPS.length - 1 && (
                  <div
                    className={`absolute top-5 right-[-50%] w-full h-2 rounded-full transition-all duration-500 -z-10 ${
                      index < activeStep
                        ? "bg-teal-500"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  ></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form content */}
      <div className="flex-1 overflow-y-auto px-10 py-6 bg-gray-50 dark:bg-gray-900/20">
        <div className="max-w-3xl mx-auto shadow-sm p-6 rounded-2xl bg-white dark:bg-gray-800">
          {renderStepContent()}
        </div>
      </div>

      {/* Footer */}
      <div className="px-10 py-5 border-t bg-white dark:bg-gray-800 flex justify-between items-center">
        <button
          onClick={handlePrev}
          disabled={activeStep === 0}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200  ${
            activeStep === 0
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          }`}
        >
          Back
        </button>

        {activeStep < STEPS.length - 1 ? (
          <button
            onClick={handleNext}
            className="px-8 py-3 cursor-pointer bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl font-semibold shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            Next Step <FiChevronsRight className="inline ml-1" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl font-semibold shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : "Complete Registration"}
          </button>
        )}
      </div>
    </div>
  );
};

// Reusable Input component
const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  error,
  icon: Icon,
}) => (
  <div className="space-y-1.5">
    <label
      htmlFor={name}
      className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1"
    >
      {label}
    </label>
    <div className="relative group">
      {Icon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <Icon
            className={`h-5 w-5 transition-colors duration-200 ${
              error
                ? "text-red-400"
                : "text-gray-400 group-focus-within:text-teal-500"
            }`}
            aria-hidden="true"
          />
        </div>
      )}
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`block w-full rounded-xl border-2 ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-200"
            : "border-gray-200 dark:border-gray-700 focus:border-teal-500 focus:ring-teal-200 dark:focus:ring-teal-900/30"
        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 py-3 ${
          Icon ? "pl-11" : "pl-4"
        } pr-4 transition-all duration-200 focus:outline-none focus:ring-4`}
      />
    </div>
    {error && (
      <p className="text-red-500 text-xs mt-1 ml-1 font-medium flex items-center gap-1">
        <FiAlertTriangle /> {error}
      </p>
    )}
  </div>
);

// Reusable Select component
const Select = ({
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  icon: Icon,
}) => (
  <div className="space-y-1.5">
    <label
      htmlFor={name}
      className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1"
    >
      {label}
    </label>
    <div className="relative group">
      {Icon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <Icon
            className={`h-5 w-5 transition-colors duration-200 ${
              error
                ? "text-red-400"
                : "text-gray-400 group-focus-within:text-teal-500"
            }`}
            aria-hidden="true"
          />
        </div>
      )}
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={`block w-full rounded-xl border-2 ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-200"
            : "border-gray-200 dark:border-gray-700 focus:border-teal-500 focus:ring-teal-200 dark:focus:ring-teal-900/30"
        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 py-3 ${
          Icon ? "pl-11" : "pl-4"
        } pr-10 transition-all duration-200 focus:outline-none focus:ring-4 appearance-none`}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
    {error && (
      <p className="text-red-500 text-xs mt-1 ml-1 font-medium flex items-center gap-1">
        <FiAlertTriangle /> {error}
      </p>
    )}
  </div>
);

export default AddMember;
