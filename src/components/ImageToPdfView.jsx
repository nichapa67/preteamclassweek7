import React, { useState } from 'react';
import {
  PlusCircle,
  RotateCcw,
  RotateCw,
  Trash2,
  ChevronDown,
  ZoomIn,
  Copy,
  Plus,
  CheckSquare
} from 'lucide-react';

export default function ImageToPdfView({ onDone }) {
  const [selectAll, setSelectAll] = useState(false);
  const [card1Selected, setCard1Selected] = useState(true);
  const [card2Selected, setCard2Selected] = useState(false);
  
  // State สำหรับ Popup ตั้งชื่อไฟล์
  const [showNameModal, setShowNameModal] = useState(false);
  const [fileName, setFileName] = useState('homework');

  const handleFinishClick = () => {
    setShowNameModal(true); // เปิด Popup เมื่อกดปุ่มเสร็จสิ้น
  };

  const handleConfirmName = () => {
    // ส่งชื่อไฟล์กลับไปให้หน้า AssignmentDetailView
    onDone(fileName);
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col relative">
      
      {/* Popup ตั้งชื่อไฟล์ */}
      {showNameModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-[380px] shadow-2xl">
            <h3 className="text-[20px] font-bold text-gray-900 mb-4 text-center">ตั้งชื่อไฟล์ PDF</h3>
            
            <input
              type="text"
              autoFocus
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="ชื่อไฟล์ (ไม่ต้องใส่ .pdf)"
              className="w-full h-[44px] px-4 border border-gray-300 rounded-xl outline-none focus:border-[#0AA2FF] text-[16px] mb-6 text-gray-900 font-medium"
            />
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowNameModal(false)}
                className="flex-1 py-2.5 text-gray-600 font-bold bg-gray-100 hover:bg-gray-200 rounded-xl transition cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleConfirmName}
                className="flex-1 py-2.5 bg-[#0AA2FF] text-white font-bold rounded-xl hover:opacity-90 transition cursor-pointer"
              >
                ตกลง
              </button>
            </div>
          </div>
        </div>
      )}

      {/* แถบเครื่องมือด้านบน */}
      <div className="h-[64px] border-b border-gray-200 flex items-center justify-between px-6 shrink-0 bg-white">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 border border-gray-300 rounded px-2 py-1.5 hover:bg-gray-50 transition cursor-pointer">
            <PlusCircle className="w-[18px] h-[18px] text-gray-700" strokeWidth={2} />
            <ChevronDown className="w-4 h-4 text-gray-700" strokeWidth={2} />
          </button>
          <div className="w-[1px] h-6 bg-gray-300 mx-1"></div>
          
          <div className="flex items-center gap-2">
            <button className="p-1.5 border border-gray-200 rounded text-gray-400 cursor-not-allowed">
              <RotateCcw className="w-[18px] h-[18px]" strokeWidth={2} />
            </button>
            <button className="p-1.5 border border-gray-200 rounded text-gray-400 cursor-not-allowed">
              <RotateCw className="w-[18px] h-[18px]" strokeWidth={2} />
            </button>
            <button className="p-1.5 border border-gray-200 rounded text-gray-300 cursor-not-allowed">
              <Trash2 className="w-[18px] h-[18px]" strokeWidth={2} />
            </button>
          </div>
          
          <button className="flex items-center gap-3 border border-gray-300 rounded px-3 py-1.5 ml-2 hover:bg-gray-50 transition text-[14px] font-medium text-gray-800 cursor-pointer">
            A4 <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>
          <button className="flex items-center gap-3 border border-gray-300 rounded px-3 py-1.5 hover:bg-gray-50 transition text-[14px] font-medium text-gray-800 cursor-pointer">
            แนวตั้ง <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <button
          onClick={handleFinishClick}
          className="bg-[#0AA2FF] hover:opacity-90 transition text-white font-bold text-[16px] px-8 py-2 rounded-full cursor-pointer shadow-sm"
        >
          เสร็จสิ้น
        </button>
      </div>

      {/*  พื้นที่จัดการเอกสาร */}
      <div className="flex-1 p-6 bg-white">
        <div className="w-full h-full min-h-[600px] bg-[#F4F8FD] rounded-xl p-8 shadow-sm border border-[#E5EFFB]">
          
          <label 
            className="flex items-center gap-3 cursor-pointer w-fit select-none"
            onClick={() => {
              const newVal = !selectAll;
              setSelectAll(newVal);
              setCard1Selected(newVal);
              setCard2Selected(newVal);
            }}
          >
            {selectAll ? (
              <div className="w-6 h-6 border-2 border-[#1E2D4A] rounded flex items-center justify-center bg-white">
                <div className="w-3.5 h-3.5 bg-[#1E2D4A] rounded-sm"></div>
              </div>
            ) : (
              <div className="w-6 h-6 border-2 border-[#1E2D4A] rounded bg-white"></div>
            )}
            <span className="text-[17px] font-bold text-gray-900">เลือกทั้งหมด</span>
          </label>

          <div className="flex items-center gap-5 mt-8">
            <div className={`p-2.5 rounded-lg ${card1Selected ? 'bg-[#D6E3FD]' : 'bg-transparent'} flex flex-col w-[200px] transition-colors duration-200`}>
              <div className="flex items-center justify-between mb-2 px-0.5">
                <button onClick={() => setCard1Selected(!card1Selected)}>
                  {card1Selected ? (
                    <div className="w-[20px] h-[20px] border-[1.5px] border-gray-600 rounded bg-white flex items-center justify-center">
                       <CheckSquare className="w-[18px] h-[18px] text-gray-700 -m-1" />
                    </div>
                  ) : (
                    <div className="w-[20px] h-[20px] border-[1.5px] border-gray-400 rounded bg-white"></div>
                  )}
                </button>
                {card1Selected && (
                  <div className="flex items-center gap-2 text-gray-600 bg-white px-1.5 py-0.5 rounded shadow-sm border border-gray-200">
                    <ZoomIn className="w-[15px] h-[15px] hover:text-black cursor-pointer" />
                    <RotateCw className="w-[15px] h-[15px] hover:text-black cursor-pointer" />
                    <Copy className="w-[15px] h-[15px] hover:text-black cursor-pointer" />
                    <Trash2 className="w-[15px] h-[15px] hover:text-red-500 cursor-pointer" />
                  </div>
                )}
              </div>
              
              <div className="w-full aspect-[1/1.414] bg-white flex flex-col items-center justify-center shadow-sm border border-gray-200 overflow-hidden">
                <div className="w-full h-full bg-[#FFEBF0] flex flex-col items-center justify-center text-[#FF8DA7] relative">
                  <span className="text-[22px] font-extrabold tracking-wide">นำเสนอ</span>
                  <span className="text-[14px] font-bold mt-1">โครงงานครั้งที่ 3</span>
                  <div className="absolute top-4 left-3 w-4 h-4 bg-pink-300 rounded-full opacity-60"></div>
                  <div className="absolute bottom-5 right-4 w-5 h-5 bg-pink-300 rounded-full opacity-60"></div>
                  <div className="absolute top-1/2 right-2 w-2 h-2 bg-pink-300 rounded-full opacity-60"></div>
                </div>
              </div>
              
              <div className="mt-3.5 flex justify-center">
                <span className="bg-[#EFDF95] text-[#554A29] text-[12px] font-bold px-2.5 py-0.5 rounded shadow-sm">
                  งานแปลงpdf.png
                </span>
              </div>
            </div>

            <button className="w-[26px] h-[26px] rounded-full bg-[#8FB8FF] text-white flex items-center justify-center hover:bg-[#6D9CFF] transition shadow-sm cursor-pointer shrink-0">
              <Plus className="w-5 h-5" strokeWidth={3} />
            </button>

            <div className={`p-2.5 rounded-lg ${card2Selected ? 'bg-[#D6E3FD]' : 'bg-transparent'} flex flex-col w-[200px] transition-colors duration-200`}>
              <div className="flex items-center justify-between mb-2 px-0.5">
                <button onClick={() => setCard2Selected(!card2Selected)}>
                  {card2Selected ? (
                    <div className="w-[20px] h-[20px] border-[1.5px] border-gray-600 rounded bg-white flex items-center justify-center">
                       <CheckSquare className="w-[18px] h-[18px] text-gray-700 -m-1" />
                    </div>
                  ) : (
                    <div className="w-[20px] h-[20px] border-[1.5px] border-gray-300 rounded bg-white shadow-sm"></div>
                  )}
                </button>
              </div>
              
              <div className="w-full aspect-[1/1.414] bg-white shadow-sm border border-gray-200"></div>
              
              <div className="mt-3.5 flex justify-center">
                <span className="text-gray-700 text-[13px] font-bold">หน้าว่าง</span>
              </div>
            </div>

            <button className="w-[26px] h-[26px] rounded-full bg-[#8FB8FF] text-white flex items-center justify-center hover:bg-[#6D9CFF] transition shadow-sm cursor-pointer shrink-0">
              <Plus className="w-5 h-5" strokeWidth={3} />
            </button>

            <div className="flex flex-col w-[180px] p-2.5">
              <div className="h-[28px] mb-2"></div>
              <div className="w-full aspect-[1/1.414] border-[1.5px] border-dashed border-[#8FB8FF] bg-transparent flex flex-col items-center justify-center text-[#6D9CFF] gap-3 cursor-pointer hover:bg-blue-50/50 transition rounded-sm">
                <PlusCircle className="w-8 h-8" strokeWidth={1.5} />
                <div className="text-center text-[14px] font-medium leading-snug">
                  <p>เพิ่มไฟล์รูปภาพ</p>
                  <p>เช่น jpg, png</p>
                </div>
              </div>
              <div className="mt-3.5 h-[20px]"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}