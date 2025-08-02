'use client';
import { useState } from 'react';

export default function ImageModal({ imageUrl }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleBackdropClick = () => {
    setIsOpen(false);
  };

  const handleImageClick = (e) => {
    e.stopPropagation(); // prevent modal from closing when clicking on the image
  };

  return (
    <>
      {/* Thumbnail */}
      <div
        className="cursor-pointer relative w-48 h-32 rounded overflow-hidden border border-gray-200 shadow-md"
        onClick={() => setIsOpen(true)}
      >
        <img
          src={imageUrl}
          alt="Thumbnail"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={handleBackdropClick}
        >
          <div
            className="relative max-w-4xl w-full p-4"
            onClick={handleImageClick}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white text-2xl font-bold"
            >
              &times;
            </button>
            <img
              src={imageUrl}
              alt="Full size"
              className="w-full max-h-[80vh] object-contain rounded-md"
            />
          </div>
        </div>
      )}
    </>
  );
}
