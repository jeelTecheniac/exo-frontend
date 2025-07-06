// import ListDashBoard from "../../components/dashboard/ListDashboard";
// import AddressTable from "../../components/table/AddressTable";
import { useNavigate } from "react-router";
import CreateRequest from "../../components/dashboard/CreateRequest";
import AppLayout from "../../layout/AppLayout";
// import CreateProject from "./CreateProject";

const Home = () => {
  const navigate = useNavigate();
  return (
    <AppLayout className="bg-white">
      <div>
        {/* <CreateProject /> */}
        {/* <RequestTable data={initialTableData} /> */}
        <CreateRequest onClick={() => navigate("/create-project")} />
      </div>
    </AppLayout>
  );
};

export default Home;
