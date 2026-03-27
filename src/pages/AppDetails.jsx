import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "react-toastify"; // ✅ Import toast
import appsData from "../data/apps.json";
import AppError from "../assets/images/App-Error.png";

function AppDetails() {
  const { id } = useParams();
  const app = appsData.find((item) => item.id === Number(id));

  const [isInstalled, setIsInstalled] = useState(() => {
    if (!app) return false;
    const savedApps = JSON.parse(localStorage.getItem("installedApps") || "[]");
    return savedApps.some((savedApp) => savedApp.id === app.id);
  });

  if (!app) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <div className="max-w-md w-full mb-8">
          <img src={AppError} alt="Not Found" className="w-full" />
        </div>
        <h1 className="text-4xl font-extrabold text-[#0B1B3D] mb-4 text-center">OPPS!! APP NOT FOUND</h1>
        <Link to="/apps" className="btn text-white border-none px-10 rounded-lg bg-gradient-to-r from-[#632EE3] to-[#9F62F2]">
          Go Back!
        </Link>
      </div>
    );
  }

  const handleInstall = () => {
    const savedApps = JSON.parse(localStorage.getItem("installedApps") || "[]");
    if (!savedApps.some((savedApp) => savedApp.id === app.id)) {
      const updatedApps = [...savedApps, app];
      localStorage.setItem("installedApps", JSON.stringify(updatedApps));
    }
    
    setIsInstalled(true);
    // ✅ Use react-toastify
    toast.success(`Successfully installed ${app.title}!`);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num;
  };

  const chartData = [...app.ratings].reverse();

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-4 pt-28">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-48 h-48 flex-shrink-0 bg-gray-50 rounded-2xl p-4 border border-gray-100">
            <img src={app.image} alt={app.title} className="w-full h-full object-contain rounded-xl" />
          </div>
          <div className="flex-grow">
            <h1 className="text-3xl font-bold text-[#0B1B3D] mb-1">{app.title}</h1>
            <p className="text-gray-500 mb-6">Developed by <span className="text-[#8344FF] font-medium">{app.companyName}</span></p>
            
            <div className="flex gap-8 mb-8">
               {/* Stats remain the same */}
               <div>
                 <p className="text-xs font-semibold text-gray-400 uppercase">Downloads</p>
                 <p className="text-2xl font-bold text-[#0B1B3D]">{formatNumber(app.downloads)}</p>
               </div>
               <div>
                 <p className="text-xs font-semibold text-gray-400 uppercase">Rating</p>
                 <p className="text-2xl font-bold text-[#0B1B3D]">{app.ratingAvg}</p>
               </div>
            </div>

            <button 
              onClick={handleInstall} 
              disabled={isInstalled} 
              className={`btn border-none px-8 text-white ${isInstalled ? "bg-gray-400" : "bg-[#00D084] hover:bg-[#00b573]"}`}
            >
              {isInstalled ? "Installed" : `Install Now (${app.size} MB)`}
            </button>
          </div>
        </div>

        <hr className="my-10 border-gray-100" />
        
        {/* Chart and Description sections remain the same */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[#0B1B3D] mb-6">App Review Chart</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={chartData}> 
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="count" fill="#F97316" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <hr className="my-10 border-gray-100" />
        <div>
          <h2 className="text-xl font-bold text-[#0B1B3D] mb-4">Description</h2>
          <p className="text-gray-500 leading-relaxed">{app.description}</p>
        </div>
      </div>
    </div>
  );
}

export default AppDetails;