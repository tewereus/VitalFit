import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Pagination = ({
  totalItems = 0,
  parPage = 10,
  pageNumber = 1,
  setPageNumber,
  showItem = 3,
}) => {
  const totalPage = Math.ceil(totalItems / parPage) || 1;
  let startPage = pageNumber;

  let diff = totalPage - pageNumber;
  if (diff <= showItem) {
    startPage = totalPage - showItem;
  }
  let endPage = startPage < 0 ? showItem : showItem + startPage;

  if (startPage <= 0) {
    startPage = 1;
  }

  const createButtons = () => {
    const buttons = [];
    for (let i = startPage; i < endPage && i <= totalPage; i++) {
      buttons.push(
        <li
          key={i}
          onClick={() => i !== pageNumber && setPageNumber(i)}
          className={`px-3 py-1 text-sm font-medium rounded-md cursor-pointer transition-colors ${
            pageNumber === i
              ? "bg-yellow-500 text-white shadow"
              : "text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          }`}
        >
          {i}
        </li>,
      );
    }
    return buttons;
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600 dark:text-gray-400">
        Showing{" "}
        <span className="font-semibold text-gray-800 dark:text-white">
          {Math.min((pageNumber - 1) * parPage + 1, totalItems)}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-gray-800 dark:text-white">
          {Math.min(pageNumber * parPage, totalItems)}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-800 dark:text-white">
          {totalItems}
        </span>{" "}
        results
      </span>
      <ul className="flex items-center gap-2">
        <li>
          <button
            onClick={() => setPageNumber(pageNumber - 1)}
            disabled={pageNumber === 1}
            className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <BsChevronLeft />
            <span>Previous</span>
          </button>
        </li>
        {createButtons()}
        <li>
          <button
            onClick={() => setPageNumber(pageNumber + 1)}
            disabled={pageNumber === totalPage}
            className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <BsChevronRight />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
