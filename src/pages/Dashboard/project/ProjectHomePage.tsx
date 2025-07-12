import CreateProject from "../../../components/dashboard/project-manager/CreateProject";
import AppLayout from "../../../layout/AppLayout";

const ProjectHome = () => {
  return (
    <AppLayout className="bg-white">
      <div>
        <CreateProject />
      </div>
    </AppLayout>
  );
};

export default ProjectHome;
