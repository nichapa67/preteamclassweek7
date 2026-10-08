import React from 'react';
import { MoreVertical } from 'lucide-react';

// Component: ClassCard (จากโค้ดที่คุณให้มา)
function ClassCard({ subject, onClick }) {
  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) onClick();
      }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`w-full h-[215px] bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden relative transition hover:shadow-md ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      {/* Header */}
      <div
        className={`
          h-[71px]
          px-4
          py-2.5
          bg-gradient-to-r
          ${subject.headerBg}
          text-white
          relative
        `}
      >
        <div className="pr-8">
          <h3 className="text-[18px] leading-6 font-medium truncate">
            {subject.title}
          </h3>
          <p className="text-[13px] leading-4 truncate opacity-90">
            {subject.room}
          </p>
          {/* แสดงชื่ออาจารย์ */}
          <p className="text-[13px] leading-4 truncate opacity-90">
            {subject.instructor}
          </p>
        </div>

        {/* Avatar */}
        <div
          className={`
            absolute
            -bottom-4
            right-4
            w-[50px]
            h-[50px]
            rounded-full
            border-2
            border-white
            flex
            items-center
            justify-center
            text-white
            text-[22px]
            font-normal
            shadow-xs
            ${subject.avatarBg || 'bg-purple-500'}
          `}
        >
          {subject.avatar}
        </div>
      </div>

      {/* Body */}
      <div className="h-[144px] px-4 py-4 relative">
        {subject.dueDate ? (
          <p className="text-[13px] leading-relaxed text-gray-700 font-normal">
            {subject.dueDate}
          </p>
        ) : (
          <p className="text-[13px] leading-relaxed text-gray-400">
            ไม่มีกำหนดส่งเร็วๆ นี้
          </p>
        )}

        {/* More button */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute right-3 bottom-3 text-gray-500 hover:text-gray-900 p-1 rounded-full transition cursor-pointer"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// Component หลัก: หน้าวิชาที่กำลังสอน
export default function TeachingSubjectsView({ onSubjectClick }) {
  // ข้อมูลจำลองสำหรับวิชาที่กำลังสอน
  const teachingSubjects = [
    {
      id: 'subject1',
      title: 'Subject1',
      room: 'ห้อง',
      instructor: 'ชื่ออาจารย์',
      headerBg: 'from-purple-500 to-pink-500',
      avatar: 'N',
      avatarBg: 'bg-blue-500',
      dueDate: null
    }
  ];

  return (
    <div className="w-full min-h-screen bg-white p-6 md:p-8">
      <div className="max-w-[1200px] mx-auto">
        {/* หัวข้อหน้า */}
        <h2 className="text-[26px] font-medium text-gray-900 mb-6 pb-3 border-b border-gray-300">
          วิชาที่กำลังสอน
        </h2>
        
        {/* Grid แสดงการ์ดวิชา */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teachingSubjects.map((sub) => (
            <ClassCard 
              key={sub.id} 
              subject={sub} 
              onClick={() => onSubjectClick && onSubjectClick(sub)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}