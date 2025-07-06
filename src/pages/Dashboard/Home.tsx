import CreateRequest from "../../components/dashboard/CreateRequest";
import AppLayout from "../../layout/AppLayout";

const Home = () => {
  return (
    <AppLayout className="bg-white">
      <div>
        <CreateRequest />
      </div>
    </AppLayout>
  );
};

export default Home;
