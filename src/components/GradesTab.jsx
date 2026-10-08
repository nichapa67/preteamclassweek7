import React, { useState } from 'react';
import { ChevronDown, MoreVertical, Users } from 'lucide-react';

export default function GradesTab() {
  // State สำหรับการจัดเรียง (เรียงตามชื่อ / เรียงตามนามสกุล)
  const [sortOption, setSortOption] = useState('เรียงตามชื่อ');
  const [isSortOpen, setIsSortOpen] = useState(false);

  // State สำหรับประเภทงาน (งานเดี่ยว / งานกลุ่ม)
  const [assignmentType, setAssignmentType] = useState('งานเดี่ยว');
  const [isTypeOpen, setIsTypeOpen] = useState(false);

  // ข้อมูลงานทั้งหมด (มีทั้งเดี่ยวและกลุ่ม)
  const allAssignments = [
    { id: 'a1', date: '25 ก.ค.', title: 'งาน', maxScore: 100, type: 'งานเดี่ยว' },
    { id: 'a2', date: '25 ก.ค.', title: 'โปรเจค', maxScore: 100, type: 'งานกลุ่ม' }
  ];

  // กรองงานตามที่เลือก (งานเดี่ยว หรือ งานกลุ่ม)
  const filteredAssignments = allAssignments.filter(a => a.type === assignmentType);

  // ข้อมูลนักเรียน
  const students = [
    { id: 's1', firstName: 'สมชาย', lastName: 'ใจดี', name: 'ชื่อนักศึกษา', initial: 'P', bg: 'bg-purple-500' }
  ];

  return (
    <div className="w-full bg-white overflow-x-auto min-h-[500px]">
      <table className="w-full border-collapse min-w-[900px]">
        <thead>
          <tr>
            {/* คอลัมน์ที่ 1: เมนูจัดเรียง และ เมนูเลือกประเภทงาน */}
            <th className="border border-gray-200 p-4 text-left w-[280px] min-w-[280px] bg-white align-top">
              <div className="flex flex-col gap-2.5">
                
                {/* 1. ดรอปดาวน์: เรียงตามชื่อ / เรียงตามนามสกุล */}
                <div className="relative w-full">
                  <button 
                    onClick={() => {
                      setIsSortOpen(!isSortOpen);
                      setIsTypeOpen(false);
                    }}
                    className="flex items-center justify-between w-full h-[48px] px-5 border-[1.5px] border-[#CBE8FB] rounded-2xl text-[16px] text-gray-900 hover:bg-blue-50/50 transition cursor-pointer font-medium shadow-2xs bg-white"
                  >
                    <span>{sortOption}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-700 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isSortOpen && (
                    <div className="absolute left-0 right-0 top-[54px] bg-white border border-gray-100 rounded-xl shadow-xl py-1 z-30">
                      <button
                        onClick={() => {
                          setSortOption('เรียงตามชื่อ');
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-5 py-2.5 text-[15px] hover:bg-gray-50 transition cursor-pointer ${sortOption === 'เรียงตามชื่อ' ? 'font-bold text-[#0AA2FF]' : 'text-gray-700'}`}
                      >
                        เรียงตามชื่อ
                      </button>
                      <button
                        onClick={() => {
                          setSortOption('เรียงตามนามสกุล');
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-5 py-2.5 text-[15px] hover:bg-gray-50 transition cursor-pointer ${sortOption === 'เรียงตามนามสกุล' ? 'font-bold text-[#0AA2FF]' : 'text-gray-700'}`}
                      >
                        เรียงตามนามสกุล
                      </button>
                    </div>
                  )}
                </div>

                {/* 2. ดรอปดาวน์: งานเดี่ยว / งานกลุ่ม (อยู่ข้างล่าง) */}
                <div className="relative w-full">
                  <button 
                    onClick={() => {
                      setIsTypeOpen(!isTypeOpen);
                      setIsSortOpen(false);
                    }}
                    className="flex items-center justify-between w-full h-[48px] px-5 border-[1.5px] border-[#CBE8FB] rounded-2xl text-[16px] text-gray-900 hover:bg-blue-50/50 transition cursor-pointer font-medium shadow-2xs bg-white"
                  >
                    <span>{assignmentType}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-700 transition-transform ${isTypeOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isTypeOpen && (
                    <div className="absolute left-0 right-0 top-[54px] bg-white border border-gray-100 rounded-xl shadow-xl py-1 z-30">
                      <button
                        onClick={() => {
                          setAssignmentType('งานเดี่ยว');
                          setIsTypeOpen(false);
                        }}
                        className={`w-full text-left px-5 py-2.5 text-[15px] hover:bg-gray-50 transition cursor-pointer ${assignmentType === 'งานเดี่ยว' ? 'font-bold text-[#0AA2FF]' : 'text-gray-700'}`}
                      >
                        งานเดี่ยว
                      </button>
                      <button
                        onClick={() => {
                          setAssignmentType('งานกลุ่ม');
                          setIsTypeOpen(false);
                        }}
                        className={`w-full text-left px-5 py-2.5 text-[15px] hover:bg-gray-50 transition cursor-pointer ${assignmentType === 'งานกลุ่ม' ? 'font-bold text-[#0AA2FF]' : 'text-gray-700'}`}
                      >
                        งานกลุ่ม
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </th>

            {/* คอลัมน์แสดงงาน (เปลี่ยนตามประเภทงานเดี่ยว/กลุ่มที่เลือก) */}
            {filteredAssignments.map(a => (
              <th 
                key={a.id} 
                className="border border-gray-200 px-5 py-4 text-left w-[250px] min-w-[250px] bg-white align-top"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[15px] text-gray-900 font-medium whitespace-nowrap">{a.date}</p>
                    <p className="text-[20px] font-bold text-[#0AA2FF] cursor-pointer hover:underline mt-0.5">
                      {a.title}
                    </p>
                  </div>
                  <button className="p-1 -mr-2 text-gray-600 hover:text-black rounded-full cursor-pointer transition">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-4 pt-2.5 border-t border-gray-200">
                  <p className="text-[14px] text-gray-800 font-medium whitespace-nowrap">
                    คะแนนเต็ม {a.maxScore} คะแนน
                  </p>
                </div>
              </th>
            ))}

            <th className="border border-gray-200 bg-white w-full"></th>
          </tr>
        </thead>

        <tbody>
          {/* แถว: คะแนนเฉลี่ยในชั้นเรียน */}
          <tr>
            <td className="border border-gray-200 p-4 bg-white">
              <div className="flex items-center gap-4 pl-2">
                <Users className="w-[22px] h-[22px] text-[#1E2D4A]" strokeWidth={2.5} />
                <span className="text-[16px] font-bold text-gray-900">คะแนนเฉลี่ยในชั้นเรียน</span>
              </div>
            </td>
            {filteredAssignments.map(a => (
              <td key={`avg-${a.id}`} className="border border-gray-200 p-4 bg-white text-center"></td>
            ))}
            <td className="border border-gray-200 bg-white"></td>
          </tr>

          {/* แถว: รายชื่อนักเรียน */}
          {students.map(s => (
            <tr key={s.id} className="hover:bg-gray-50 transition-colors">
              <td className="border border-gray-200 p-4 bg-white">
                <div className="flex items-center gap-4 pl-1">
                  <div className={`w-[36px] h-[36px] rounded-full flex items-center justify-center text-white text-[18px] ${s.bg}`}>
                    {s.initial}
                  </div>
                  <span className="text-[15px] text-gray-900 font-medium">{s.name}</span>
                </div>
              </td>
              
              {filteredAssignments.map(a => (
                <td key={`score-${s.id}-${a.id}`} className="border border-gray-200 p-4 bg-white">
                  <div className="flex items-center text-[18px] font-bold text-[#00A024] cursor-text pl-1">
                    <span className="mr-0.5">__</span>
                    <span>/{a.maxScore}</span>
                  </div>
                </td>
              ))}
              <td className="border border-gray-200 bg-white"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}