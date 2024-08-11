import { useRouter } from 'next/navigation';
import styles from './Pagination.module.css';
import Button from '../Button/Button';
import PaginationProps from './types';

const Pagination = ({ currentPage, totalPages, searchTerm }: PaginationProps) => {
  const router = useRouter();

  const handlePrevious = () => {
    if (currentPage > 1) {
      if (searchTerm === '') {
        router.push(`/search/${currentPage - 1}`);
      } else {
        router.push(`/search/${currentPage - 1}?searchTerm=${searchTerm}`);
      }
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      if (searchTerm === '') {
        router.push(`/search/${currentPage + 1}`);
      } else {
        router.push(`/search/${currentPage + 1}?searchTerm=${searchTerm}`);
      }
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
