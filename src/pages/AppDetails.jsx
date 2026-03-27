import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import  appsData  from "../data/apps.json";

function AppDetails() {
  const { id } = useParams();
  const [isInstalled, setIsInstalled] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Find the specific app. We use Number(id) because URL params are strings.
  const app = appsData.find((item) => item.id === Number(id));

  if (!app) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB]">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">App Not Found</h1>
        <Link to="/apps" className="btn btn-outline border-[#8344FF] text-[#8344FF]">
          Back to Apps
        </Link>
      </div>
    );
  }

  // Formatting helpers
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(0) + "M";
    if (num >= 1000) return (num / 1000).toFixed(0) + "K";
    return num;
  };

  // The design shows 5 stars at the top, so we reverse the ratings array for the chart
  const chartData = [...app.ratings].reverse();

  // Handle Install Click
  const handleInstall = () => {
    setIsInstalled(true);
    setShowToast(true);
    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-4 pt-28">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        
        {/* TOP SECTION: App Info */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Left: App Icon */}
          <div className="w-48 h-48 flex-shrink-0 bg-gray-50 rounded-2xl p-4 border border-gray-100">
            <img 
              src={app.image} 
              alt={app.title} 
              className="w-full h-full object-contain rounded-xl"
            />
          </div>

          {/* Right: Details & Stats */}
          <div className="flex-grow">
            <h1 className="text-3xl font-bold text-[#0B1B3D] mb-1">{app.title}</h1>
            <p className="text-gray-500 mb-6">
              Developed by <span className="text-[#8344FF] font-medium">{app.companyName}</span>
            </p>

            {/* Stats Row */}
            <div className="flex gap-8 mb-8">
              <div>
                <div className="flex items-center gap-1 text-emerald-500 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="text-xs font-semibold text-gray-500">Downloads</span>
                </div>
                <p className="text-2xl font-bold text-[#0B1B3D]">{formatNumber(app.downloads)}</p>
              </div>

              <div>
                <div className="flex items-center gap-1 text-orange-400 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xs font-semibold text-gray-500">Average Ratings</span>
                </div>
                <p className="text-2xl font-bold text-[#0B1B3D]">{app.ratingAvg}</p>
              </div>

              <div>
                <div className="flex items-center gap-1 text-[#8344FF] mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <span className="text-xs font-semibold text-gray-500">Total Reviews</span>
                </div>
                <p className="text-2xl font-bold text-[#0B1B3D]">{formatNumber(app.reviews)}</p>
              </div>
            </div>

            {/* Install Button */}
            <button 
              onClick={handleInstall}
              disabled={isInstalled}
              className={`btn border-none px-8 normal-case text-white ${
                isInstalled 
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed" 
                  : "bg-[#00D084] hover:bg-[#00b573]"
              }`}
            >
              {isInstalled ? "Installed" : `Install Now (${app.size} MB)`}
            </button>
          </div>
        </div>

        <hr className="my-10 border-gray-100" />

        {/* MIDDLE SECTION: Ratings Chart */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[#0B1B3D] mb-6">Ratings</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={chartData}
                margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
              >
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6B7280', fontSize: 14 }}
                  width={60}
                />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                />
                <Bar 
                  dataKey="count" 
                  fill="#F97316" 
                  radius={[0, 4, 4, 0]} 
                  barSize={16}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <hr className="my-10 border-gray-100" />

        {/* BOTTOM SECTION: Description */}
        <div>
          <h2 className="text-xl font-bold text-[#0B1B3D] mb-4">Description</h2>
          <p className="text-gray-500 leading-relaxed">
            {app.description}
          </p>
        </div>

      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="toast toast-top toast-center mt-20 z-50">
          <div className="alert alert-success bg-[#00D084] text-white shadow-lg rounded-xl">
            <span>Successfully installed {app.title}!</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppDetails;