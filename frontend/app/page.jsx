"use client";
import Image from "next/image";
import Link from "next/link";
import InfoCard from "../components/infoCard.jsx";

import { FaUniversity, FaArrowRight } from "react-icons/fa";
import { MdPeopleOutline } from "react-icons/md";
import { LiaHandshake } from "react-icons/lia";
import { AiOutlineCompass } from "react-icons/ai";
import { FaRegBell } from "react-icons/fa6";

const infoCard = [
  {
    icon: (
      <MdPeopleOutline className=" bg-[#f5f5f5] text-blue-600 text-6xl rounded-[50%] mb-2 p-2" />
    ),
    title: "Connect",
    desc: "Find and connect with students from your campus and beyond."
  },
  {
    icon: (
      <LiaHandshake className=" bg-[#f5f5f5] text-blue-600 text-6xl rounded-[50%] mb-2 p-2" />
    ),
    title: "Collaborate",
    desc: "Work on projects, exchange ideas and grow together."
  },
  {
    icon: (
      <AiOutlineCompass className=" bg-[#f5f5f5] text-blue-600 text-6xl rounded-[50%] mb-2 p-2" />
    ),
    title: "Discover",
    desc: "Explore events, clubs and opportunities around you."
  },
  {
    icon: (
      <FaRegBell className=" bg-[#f5f5f5] text-blue-600 text-6xl rounded-[50%] mb-2 p-2" />
    ),
    title: "Stay Updated",
    desc: "Get the latest updates and announcements in one place."
  },
];

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col px-4 md:px-10 lg:px-20">
      {/* Header */}
      <div className="flex justify-between items-center sm:justify-normal">
        <div className=" w-full flex items-center gap-2 py-4 sm:gap-2">
          <FaUniversity className=" text-3xl md:text-5xl text-blue-700" />
          <h1 className="text-2xl md:text-3xl font-semibold">
            Campus
            <span className="text-blue-700 text-xl md:text-2xl">Forum</span>
          </h1>
        </div>
        <div className="hidden sm:flex sm:gap-2 md:gap-4 md:flex-row">
          <Link
            href="/login"
            className="border-2 border-blue-700 py-1 active:bg-blue-700 active:text-white px-4 md:px-6 rounded text-center"
          >
            Login
          </Link>
          <Link
            href="/login"
            className="border-2 border-blue-700 py-1 bg-blue-700 text-white active:bg-blue-400 px-4 md:px-6 rounded text-center"
          >
            Signup
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col gap-8 py-5 md:gap-12 md:py-0 lg:flex-row">
        {/* Left Content */}
        <div>
          <div className="text-3xl md:text-5xl font-bold leading-tight">
            <h1>Your Campus.</h1>
            <h1>Your Community.</h1>
            <h1 className="text-blue-700">Your Home.</h1>
          </div>
          <p className="text-gray-700 mt-5 text-base md:text-base">
            Campus Forum is the ultimate platform for students to
            <br className="hidden sm:block" />
            connect, share ideas, join events, and build a stronger
            <br className="hidden sm:block" />
            campus community.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 my-5">
            <Link
              href="/login"
              className="bg-blue-700 text-white active:bg-blue-400 border-2 border-blue-700 py-2 px-6 rounded text-center"
            >
              Join Campus Forum
            </Link>
            <a
              href=""
              className="border-2 border-blue-700 active:bg-blue-700 active:text-white py-2 px-6 rounded text-center"
            >
              Explore Communities
            </a>
          </div>
          <div>
            <p className="font-semibold">
              Hello, 10K+ Students <br />{" "}
              <span className="text-gray-700 font-normal">
                already connected
              </span>
            </p>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 relative ">
          <Image
            src="/landing_img.png"
            loading="eager"
            width={400}
            height={300}
            alt="Campus Forum"
            className="w-full  rounded-lg"
          />
          {/* Overlay */}
          <div className="hidden md:block absolute top-0 left-0 h-full w-1/4  bg-linear-to-r from-white via-transparent to-transparent"></div>
        </div>
      </div>

      <div className="mt-10 lg:px-20">
        <div className="flex flex-col md:items-center" >
          <h1 className="text-xl font-bold sm:text-3xl">Why Campus Forum?</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-4 my-5">
            {infoCard.map((item, index) =>
            (<InfoCard
              key={index}
              icon={item.icon}
              title={item.title}
              desc={item.desc}
            />))
          }
          </div>
        </div>

        <div className="bg-[#0f3e709a] flex flex-col p-5 md:flex-row md:py-10 my-10 rounded-xl lg:px-30">
          <FaUniversity className=" text-6xl m-auto md:text-8xl text-blue-700" />
          <div className="flex flex-col sm:items-center mt-5 md:mx-20">
            <h1 className="text-xl font-medium md:text-2xl">Be a part of something bigger</h1>
            <p className="text-[14px] text-clip mb-5 mt-2">Campus Forum is more than just a plateform - it's a movement <br />
              to build stronger, smarter and more connected campuses
            </p>
            <Link
              href="/login"
              className="bg-blue-700 max-w-65 text-white active:bg-blue-400 py-3 px-8 rounded-[10px]"
            >
              Join Campus Forum
              <FaArrowRight className="ml-2 inline-block text-xl " />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
