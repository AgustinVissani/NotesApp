import React from "react";
import "../../styles/table_pagination.css";

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const TablePagination = ({
  pageIndex,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  canPreviousPage,
  canNextPage,
}) => {
  const MAX_PAGES_SHOWN = 3;

  const getPagesToShow = () => {
    const currentPage = pageIndex + 1;
    const lastPage = pageCount;
    const halfMaxPages = Math.floor(MAX_PAGES_SHOWN / 2);

    let pagesToShow = [];

    if (lastPage <= MAX_PAGES_SHOWN) {
      pagesToShow = Array.from({ length: lastPage }, (_, i) => i + 1);
    } else if (currentPage <= halfMaxPages) {
      pagesToShow = Array.from({ length: MAX_PAGES_SHOWN }, (_, i) => i + 1);
    } else if (currentPage >= lastPage - halfMaxPages) {
      pagesToShow = Array.from({ length: MAX_PAGES_SHOWN }, (_, i) => lastPage - MAX_PAGES_SHOWN + i + 1);
    } else {
      pagesToShow = Array.from({ length: MAX_PAGES_SHOWN }, (_, i) => currentPage - halfMaxPages + i);
    }

    return pagesToShow;
  };

  const pagesToShow = getPagesToShow();

  return (
    <nav aria-label="Pagination">
      <ul className="pagination-position">
        <li className="page-item">
          <button
            className="primary-button button-style"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <ChevronDoubleLeftIcon className="h-5 w-5 text-black" />
          </button>
        </li>
        <li className="page-item">
          <button
            className="primary-button button-style"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <ChevronLeftIcon className="h-5 w-5 text-black" />
          </button>
        </li>
        {pagesToShow[0] > 1 && (
          <>
            <li className="page-item">
              <button
                className="pagination-number"
                onClick={() => gotoPage(0)}
              >
                1
              </button>
            </li>
            {pagesToShow[0] > 2 && <li className="ellipsis">...</li>}
          </>
        )}
        {pagesToShow.map((pageNumber) => (
          <li
            className={`page-item ${pageNumber === pageIndex + 1 ? "active" : ""}`}
            key={pageNumber}
          >
            <button
              className={`pagination-number ${pageNumber === pageIndex + 1 ? "active" : ""}`}
              onClick={() => gotoPage(pageNumber - 1)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        {pagesToShow[pagesToShow.length - 1] < pageCount && (
          <>
            {pagesToShow[pagesToShow.length - 2] < pageCount - 1 && <li className="ellipsis">...</li>}
            <li className="page-item">
              <button
                className="pagination-number"
                onClick={() => gotoPage(pageCount - 1)}
              >
                {pageCount}
              </button>
            </li>
          </>
        )}
        <li className="page-item">
          <button
            className="primary-button button-style"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <ChevronRightIcon className="h-5 w-5 text-black" />
          </button>
        </li>
        <li className="page-item">
          <button
            className="primary-button button-style"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <ChevronDoubleRightIcon className="h-5 w-5 text-black" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default TablePagination;
