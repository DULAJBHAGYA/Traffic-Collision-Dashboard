import React, { useState } from 'react';
import { 
  MoreHorizontal, 
  Heart, 
  ChevronLeft, 
  ChevronRight,
  Plus
} from 'lucide-react';
import Header from '../components/Header';
import SideBar from '../components/SideBar';




const HomePage = () => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const Collision = [
  { 
    title: 'Minor Collisions', 
    total: '120', 
    category: 'MINOR',
    color: 'text-yellow-600 bg-yellow-50'
  },
  { 
    title: 'Major Collisions', 
    total: '45', 
    category: 'MAJOR',
    color: 'text-red-600 bg-red-50'
  },
  { 
    title: 'Resolved Cases', 
    total: '300/450 resolved', 
    category: 'RESOLVED',
    color: 'text-green-600 bg-green-50'
  }
];


const continueWatching = [
  {
    title: "Ongoing Investigation: Highway 21 Multi-Car Pileup",
    category: "MAJOR COLLISION",
    categoryColor: "text-white",
    mentor: "Officer James Carter",
    mentorRole: "Investigator",
    image: "https://nation.time.com/wp-content/uploads/sites/8/2014/02/aptopix-turnpike-cras_carb.jpg"
  },
  {
    title: "Pending Review: Minor Fender Bender at 5th Avenue",
    category: "MINOR COLLISION",
    categoryColor: "text-white",
    mentor: "Officer Linda Park",
    mentorRole: "Traffic Analyst",
    image: "https://www.shutterstock.com/image-photo/auto-accident-involving-two-cars-600nw-157986236.jpg"
  },
  {
    title: "Follow-Up: Resolved Incident at Downtown Crossroad",
    category: "RESOLVED CASE",
    categoryColor: "text-white",
    mentor: "Supervisor Mike Han",
    mentorRole: "Case Supervisor",
    image: "https://roadsense.org.au/wp-content/uploads/2022/08/Blog-Article-Images-1024x683.png"
  }
];


const officers = [
  {
    name: "Officer Jane Smith",
    role: "Traffic Inspector",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    online: true
  },
  {
    name: "Sgt. David Lee",
    role: "Field Investigator",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    online: false
  },
  {
    name: "Supervisor Alicia Kim",
    role: "Case Manager",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    online: true
  }
];


  return (
    <div className="flex h-screen bg-gray-50">
      <SideBar activeItem={activeItem} setActiveItem={setActiveItem} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Hero Banner */}
                <div className="bg-blue-500 rounded-2xl p-8 text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">
  Manage and Monitor<br />
  Traffic Collision Reports Efficiently
</h1>

                    <button className="bg-black text-white px-6 py-3 rounded-full font-medium flex items-center space-x-2 hover:bg-gray-800 transition-colors mt-6">
                      <span>Manage</span>
                    </button>
                  </div>
                  <div className="absolute top-4 right-8 w-32 h-32 bg-white bg-opacity-10 rounded-full blur-xl"></div>
                  <div className="absolute bottom-4 right-4 w-64 h-64 bg-white bg-opacity-5 rounded-full blur-3xl"></div>
                </div>

                {/* Course Progress Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Collision.map((Collision, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <div className="flex items-start justify-between mb-4">
                        
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">{Collision.title}</h3>
                      <p className="text-sm text-gray-500">{Collision.total}</p>
                    </div>
                  ))}
                </div>

                {/* Continue Watching */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Ongoing Cases</h2>
                    <div className="flex space-x-2">
                      <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-50">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {continueWatching.map((course, index) => (
                      <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="relative">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-48 object-cover"
                          />
                          
                          <div className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-semibold ${course.categoryColor}`}>
                            {course.category}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2">{course.title}</h3>
                          <div className="flex items-center space-x-2">
                            <img
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=24&h=24&fit=crop&crop=face"
                              alt={course.mentor}
                              className="w-6 h-6 rounded-full"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-800">{course.mentor}</p>
                              <p className="text-xs text-gray-500">{course.mentorRole}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">

                {/* Your Mentor */}
                <div className="bg-white rounded-xl mb-4 p-6 shadow-sm border border-gray-100">
                  {/* Your Team */}
<div className="bg-white rounded-xl mb-4 p-6 shadow-sm border border-gray-100">
  <div className="flex items-center justify-between mb-4">
    <h3 className="font-semibold text-gray-800">Your Team</h3>
  </div>

  <div className="space-y-4">
    {officers.map((officer, index) => (
      <div key={index} className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={officer.avatar}
              alt={officer.name}
              className="w-10 h-10 rounded-full"
            />
            {officer.online && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          <div>
            <p className="font-medium text-gray-800 text-sm">{officer.name}</p>
            <p className="text-xs text-gray-500">{officer.role}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


                {/* Statistics */}
                <div className="bg-white mt-6 rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">Statistic</h3>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="text-center mb-6">
                    <div className="relative inline-block">
                      <div className="w-20 h-20 rounded-full border-4 border-blue-100 flex items-center justify-center">
                        <img
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
                          alt="Profile"
                          className="w-12 h-12 rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <h4 className="font-semibold text-gray-800 mb-1">Hello Jason 🔥</h4>
                    <p className="text-sm text-gray-500">Continue your anlysis!</p>
                  </div>

                  {/* Chart */}
                  <div className="mb-4">
                    <div className="flex items-end justify-between h-24 space-x-2">
                      {[40, 45, 35, 50, 35].map((height, index) => (
                        <div
                          key={index}
                          className={`flex-1 rounded-t-lg ${
                            index === 3 ? 'bg-blue-600' : 'bg-blue-200'
                          }`}
                          style={{ height: `${height}%` }}
                        ></div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>1-10 Aug</span>
                      <span>11-20 Aug</span>
                      <span>21-30 Aug</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="text-2xl font-bold text-gray-800">60</span>
                  </div>
                </div>

                
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;