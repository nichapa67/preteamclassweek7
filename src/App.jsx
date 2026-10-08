import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ClassCard from './components/ClassCard';
import AssignmentsView from './components/AssignmentsView';
import ClassDetailView from './components/Classdetailview';
import TeachingSubjectsView from './components/TeachingSubjectsView';
import TeacherClassDetailView from './components/TeacherClassDetailView';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [teachingOpen, setTeachingOpen] = useState(false);
  const [classesOpen, setClassesOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('home');
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleSelectMenu = (menu) => {
    setSelectedSubject(null);
    setActiveMenu(menu);
  };

  const [subjects] = useState([
    {
      id: 1,
      title: 'Subject2',
      room: 'ห้อง',
      instructor: 'ชื่ออาจารย์',
      dueDate: 'ครบกำหนด วันเสาร์ 23:59 - งาน',
      avatar: 'P',
      avatarBg: 'bg-purple-600',
      headerBg: 'from-blue-400 to-teal-400'
    },
    {
      id: 2,
      title: 'Subject1',
      room: 'ห้อง',
      instructor: 'ชื่ออาจารย์',
      dueDate: '',
      avatar: 'N',
      avatarBg: 'bg-blue-500',
      headerBg: 'from-purple-500 to-pink-500'
    }
  ]);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50 font-sans text-gray-800">

      {/* Navbar */}
      <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex-1 flex overflow-hidden">

        {/* Sidebar */}
        <Sidebar 
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          activeMenu={activeMenu}
          setActiveMenu={handleSelectMenu}
          teachingOpen={teachingOpen}
          setTeachingOpen={setTeachingOpen}
          classesOpen={classesOpen}
          setClassesOpen={setClassesOpen}
          subjects={subjects}
          onSelectSubject={(sub) => {
            setActiveMenu('home');        // สลับโหมดเป็น home
            setSelectedSubject(sub);      // ตั้งค่าวิชาที่ต้องการเปิดดู
          }}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-white">

          {/* แยกเงื่อนไขการแสดงผลหน้ารายละเอียดวิชา */}
          
          {/* เปิดจากหน้า Home (มุมมองนักเรียน) */}
          {selectedSubject && activeMenu === 'home' && (
            <ClassDetailView subject={selectedSubject} />
          )}

          {/* เปิดจากหน้า Teaching (มุมมองอาจารย์) */}
          {selectedSubject && activeMenu === 'teaching' && (
            <TeacherClassDetailView subject={selectedSubject} />
          )}

          {/* หน้าแรก (Home) */}
          {activeMenu === 'home' && !selectedSubject && (
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {subjects.map((sub) => (
                  <ClassCard key={sub.id} subject={sub} onClick={() => setSelectedSubject(sub)} />
                ))}
              </div>
            </div>
          )}

          {/* งานของฉัน (Assignments) */}
          {activeMenu === 'assignments' && !selectedSubject && (
            <AssignmentsView />
          )}

          {/* หน้าวิชาที่กำลังสอน (Teaching) */}
          {activeMenu === 'teaching' && !selectedSubject && (
            <TeachingSubjectsView 
              onSubjectClick={(sub) => setSelectedSubject(sub)} 
            />
          )}

          {/* เมนูอื่นๆ ที่ยังไม่รองรับ */}
          {activeMenu !== 'home' && 
           activeMenu !== 'assignments' && 
           activeMenu !== 'teaching' && 
           !selectedSubject && (
            <div className="max-w-7xl mx-auto text-center py-20 text-gray-400">
              <h2 className="text-xl font-medium">หน้านี้กำลังอยู่ในระหว่างพัฒนา</h2>
            </div>
          )}
        </main>
      </div>

    </div>
  );
}