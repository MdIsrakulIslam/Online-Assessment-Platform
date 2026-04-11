// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import React from 'react';
// // import { useSession } from 'next-auth/react';

// import Image from 'next/image';
// import { RiArrowDropDownLine } from 'react-icons/ri';

// const NavBar = () => {
//     // const { data: session } = useSession();
//     const user = localStorage.getItem("user");
//     console.log("User from localStorage:", user ? JSON.parse(user).email : null);

//     return (
//         <nav className="h-[72px] w-full bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-50">
//             <div className="flex items-center gap-2">
//                 <Image src="/navber.png" alt="Akij Resource" width={150} height={40} className="object-contain w-24 md:w-[150px]" />
//             </div>

//             {/* {session && session.user && ( */}
//                 <div className="flex items-center gap-2 md:gap-3">
//                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-300 flex items-center justify-center shrink-0">
//                         {/* <span className="text-gray-500 font-bold text-sm md:text-base">{session.user.name?.charAt(0)}</span> */}
//                     </div>
//                     <div className=" flex-col justify-center hidden sm:flex">
//                        <div className="flex items-center gap-1">
//                         <div>
//                          {/* <p className="text-sm font-bold text-gray-800 leading-tight">{session.user.name}</p> */}
//                         {/* <p className="text-xs text-gray-500 leading-tight">{(session.user as any).id}</p> */}
//                        </div>
//                        <div>
//                         <RiArrowDropDownLine className='w-5 h-5' />
//                        </div>
//                        </div>
//                     </div>

//                 </div>
//             {/* )} */}
//         </nav>
//     );
// };

// export default NavBar;

"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

type UserType = {
  email: string;
  role: string;
};

const NavBar = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsDropdownOpen(false);
    router.push("/auth/login");
  };

  return (
    <nav className="h-[72px] w-full bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image
          src="/navber.png"
          alt="Akij Resource"
          width={150}
          height={40}
          className="object-contain w-24 md:w-[150px]"
        />
      </div>

      {/* User Info Layout */}
      {user && (
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-2 md:gap-3 cursor-pointer select-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {/* Avatar */}
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 border flex items-center justify-center">
              <span className="text-gray-700 font-bold">
                {user.email.charAt(0).toUpperCase()}
              </span>
            </div>

            {/* Info */}
            <div className="hidden sm:flex flex-col">
              <div className="flex items-center gap-1">
                <div>
                  <p className="text-sm font-bold text-gray-800">{user.email}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>

                <RiArrowDropDownLine className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-3 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <button
                onClick={handleLogout}
                className="w-full text-left px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
