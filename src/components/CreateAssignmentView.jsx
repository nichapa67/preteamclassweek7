import React, { useState } from 'react';
import { 
  ChevronDown, 
  Bold, 
  Italic, 
  Underline, 
  Upload, 
  Users,
  Square,
  CheckSquare
} from 'lucide-react';

export default function CreateAssignmentView({ onCancel }) {
  const [isGroupWork, setIsGroupWork] = useState(false);
  const [groupSize, setGroupSize] = useState(2);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      
      {/* แถบเครื่องมือด้านบน (Header) */}
      <div className="h-[64px] border-b border-gray-200 flex items-center justify-between px-8 shrink-0 bg-white sticky top-0 z-10">
        <div className="flex items-baseline gap-4">
          <h1 className="text-[22px] font-bold text-[#1E2D4A]">สร้างงาน</h1>
          <span className="text-[14px] text-gray-500 font-medium">บันทึกแล้ว...</span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onCancel}
            className="text-[16px] font-bold text-gray-400 hover:text-gray-600 transition cursor-pointer"
          >
            ยกเลิก
          </button>
          
          <div className="flex">
            <button className="bg-[#0AA2FF] hover:bg-[#0090e6] transition text-white font-bold text-[16px] px-5 py-2 rounded-l-full cursor-pointer shadow-sm">
              มอบหมาย
            </button>
            <button className="bg-[#0AA2FF] hover:bg-[#0090e6] transition text-white border-l border-white/30 px-2 rounded-r-full flex items-center justify-center cursor-pointer shadow-sm">
              <ChevronDown className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {/* พื้นที่เนื้อหา (Workspace) */}
      <div className="flex-1 p-6 md:p-8 bg-white max-w-[1100px] w-full mx-auto flex flex-col md:flex-row gap-6 items-start">
        
        {/* คอลัมน์ซ้าย (ฟอร์มกรอกข้อมูล) */}
        <div className="flex-1 flex flex-col gap-6 w-full">
          
          {/* กล่อง 1: ชื่อและคำอธิบาย */}
          <div className="border-[1.5px] border-[#BEE0FD] rounded-xl p-6 bg-white shadow-sm">
            <p className="text-[14px] font-bold text-red-500 mb-2">*จำเป็น</p>
            
            {/* Input ชื่อ */}
            <div className="bg-[#F4F7FB] rounded-t-md border-b-2 border-gray-300 focus-within:border-[#0AA2FF] transition px-4 py-3 mb-6">
              <input 
                type="text" 
                placeholder="ชื่อ" 
                className="w-full bg-transparent outline-none text-[18px] text-gray-900 font-bold placeholder-gray-800"
              />
            </div>

            {/* Input คำอธิบาย */}
            <div className="bg-[#F4F7FB] rounded-t-md border-b-2 border-gray-300 focus-within:border-[#0AA2FF] transition px-4 pt-3 pb-2 flex flex-col h-[180px]">
              <textarea 
                placeholder="คำอธิบาย(ไม่บังคับ)" 
                className="w-full flex-1 bg-transparent outline-none resize-none text-[15px] text-gray-800 placeholder-gray-500"
              ></textarea>
              
              {/* แถบเครื่องมือจัดรูปแบบตัวอักษร */}
              <div className="flex items-center gap-4 mt-2 pt-2 border-t border-gray-200/50 text-[#1E2D4A]">
                <button className="hover:text-black transition p-1"><Bold className="w-5 h-5" strokeWidth={2.5} /></button>
                <button className="hover:text-black transition p-1"><Italic className="w-5 h-5" strokeWidth={2.5} /></button>
                <button className="hover:text-black transition p-1"><Underline className="w-5 h-5" strokeWidth={2.5} /></button>
              </div>
            </div>
          </div>

          {/* กล่อง 2: แนบไฟล์ */}
          <button className="border-[1.5px] border-[#BEE0FD] rounded-xl p-5 bg-white shadow-sm flex items-center gap-3 hover:bg-blue-50/50 transition cursor-pointer text-[#1E2D4A]">
            <span className="text-[18px] font-bold">แนบไฟล์</span>
            <Upload className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>

        {/* คอลัมน์ขวา (แถบตั้งค่า) */}
        <div className="w-full md:w-[320px] shrink-0 border-[1.5px] border-[#BEE0FD] rounded-xl p-6 bg-white shadow-sm flex flex-col gap-5">
          
          {/* สำหรับชั้นเรียน */}
          <div>
            <label className="block text-[15px] font-bold text-gray-900 mb-2">สำหรับชั้นเรียน</label>
            <button className="w-full bg-[#F4F7FB] flex items-center justify-between px-3 py-2.5 rounded-md text-[15px] font-medium text-gray-800 hover:bg-gray-100 transition">
              Subject1 <ChevronDown className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* มอบหมายให้ */}
          <div>
            <label className="block text-[15px] font-bold text-gray-900 mb-2">มอบหมายให้</label>
            <button className="w-full border border-[#BEE0FD] flex items-center justify-center gap-2 px-3 py-2.5 rounded-full text-[14px] font-bold text-gray-800 hover:bg-blue-50 transition cursor-pointer">
              <Users className="w-4 h-4 text-[#1E2D4A]" strokeWidth={2.5} />
              นักเรียนทั้งหมด
            </button>
          </div>

          {/* ตัวเลือก งานเดี่ยว/งานกลุ่ม */}
          <div className="flex flex-col gap-3 mt-1 ml-1">
            <label className="flex items-center gap-3 cursor-pointer" onClick={() => setIsGroupWork(false)}>
              {!isGroupWork ? <CheckSquare className="w-[22px] h-[22px] text-[#1E2D4A]" /> : <Square className="w-[22px] h-[22px] text-gray-400" />}
              <span className="text-[16px] font-bold text-gray-900">งานเดี่ยว</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer" onClick={() => setIsGroupWork(true)}>
              {isGroupWork ? <CheckSquare className="w-[22px] h-[22px] text-[#1E2D4A]" /> : <Square className="w-[22px] h-[22px] text-gray-400" />}
              <span className="text-[16px] font-bold text-gray-900 flex items-center gap-3">
                งานกลุ่ม
                {isGroupWork && (
                  <input 
                    type="number" 
                    value={groupSize}
                    onChange={(e) => setGroupSize(e.target.value)}
                    className="w-[45px] h-[30px] border border-[#BEE0FD] rounded text-center text-[15px] outline-none focus:border-[#0AA2FF]"
                    min="2"
                  />
                )}
              </span>
            </label>
          </div>

          {/* คะแนน */}
          <div className="mt-2">
            <div className="flex items-center gap-4">
              <label className="text-[15px] font-bold text-gray-900">คะแนน</label>
              <button className="bg-[#F4F7FB] flex items-center justify-between px-3 py-1.5 rounded-md text-[15px] font-medium text-gray-800 hover:bg-gray-100 transition min-w-[80px]">
                100 <ChevronDown className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* วันและเวลาที่ครบกำหนด */}
          <div className="mt-2">
            <label className="block text-[15px] font-bold text-gray-900 mb-2">วันและเวลาที่ครบกำหนด</label>
            <button className="w-full bg-[#F4F7FB] flex items-center justify-between px-3 py-2.5 rounded-md text-[15px] font-medium text-gray-800 hover:bg-gray-100 transition">
              ไม่มีวันที่ครบกำหนด <ChevronDown className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* หัวข้อ */}
          <div className="mt-2">
            <label className="block text-[15px] font-bold text-gray-900 mb-2">หัวข้อ</label>
            <button className="w-full bg-[#F4F7FB] flex items-center justify-between px-3 py-2.5 rounded-md text-[15px] font-medium text-gray-800 hover:bg-gray-100 transition">
              ไม่มีหัวข้อ <ChevronDown className="w-5 h-5 text-gray-600" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}