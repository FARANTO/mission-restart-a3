import { Link } from "react-router-dom";
import appsData from "../data/apps.json";

function Apps() {
  return (
    <div className="p-10 grid grid-cols-2 md:grid-cols-4 gap-6">
      {appsData.map((app) => (
        <Link key={app.id} to={`/app/${app.id}`} className="border p-4 rounded">
          <img src={app.image} alt={app.title} />
          <h2>{app.title}</h2>
        </Link>
      ))}
    </div>
  );
}

export default Apps;