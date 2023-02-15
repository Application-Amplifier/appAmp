import React, { useEffect, useState } from 'react';
// https://www.npmjs.com/package/react-modal
import Modal from 'react-modal';
import Application from '../../interfaces/application'

type Props = {
  application: Application,
}

const Tile = (props: Props) => {

  const { application } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({});

  // Update form object after each keystroke
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  // submit form: send post request to server @ /login
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);

    fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
  };

  return (
    <div>
      <div
        onClick={() => setIsOpen(true)}
        className='flex-grow hover:bg-indigo-50 hover:scale-105 hover:shadow-md flex flex-col rounded-md border px-2 py-4 cursor-pointer'
      >
        <span className="companyName">{application.companyName}</span>
        <span className="positionTitle">{application.positionTitle}</span>
        <span className="dateApplied">{application.date.toString()}</span>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        shouldCloseOnOverlayClick={true}
        className='w-1/2 m-auto rounded-lg shadow-xl px-10 z-20 mt-32 bg-white border-b-8 border-indigo-200'
      >
        <form className='p-12 z-20 relative'>
          <div className='flex pt-8 pb-8 gap-x-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z'
              />
            </svg>

            <h1 className='text-2xl mt-[-3px] font-bold'>
              {application.companyName} | {application.positionTitle}
            </h1>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className='absolute text-xl top-4 right-6 text-gray-300 font-extrabold hover:scale-110 hover:text-gray-500'
          >
            X
          </button>
          <div className='mb-4'>
            <label className='block font-medium mb-2' htmlFor='companyName'>
              Company Name:
            </label>
            <input
              id="companyNameInput"
              className='border outline-none rounded focus:border-b focus:border-b-indigo-500 w-full py-2 px-3'
              type='text'
              autoComplete='false'
              placeholder='Microsoft'
              name='companyName' // the sent object key
              value={application.companyName}
              onChange={handleChange}
            />
          </div>
          <div className='mb-4'>
            <label className='block font-medium mb-2' htmlFor='positionTitle'>
              Position Title:
            </label>
            <input
              id="positionTitleInput"
              className='border outline-none rounded focus:border-b focus:border-b-indigo-500 w-full py-2 px-3'
              type='text'
              autoComplete='false'
              placeholder='Software Engineer'
              name='positionTitle' // the sent object key
              value={application.positionTitle}
              onChange={handleChange}
            />
          </div>
          <div className='mb-4'>
            <label className='block font-medium mb-2' htmlFor='date'>
              Date:
            </label>
            <input
              id="dateInput"
              className='border outline-none rounded focus:border-b focus:border-b-indigo-500 w-full py-2 px-3'
              type='text'
              autoComplete='false'
              placeholder='01/01/2022'
              name='date' // the sent object key
              value={application.date.toString()}
              onChange={handleChange}
            />
          </div>
          <div className='mb-4'>
            <label className='block font-medium mb-2' htmlFor='status'>
              Status:
            </label>
            <select
              id="statusInput"
              className='border outline-none rounded focus:border-b focus:border-b-indigo-500 w-full py-2 px-3'
              name='status' // the sent object key
              onChange={handleChange}
            >
              <option selected={application.status === 'contact'} value='contacted'>Contacted</option>
              <option selected={application.status === 'applied'} value='applied'>Applied</option>
              <option selected={application.status === 'interviewed'} value='interviewed'>Interviewed</option>
              <option selected={application.status === 'offered'} value='offered'>Offered</option>
            </select>
          </div>
          <button
            className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-5 8 rounded shadow-sm hover:scale-105 hover:shadow-lg '
            type='submit'
            value='login'
            onClick={handleSubmit}
          >
            Update
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Tile;
