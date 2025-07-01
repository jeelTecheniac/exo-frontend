// import ListDashBoard from "../../components/dashboard/ListDashboard";
// import AddressTable from "../../components/table/AddressTable";
import AppLayout from "../../layout/AppLayout";
import CreateProject from "./CreateProject";
// import CreateProject from "./CreateProject";

const Home = () => {
  return (
    <AppLayout className="bg-white">
      <div>
        <CreateProject />
        {/* <RequestTable data={initialTableData} /> */}
      </div>
    </AppLayout>
  );
};

export default Home;
