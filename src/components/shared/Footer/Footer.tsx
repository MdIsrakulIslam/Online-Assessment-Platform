import Image from "next/image";
import { BsTelephoneOutbound } from "react-icons/bs";
import { CiMail } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="w-full bg-[#130B2C] text-white py-4 px-4 md:px-8 flex justify-between items-center text-sm flex-col md:flex-row gap-4 z-50 mt-auto">
      <div className="flex items-center gap-2 order-2 md:order-1">
        <span className="text-gray-300 text-xs md:text-sm">Powered By</span>
        <Image
          src="/footer.png"
          alt="Powered By AKIJ BOARD"
          width={110}
          height={30}
          className="object-contain w-20 md:w-[110px]"
        />
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4 text-gray-300 text-xs md:text-sm order-1 md:order-2">
        <div className="flex gap-2 items-center" >
          Helpline:
          <span className="flex gap-2 items-center">
            <BsTelephoneOutbound className="w-5 h-5"  /> <span className="text-white">+88 01313020305</span>
          </span>
        </div>
        {/* <span className="hidden sm:inline border-l border-gray-500 h-4"></span> */}

        <div className="flex gap-2 items-center">
          <CiMail className="w-5 h-5" />
          <span className="text-white">support@akij.com</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
