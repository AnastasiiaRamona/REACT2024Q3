import styles from './Pagination.module.css';
import Button from '../Button/Button';
import PaginationProps from './types';
import { NavLink } from '@remix-run/react';

const Pagination = ({ currentPage, totalPages, searchTerm }: PaginationProps) => {
  return (
    <div className={styles.pagination}>
      {currentPage > 1 && (
        <NavLink
          to={`/search/${currentPage - 1}${searchTerm ? `?searchTerm=${searchTerm}` : ''}`}
          className={styles['pagination-button']}
        >
          <Button text={'Previous'} className={styles['pagination-button']} disabled={currentPage === 1}></Button>
        </NavLink>
      )}

      <span>
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages && (
        <NavLink
          to={`/search/${currentPage + 1}${searchTerm ? `?searchTerm=${searchTerm}` : ''}`}
          className={styles['pagination-button']}
        >
          <Button text={'Next'} className={styles['pagination-button']} disabled={currentPage === totalPages}></Button>
        </NavLink>
      )}
    </div>
  );
};

export default Pagination;
