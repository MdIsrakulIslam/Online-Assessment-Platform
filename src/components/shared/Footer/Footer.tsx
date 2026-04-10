import React from 'react';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="w-full bg-[#1e1c2a] text-white py-4 px-8 flex justify-between items-center text-sm md:flex-row flex-col gap-2 z-50 mt-auto">
            <div className="flex items-center gap-2">
                <span className="text-gray-300">Powered By</span>
                <Image src="/footer.png" alt="Powered By AKIJ BOARD" width={110} height={30} className="object-contain" />
            </div>
            <div className="flex items-center gap-4 text-gray-300 text-xs md:text-sm">
                <span>Helpline: <span className="text-white">+88 01313020305</span></span>
                <span className="border-l border-gray-500 pl-4 text-white">support@akij.com</span>
            </div>
        </footer>
    );
};

export default Footer;