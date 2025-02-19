import React from "react";
import css from "./Pagination.module.css";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className={css.pagination}>
            <button
                className={css.button}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Попередня
            </button>
            <span className={css.pageInfo}>Сторінка {currentPage} з {totalPages}</span>
            <button
                className={css.button}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Наступна
            </button>
        </div>
    );
};
