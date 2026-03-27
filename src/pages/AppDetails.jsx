import { useParams, Link } from "react-router-dom";
import appsData from "../data/apps.json";

function AppDetails() {
  const { id } = useParams();
  const app = appsData.find((item) => item.id === parseInt(id));

  if (!app) {
    return <h1 className="text-center text-2xl">App Not Found</h1>;
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <img src={app.image} alt={app.title} className="w-full max-w-xs mx-auto mb-6" />
      <h1 className="text-3xl font-bold text-center">{app.title}</h1>
      <p className="text-center">{app.description}</p>

      <div className="text-center mt-4">
        <Link to="/apps" className="btn">
          Back
        </Link>
      </div>
    </div>
  );
}

export default AppDetails;