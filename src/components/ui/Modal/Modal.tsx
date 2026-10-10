import { clsx } from 'clsx';
import { useEffect, useId, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { Card } from '../Card';
import type { ModalProps } from './Modal.types';

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

const exitAnimationDuration = 180;

const getFocusableElements = (container: HTMLElement) => {
  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (element) =>
      element.getClientRects().length > 0 && element.getAttribute('aria-hidden') !== 'true',
  );
};

export const Modal = ({
  children,
  className,
  closeOnEscape = true,
  closeOnOverlayClick = true,
  description,
  footer,
  isOpen,
  onClose,
  showCloseButton = true,
  title,
}: ModalProps) => {
  const { t } = useTranslation('common');
  const dialogRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const generatedId = useId();
  const titleId = title ? `modal-${generatedId}-title` : undefined;
  const descriptionId = description ? `modal-${generatedId}-description` : undefined;

  useEffect(() => {
    if (isOpen === shouldRender) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const presenceDelay = isOpen || prefersReducedMotion ? 0 : exitAnimationDuration;

    const presenceTimer = window.setTimeout(() => {
      setShouldRender(isOpen);
    }, presenceDelay);

    return () => {
      window.clearTimeout(presenceTimer);
    };
  }, [isOpen, shouldRender]);

  useEffect(() => {
    if (!shouldRender) {
      return undefined;
    }

    const dialog = dialogRef.current;
    const previouslyFocusedElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousBodyOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    const focusFirstElement = () => {
      const firstFocusableElement = dialog ? getFocusableElements(dialog)[0] : undefined;

      (firstFocusableElement ?? dialog)?.focus();
    };

    focusFirstElement();

    const handleFocusIn = (event: FocusEvent) => {
      if (dialog && event.target instanceof Node && !dialog.contains(event.target)) {
        focusFirstElement();
      }
    };

    document.addEventListener('focusin', handleFocusIn);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.body.style.overflow = previousBodyOverflow;

      if (previouslyFocusedElement?.isConnected) {
        previouslyFocusedElement.focus();
      }
    };
  }, [shouldRender]);

  useEffect(() => {
    if (!shouldRender) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isOpen && closeOnEscape) {
          event.preventDefault();
          onClose();
        }

        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) {
        return;
      }

      const focusableElements = getFocusableElements(dialogRef.current);

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements.at(-1);
      const focusIsInsideDialog =
        document.activeElement instanceof Node &&
        dialogRef.current.contains(document.activeElement);

      if (
        event.shiftKey &&
        (!focusIsInsideDialog || document.activeElement === firstFocusableElement)
      ) {
        event.preventDefault();
        lastFocusableElement?.focus();
      } else if (
        !event.shiftKey &&
        (!focusIsInsideDialog || document.activeElement === lastFocusableElement)
      ) {
        event.preventDefault();
        firstFocusableElement?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeOnEscape, isOpen, onClose, shouldRender]);

  if (!shouldRender || typeof document === 'undefined') {
    return null;
  }

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (isOpen && closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={clsx(
        'fixed inset-0 z-50 flex overflow-y-auto bg-neutral-950/60 p-4 sm:p-6',
        isOpen ? 'animate-modal-overlay-enter' : 'animate-modal-overlay-exit',
      )}
      onClick={handleOverlayClick}
    >
      <Card
        ref={dialogRef}
        aria-describedby={descriptionId}
        aria-label={title ? undefined : t('modal.label')}
        aria-labelledby={titleId}
        aria-modal="true"
        className={clsx(
          'm-auto flex max-h-[calc(100svh-2rem)] w-full max-w-xl flex-col overflow-hidden',
          isOpen ? 'animate-modal-content-enter' : 'animate-modal-content-exit',
          className,
        )}
        padding="none"
        role="dialog"
        tabIndex={-1}
      >
        {title || description || showCloseButton ? (
          <header className="flex shrink-0 items-start gap-4 border-b border-border px-6 py-5">
            <div className="min-w-0 flex-1">
              {title ? (
                <h2 className="text-lg font-semibold text-text-primary" id={titleId}>
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p
                  className={clsx('text-sm text-text-secondary', title && 'mt-2')}
                  id={descriptionId}
                >
                  {description}
                </p>
              ) : null}
            </div>
            {showCloseButton ? (
              <button
                aria-label={t('modal.close')}
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-hover hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                onClick={onClose}
                type="button"
              >
                <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 20 20">
                  <path
                    d="m5 5 10 10M15 5 5 15"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            ) : null}
          </header>
        ) : null}

        <div className="min-h-0 overflow-y-auto px-6 py-5 text-sm text-text-secondary">
          {children}
        </div>

        {footer ? (
          <footer className="flex shrink-0 flex-wrap justify-end gap-3 border-t border-border px-6 py-4">
            {footer}
          </footer>
        ) : null}
      </Card>
    </div>,
    document.body,
  );
};
