'use client'
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import NewApplication from './NewApplication'

type Props = {};

const Navbar = (props: Props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    // { name: 'Product', href: '#' },
    // { name: 'Documentation', href: '#' },
  ];

  // get session from nextAuth
  const { data: session } = useSession();
  console.log(session);
  // useSession uses React Context

  //This is part of the first page 
  //Where the buttons are
  //When you click sign in it brings you to
  //http://localhost:3000/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F

  // if the user exists -> show a Sign Out button and their information

  //When signed  it brings us back to page with now a user card that has our name as part of the infoonClick={() => signIn()}
  return (
    <div className='px-6 pt-10 mb-16 lg:pl-20'>
      <nav className='flex items-center justify-between' aria-label='Global'>
        <div className='flex lg:flex-1'>
          <a href='#' className='-m-1.5 p-1.5'>
            <span className='sr-only'>App Amp</span>
            <h2 className='text-2xl font-bold drop-shadow-md'>App Amp</h2>
          </a>
        </div>
        {/* <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className='sr-only'>Open main menu</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div> */}

        {/* iterate through nav array to show links
        <div className='hidden lg:flex lg:gap-x-12'>
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className='text-md font-semibold leading-6 text-gray-900'
            >
              {item.name}
            </a>
          ))}
        </div> */}
        <div className="grid grid-cols-2 justify-end">
          <NewApplication />
          <div className='hidden lg:flex lg:flex-1 items-center'>
            <a onClick={() => signOut({ callbackUrl: '/' })} className='rounded-md text-sm cursor-pointer ml-4 bg-indigo-600 px-3.5 py-1.5 hover:shadow-md font-semibold leading-7 text-white shadow-sm hover:scale-105 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
              Logout
            </a>
          </div>
        </div>
      </nav>

    </div >
  );
};
export default Navbar;
