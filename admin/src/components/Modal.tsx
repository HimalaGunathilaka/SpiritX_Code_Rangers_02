import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-opacity ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className="absolute inset-0 bg-opacity-30 transition-opacity bg-black opacity-50" 
        onClick={onClose}
      ></div>
      <div
        className={`absolute inset-y-0 right-0 max-w-full flex transform transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="w-screen max-w-md bg-white shadow-xl">
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}