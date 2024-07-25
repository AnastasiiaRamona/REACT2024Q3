interface ModalWindowProps {
  selectedItemsCount: number;
  onUnselectAll: () => void;
  onDownload: () => void;
  onClose: () => void;
  className?: string;
}

export default ModalWindowProps;
