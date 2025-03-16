"use client"
import React from "react";
import ServiceCard from "../_components/ServiceCard/ServiceCard";

const OurServices = () => {
  return (
    <div className="w-1/2 mx-auto flex flex-col  items-center h-[calc(100vh-60px)]">
      <h1 className="text-3xl my-20 text-white">Our Services</h1>
      <div className="grid grid-cols-3 gap-10 ">
        
        <ServiceCard title="Software Support" imgsrc="/software.png" description="do you have a problem with your software?" href="/problemform/software-support"></ServiceCard>
        <ServiceCard title="Network Maintenance" description="is your network down?" imgsrc="/network.png" href="/problemform/network-maintenance"></ServiceCard>
        <ServiceCard title="consulting" description="do you need help with general issues?" imgsrc="/consulting.png" href="/problemform/consulting"></ServiceCard>
        
      </div>
    </div>
  );
};

export default OurServices;
