import type { ReactNode } from 'react';

export interface ModalProps {
  children: ReactNode;
  className?: string;
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
  description?: ReactNode;
  footer?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  showCloseButton?: boolean;
  title?: ReactNode;
}
