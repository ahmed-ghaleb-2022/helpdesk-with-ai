"use client";


export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-60px)]  relative">
      <h1 className="text-4xl font-bold text-white mb-4 relative -top-16">Helpdesk Ticketing System</h1>
      <p className="text-white text-xl">Fahad Bin Sultan University</p>
      <p className="mb-12 text-white text-lg">Tabuk, Saudi Arabia</p>
      <img src="/ai-robot.png" alt="" className=" animate-bounce w-52 absolute bottom-28 " />
    </div>
  );
}
