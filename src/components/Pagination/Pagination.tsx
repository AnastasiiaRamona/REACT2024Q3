import { useRouter } from 'next/navigation';
import styles from './Pagination.module.css';
import Button from '../Button/Button';
import PaginationProps from './types';

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const router = useRouter();

  const handlePrevious = () => {
    if (currentPage > 1) {
      router.push(`/search/${currentPage - 1}`);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      router.push(`/search/${currentPage + 1}`);
    }
  };

  return (
    <div className={styles.pagination}>
      <Button
        onClick={handlePrevious}
        text={'Previous'}
        className={styles['pagination-button']}
        disabled={currentPage === 1}
      ></Button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        onClick={handleNext}
        text={'Next'}
        className={styles['pagination-button']}
        disabled={currentPage === totalPages}
      ></Button>
    </div>
  );
};

export default Pagination;
