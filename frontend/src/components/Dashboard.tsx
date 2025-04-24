import Profile from "./Profile";
import Listings from "./Listings";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Listings />
            <Profile />
        </div>
    );
};

export default Dashboard;
