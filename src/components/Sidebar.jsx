import React, { useContext, useState } from "react";
import { IoMenu, IoSettings } from "react-icons/io5";
import { FaHistory, FaPlus } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { BsQuestionCircle } from "react-icons/bs";
import { Context } from "../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompt, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async(prompt)=>{
    setRecentPrompt(prompt)
    await onSent(prompt)
  }

  return (
    <div>
      <div className="min-h-screen inline-flex flex-col justify-between bg-[#e4e7eb] py-6 px-4">
        <div>
          <IoMenu onClick={() => setExtended(!extended)} className="text-2xl" />
          <div onClick={()=>newChat()} className="mt-[10px] inline-flex items-center gap-[10px] py-[10px] px-[15px] text-[14px] text-gray-500 cursor-pointer bg-gray-300 rounded-full">
            <FaPlus className="text-2xl " />
            {extended && <p>New Chat</p>}
          </div>
          {extended && (
            <div className="flex flex-col fadein">
              <p className="mt-7 mb-5">recent</p>

              {prevPrompt?.map((item, index) => {
                return (
                  <div onClick={()=>loadPrompt(item)} className="flex items-center gap-2 p-2 pr-10 rounded-[50px] cursor-pointer hover:bg-gray-300">
                    <FaMessage className="text-2xl" />
                    <p>{item.slice(0,18)}...</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 p-2 pr-10 rounded-[50px] text-slate-700 cursor-pointer hover:bg-gray-300">
            <BsQuestionCircle className="text-2xl" />
            {extended && <p>Help</p>}
          </div>
          <div className="flex items-center gap-2 p-2 pr-10 rounded-[50px] text-slate-700 cursor-pointer hover:bg-gray-300">
            <FaHistory className="text-2xl" />
            {extended && <p>Activity</p>}
          </div>
          <div className="flex items-center gap-2 p-2 pr-10 rounded-[50px] text-slate-700 cursor-pointer hover:bg-gray-300">
            <IoSettings className="text-2xl" />
            {extended && <p>Settings</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
