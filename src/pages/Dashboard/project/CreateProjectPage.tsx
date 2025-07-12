import CreateProjectForm from "../../../components/dashboard/project-manager/CreateProjectForm";
import AppLayout from "../../../layout/AppLayout";

const CreateProjectPage = () => {
  return (
    <AppLayout className="bg-white">
      <div>
        <CreateProjectForm />
      </div>
    </AppLayout>
  );
};

export default CreateProjectPage;
