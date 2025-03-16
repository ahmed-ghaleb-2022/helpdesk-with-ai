'use client';

import Link from "next/link";
import Image from "next/image";


const ServiceCard = ({ title, description, href, imgsrc}) => {
  
  return (
    <Link href={href}>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition duration-300 ease-in-out flex flex-col items-center h-48">
        <img src={imgsrc} alt="Service Icon" width={70} height={70} />
        <h2 className="text-lg font-semibold mt-2">{title}</h2>
        <p className="text-gray-600 mt-2 text-center">{description}</p>
        
      </div>
    </Link>
  );
};

export default ServiceCard;
