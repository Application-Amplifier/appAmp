import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const AddApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({});

  return (
    <>
      <div className="hidden lg:flex lg:flex-1 items-center lg:justify-end">
        <a
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-md text-sm cursor-pointer ml-4 bg-green-600 px-3.5 py-1.5 hover:shadow-md font-semibold leading-7 text-white shadow-sm hover:scale-105 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add App
        </a>
      </div>
      <Modal>
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        shouldCloseOnOverlayClick={true}
        className='w-1/2 m-auto rounded-lg shadow-xl px-10 z-20 my-16 bg-white
        border-b-8 border-indigo-200'
      </Modal>
    </>
  );
};
