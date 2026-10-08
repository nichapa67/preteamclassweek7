import React, { useState } from 'react';
import ImageToPdfView from './ImageToPdfView';

import { 
  ClipboardList, 
  MessageSquare, 
  Plus, 
  User,
  Link,
  Paperclip,
  File
} from 'lucide-react';

export default function AssignmentDetailView({ assignment, onBack }) {
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [showImageToPdf, setShowImageToPdf] = useState(false);
  
  // State จัดการว่าผู้ใช้ "ส่งงาน" ไปแล้วหรือยัง
  const [submittedFile, setSubmittedFile] = useState(null);

  const title = assignment?.title || 'งาน';
  const instructor = assignment?.instructor || 'ชื่ออาจารย์';
  const time = assignment?.time || assignment?.date || '12.35';
  const score = assignment?.score || '100 คะแนน';
  const due = assignment?.due || '25 ก.ค. 23:59';
  
  let type = assignment?.subtitle || assignment?.type || 'งานเดี่ยว';
  if (type === 'assignment') type = 'งานเดี่ยว';

  // เมื่ออยู่หน้าแปลง PDF แล้วกด "ตกลง" ระบบจะนำชื่อไฟล์มาเซ็ตสถานะเป็นส่งงานแล้ว
  if (showImageToPdf) {
    return (
      <ImageToPdfView 
        onDone={(fileName) => {
          // เก็บชื่อไฟล์ที่ได้มาจาก Modal (ถ้าไม่พิมพ์ให้ใช้ 'homework')
          setSubmittedFile({
            name: `${fileName || 'homework'}.pdf`,
            type: 'PDF'
          });
          setShowImageToPdf(false);
        }} 
      />
    );
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="max-w-[1000px] mx-auto px-6 py-8 flex flex-col md:flex-row gap-8">
        
        {/* คอลัมน์ซ้าย: รายละเอียดงานและความคิดเห็น  */}
        <div className="flex-1">
          <div className="flex items-center gap-5">
            <div className="w-[56px] h-[56px] rounded-full border-[2.5px] border-[#1E2D4A] flex items-center justify-center bg-white shrink-0">
              <ClipboardList className="w-[26px] h-[26px] text-[#1E2D4A]" strokeWidth={2.5} />
            </div>
            <h1 className="text-[38px] font-bold text-gray-900 leading-none tracking-tight">
              {title}
            </h1>
          </div>

          <div className="mt-4">
            <p className="text-[16px] text-[#3c4043] font-medium">
              {instructor} <span className="text-[#1E2D4A] mx-2 font-bold">&bull;</span> {time}
            </p>
            <p className="text-[17px] font-bold text-black mt-1.5">
              {type} 
              <span className="text-[#1E2D4A] mx-3 font-semibold">|</span> 
              {score} 
              <span className="text-[#1E2D4A] mx-3 font-semibold">|</span> 
              ครบกำหนด {due}
            </p>
          </div>

          <hr className="my-6 border-gray-300" />

          <div>
            <div className="flex items-center gap-3 mb-5">
              <User className="w-[22px] h-[22px] text-[#1E2D4A]" strokeWidth={2.5} />
              <span className="text-[18px] font-bold text-black">
                ความคิดเห็นในชั้นเรียน
              </span>
            </div>
            <button className="flex items-center gap-2 text-[#0AA2FF] text-[16px] font-bold hover:opacity-80 transition cursor-pointer">
              <MessageSquare className="w-[22px] h-[22px]" strokeWidth={2.5} />
              เพิ่มความคิดเห็น
            </button>
          </div>
        </div>

        {/* คอลัมน์ขวา: สถานะงานและการส่งงาน  */}
        <div className="w-full md:w-[320px] shrink-0 flex flex-col gap-5 mt-2 md:mt-0">
          
          <div className="bg-[#F4F7FB] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[24px] font-bold text-gray-900">งานของคุณ</h2>
              
              {/* เปลี่ยนสีและข้อความตรงมุมขวาบนเมื่อส่งงานแล้ว */}
              {submittedFile ? (
                <span className="text-[20px] font-bold text-[#00A024]">ส่งแล้ว</span>
              ) : (
                <span className="text-[14px] font-semibold text-gray-800">มอบหมายแล้ว</span>
              )}
            </div>
            
            {/* แยก UI ระหว่าง "ส่งงานแล้ว" และ "ยังไม่ส่งงาน" */}
            {submittedFile ? (

              // UI เมื่อทำการอัปโหลด/แปลงไฟล์สำเร็จแล้ว
              <>
                {/* การ์ดไฟล์ที่แนบ */}
                <div className="border-[1.5px] border-gray-300 rounded-xl overflow-hidden flex h-[80px] mb-4 bg-white cursor-pointer hover:bg-gray-50 transition shadow-sm">
                  
                  {/* ชื่อและประเภทไฟล์ */}
                  <div className="flex-1 px-5 flex flex-col justify-center">
                    <span className="text-[18px] font-bold text-black underline decoration-[1.5px] underline-offset-4 truncate">
                      {submittedFile.name}
                    </span>
                    <span className="text-[14px] font-bold text-gray-500 mt-1">{submittedFile.type}</span>
                  </div>
                  
                  {/* ภาพขนาดย่อ (Thumbnail ทางขวา) */}
                  <div className="w-[110px] h-full border-l-[1.5px] border-gray-300 shrink-0 relative overflow-hidden bg-[#FFEBF0] flex flex-col items-center justify-center text-[#FF8DA7]">
                    <span className="text-[18px] font-extrabold tracking-wide z-10">นำเสนอ</span>
                    <span className="text-[10px] font-bold mt-0.5 z-10">โครงงานครั้งที่ 7</span>
                    <div className="absolute top-2 left-2 w-4 h-4 bg-pink-300 rounded-full opacity-60"></div>
                    <div className="absolute bottom-2 right-2 w-5 h-5 bg-pink-300 rounded-full opacity-60"></div>
                  </div>
                </div>

                {/* ปุ่มยกเลิกการส่ง */}
                <button 
                  onClick={() => setSubmittedFile(null)}
                  className="w-full h-[46px] rounded-full border-2 border-[#BEE0FD] bg-white text-[#0AA2FF] font-bold text-[18px] flex items-center justify-center hover:bg-blue-50 transition cursor-pointer"
                >
                  ยกเลิกการส่ง
                </button>
              </>
            ) : (

              // UI เพิ่มงาน / ทำเครื่องหมายเสร็จสิ้น
              <>
                <div className="relative mb-3">
                  <button 
                    onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
                    className="w-full h-[40px] rounded-full border border-[#0AA2FF] text-[#0AA2FF] font-semibold text-[15px] flex items-center justify-center gap-2 hover:bg-blue-50 transition cursor-pointer"
                  >
                    <Plus className="w-5 h-5" />
                    เพิ่มงานเพื่อส่ง
                  </button>

                  {isAddMenuOpen && (
                    <div className="absolute top-[48px] left-0 w-full bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 py-2 z-10 flex flex-col">
                      <button className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition cursor-pointer text-left">
                        <Link className="w-6 h-6 text-[#1E2D4A]" strokeWidth={2.5} />
                        <span className="text-[18px] font-bold text-black tracking-wide">ลิงก์</span>
                      </button>
                      <button className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition cursor-pointer text-left">
                        <Paperclip className="w-6 h-6 text-[#1E2D4A]" strokeWidth={2.5} />
                        <span className="text-[18px] font-bold text-black tracking-wide">ไฟล์</span>
                      </button>
                      <hr className="my-1 border-gray-300" />
                      <button 
                        onClick={() => {
                          setIsAddMenuOpen(false);
                          setShowImageToPdf(true);
                        }}
                        className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition cursor-pointer text-left"
                      >
                        <div className="relative flex items-center justify-center shrink-0 w-6 h-6">
                          <File className="w-6 h-6 text-[#1E2D4A]" strokeWidth={2.5} />
                          <span className="absolute -bottom-1 -right-2 text-[9px] font-extrabold text-[#1E2D4A] bg-white px-[2px]">
                            PDF
                          </span>
                        </div>
                        <span className="text-[18px] font-bold text-black tracking-wide">แปลงรูปภาพเป็นpdf</span>
                      </button>
                    </div>
                  )}
                </div>
                
                <button className="w-full h-[40px] rounded-full bg-[#0AA2FF] text-white font-semibold text-[15px] hover:opacity-90 transition cursor-pointer">
                  ทำเครื่องหมายว่าเสร็จสิ้น
                </button>
              </>
            )}
          </div>

          <div className="bg-[#F4F7FB] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-gray-700" />
              <h2 className="text-[16px] font-medium text-gray-900">เพิ่มความคิดเห็นส่วนตัว</h2>
            </div>
            <button className="w-full h-[40px] rounded-full bg-white border border-[#0AA2FF] text-[#0AA2FF] font-semibold text-[14px] hover:bg-gray-50 transition cursor-pointer">
              เพิ่มความคิดเห็นส่งถึงอาจารย์
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}