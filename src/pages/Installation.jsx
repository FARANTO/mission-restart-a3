import { useState } from "react";
import { Link } from "react-router-dom";

function Installation() {
  // --- FIX: Initialize state directly from LocalStorage ---
  const [installedApps, setInstalledApps] = useState(() => {
    return JSON.parse(localStorage.getItem("installedApps") || "[]");
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleUninstall = (id, title) => {
    const filtered = installedApps.filter((app) => app.id !== id);
    setInstalledApps(filtered);
    localStorage.setItem("installedApps", JSON.stringify(filtered));
    
    setToastMsg(`${title} uninstalled successfully!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(0) + "M";
    if (num >= 1000) return (num / 1000).toFixed(0) + "K";
    return num;
  };

  const sortedApps = [...installedApps].sort((a, b) => {
    if (sortOrder === "High-Low") return b.downloads - a.downloads;
    if (sortOrder === "Low-High") return a.downloads - b.downloads;
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-16 px-4 pt-32">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0B1B3D] mb-3">Your Installed Apps</h1>
          <p className="text-gray-500">Explore All Trending Apps on the Market developed by us</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#0B1B3D]">{installedApps.length} Apps Found</h2>
          <select 
            className="select select-bordered select-sm bg-white border-gray-300 text-gray-600 focus:outline-none"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort By Downloads</option>
            <option value="High-Low">High-Low</option>
            <option value="Low-High">Low-High</option>
          </select>
        </div>

        {installedApps.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-lg mb-6">You haven't installed any apps yet.</p>
            <Link to="/apps" className="btn border-none text-white bg-[#8344FF] hover:bg-[#6b35d6]">
              Go to Store
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {sortedApps.map((app) => (
              <div key={app.id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between border border-gray-100">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gray-100 rounded-2xl flex-shrink-0 p-3">
                    <img src={app.image} alt={app.title} className="w-full h-full object-contain rounded-lg" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0B1B3D] text-lg mb-1">{app.title}</h3>
                    <div className="flex items-center gap-4 text-sm font-semibold">
                      <span className="text-[#00D084] flex items-center gap-1">
                        ★ {app.ratingAvg}
                      </span>
                      <span className="text-gray-400 font-normal">{formatNumber(app.downloads)} Downloads</span>
                      <span className="text-gray-400 font-normal">{app.size} MB</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => handleUninstall(app.id, app.title)}
                  className="btn bg-[#00D084] hover:bg-[#00b573] text-white border-none normal-case px-8 rounded-xl"
                >
                  Uninstall
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showToast && (
        <div className="toast toast-bottom toast-center mb-10 z-50">
          <div className="alert alert-error bg-red-500 text-white shadow-lg border-none rounded-xl py-4 px-8">
            <span className="font-bold">{toastMsg}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Installation;