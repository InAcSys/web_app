import { SimpleHeader } from "../components/pages/headers/simple-header/SimpleHeader";
import GeneralLayout from "../layouts/GeneralLayout";

export default function Users() {
  return (
    <GeneralLayout
      header={<SimpleHeader title="Usuarios" />}
    >
      <p>Users</p>
    </GeneralLayout>
  );
}
