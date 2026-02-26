import React, { useRef, useState, useEffect } from "react";

const MultiSelect = ({ options, selectedOptions, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Handle clicks outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    const newSelection = selectedOptions?.includes(option.value)
      ? selectedOptions?.filter((value) => value !== option.value)
      : [...(selectedOptions || []), option.value];
    onChange(newSelection);
  };

  const handleRemoveTag = (value) => {
    const newSelection = selectedOptions?.filter((option) => option !== value);
    onChange(newSelection);
  };

  return (
    <div className="relative" ref={containerRef}>
      <div
        className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 cursor-pointer flex flex-wrap items-center min-h-[42px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOptions?.length > 0 ? (
          selectedOptions?.map((value) => (
            <div
              key={value}
              className="bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 rounded-full px-2 py-1 text-sm flex items-center mr-2 mb-1"
            >
              {options?.find((opt) => opt.value === value)?.label}
              <button
                className="ml-2 text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-200"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveTag(value);
                }}
              >
                &times;
              </button>
            </div>
          ))
        ) : (
          <span className="text-gray-500 dark:text-gray-400">
            {placeholder}
          </span>
        )}
      </div>
      {isOpen && (
        <div className="absolute border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 shadow-lg z-50 mt-1 w-full max-h-60 overflow-y-auto">
          {options.length > 0 ? (
            options.map((option) => (
              <div
                key={option.value}
                className={`p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  selectedOptions?.includes(option.value)
                    ? "bg-teal-50 dark:bg-teal-900/20 text-teal-800 dark:text-teal-300"
                    : "text-gray-800 dark:text-gray-200"
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500 dark:text-gray-400 text-center">
              No options available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
