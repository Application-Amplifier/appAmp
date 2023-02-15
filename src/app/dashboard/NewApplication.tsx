import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const NewApplication = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    positionTitle: '',
    jobPostingLink: '',
    positionLocation: '',
    status: 'contacted',
    followUpEmail: false,
    tailoredResume: false,
    coverLetter: false,
    referral: false,
  });

  // Update form object after each keystroke
  const handleChange = (e: any) => {

    // If the change was on a checkbox
    if (e.target.name.slice(-8) === 'Checkbox') {
      setFormData({
        ...formData,
        [e.target.name.slice(0, -8)]: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  // submit form: send post request to server @ /login
  const handleSubmit = (e: any) => {
    console.log(formData)
    e.preventDefault();
    fetch(`/api/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
  };

  return (
    <>
      <div className="hidden lg:flex lg:flex-1 items-center lg:justify-end">
        <a
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-md text-sm cursor-pointer ml-4 bg-green-600 px-3.5 py-1.5 hover:shadow-md font-semibold leading-7 text-white shadow-sm hover:scale-105 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Application
        </a>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        shouldCloseOnOverlayClick={true}
        className='w-1/2 m-auto rounded-lg shadow-xl px-10 z-20 mt-4 bg-white border-b-8 border-indigo-200'
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
              Add New Application
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
              onChange={handleChange}
            />
          </div>
          <div className='mb-4'>
            <label className='block font-medium mb-2' htmlFor='jobPostingLink'>
              Job Posting Link:
            </label>
            <input
              id="jobPostingLinkInput"
              className='border outline-none rounded focus:border-b focus:border-b-indigo-500 w-full py-2 px-3'
              type='text'
              autoComplete='false'
              placeholder='www.linkedin.com/link'
              name='jobPostingLink' // the sent object key
              onChange={handleChange}
            />
          </div>
          <div className='mb-4'>
            <label className='block font-medium mb-2' htmlFor='positionLocation'>
              Location:
            </label>
            <input
              id="positionLocationInput"
              className='border outline-none rounded focus:border-b focus:border-b-indigo-500 w-full py-2 px-3'
              type='text'
              autoComplete='false'
              placeholder='Remote, Hybrid, NYC...'
              name='positionLocation' // the sent object key
              onChange={handleChange}
            />
          </div>
          <div className='mb-4'>
            <label className='block font-medium mb-2' htmlFor='status'>
              Status:
            </label>
            <select
              id="statusInput"
              className='border outline-none rounded cursor-pointer focus:border-b focus:border-b-indigo-500 w-full py-2 px-3'
              name='status' // the sent object key
              onChange={handleChange}
            >
              <option value='contacted'>Contacted</option>
              <option value='applied'>Applied</option>
              <option value='interviewed'>Interviewed</option>
              <option value='offered'>Offered</option>
            </select>
          </div>

          {/* ------------Checkboxes------------ */}

          <div className='flex justify-start gap-3 mb-4 ml-10'>
            <input
              id="followUpEmailCheckbox"
              className='border outline-none rounded focus:border-b focus:border-b-indigo-500 py-2 px-3'
              type='checkbox'
              name='followUpEmailCheckbox' // the sent object key
              onChange={handleChange}
            />
            <label className='block font-medium' htmlFor='followUpEmail'>
              Follow Up Email:
            </label>
          </div>
          <div className='flex justify-start gap-3 mb-4 ml-10'>
            <input
              id="tailoredResumeCheckbox"
              className='border outline-none rounded focus:border-b focus:border-b-indigo-500 py-2 px-3'
              type='checkbox'
              name='tailoredResumeCheckbox' // the sent object key
              onChange={handleChange}
            />
            <label className='block font-medium' htmlFor='tailoredResume'>
              Tailored Resume:
            </label>
          </div>
          <div className='flex justify-start gap-3 mb-4 ml-10'>
            <input
              id="coverLetterCheckbox"
              className='border outline-none rounded focus:border-b focus:border-b-indigo-500 py-2 px-3'
              type='checkbox'
              name='coverLetterCheckbox' // the sent object key
              onChange={handleChange}
            />
            <label className='block font-medium' htmlFor='coverLetter'>
              Cover Letter
            </label>
          </div>
          <div className='flex justify-start gap-3 mb-4 ml-10'>
            <input
              id="referralCheckbox"
              className='border outline-none rounded focus:border-b focus:border-b-indigo-500 py-2 px-3'
              type='checkbox'
              name='referralCheckbox' // the sent object key
              onChange={handleChange}
            />
            <label className='font-medium' htmlFor='referral'>
              Referral Secured
            </label>
          </div>

          <button
            className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-5 8 rounded shadow-sm hover:scale-105 hover:shadow-lg mt-4 '
            type='submit'
            value='login'
            onClick={handleSubmit}
          >
            Update
          </button>
        </form>
      </Modal>
    </>
  );
};

export default NewApplication;
