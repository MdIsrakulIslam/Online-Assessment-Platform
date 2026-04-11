/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';
import { useSession } from 'next-auth/react';

import Image from 'next/image';
import { RiArrowDropDownLine } from 'react-icons/ri';

const NavBar = () => {
    const { data: session } = useSession();

    return (
        <nav className="h-[72px] w-full bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <Image src="/navber.png" alt="Akij Resource" width={150} height={40} className="object-contain w-24 md:w-[150px]" />
            </div>

            {session && session.user && (
                <div className="flex items-center gap-2 md:gap-3">
                     <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-300 flex items-center justify-center shrink-0">
                        <span className="text-gray-500 font-bold text-sm md:text-base">{session.user.name?.charAt(0)}</span>
                    </div>
                    <div className=" flex-col justify-center hidden sm:flex">
                       <div className="flex items-center gap-1">
                        <div>
                         <p className="text-sm font-bold text-gray-800 leading-tight">{session.user.name}</p>
                        <p className="text-xs text-gray-500 leading-tight">{(session.user as any).id}</p>
                       </div>
                       <div>
                        <RiArrowDropDownLine  />
                       </div>
                       </div>
                    </div>
                   
                </div>
            )}
        </nav>
    );
};

export default NavBar;