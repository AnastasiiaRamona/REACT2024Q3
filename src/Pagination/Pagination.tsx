import PaginationProps from './types';
import { useNavigate } from 'react-router-dom';
import styles from './Pagination.module.css';

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const navigate = useNavigate();

  const handlePrevious = () => {
    if (currentPage > 1) {
      navigate(`/search/${currentPage - 1}`);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      navigate(`/search/${currentPage + 1}`);
    }
  };

  return (
    <div className={styles.pagination}>
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
