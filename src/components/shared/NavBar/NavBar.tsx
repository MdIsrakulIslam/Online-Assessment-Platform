/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';
import { useSession } from 'next-auth/react';

import Image from 'next/image';

const NavBar = () => {
    const { data: session } = useSession();

    return (
        <nav className="h-[72px] w-full bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <Image src="/navber.png" alt="Akij Resource" width={150} height={40} className="object-contain" />
            </div>
            
            {session && session.user && (
                <div className="flex items-center gap-3">
                    <div className="text-right flex flex-col justify-center">
                        <p className="text-sm font-bold text-gray-800 leading-tight">{session.user.name}</p>
                        <p className="text-xs text-gray-500 leading-tight">({(session.user as any).id})</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-300 flex items-center justify-center">
                        <span className="text-gray-500 font-bold">{session.user.name?.charAt(0)}</span>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;