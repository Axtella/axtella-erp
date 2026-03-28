import { ModuleDataPage } from '../../components/ModuleDataPage';

export default function AttendancePage() {
  return (
    <ModuleDataPage
      title="Attendance"
      endpoint="/attendance"
      description="Workforce attendance and time records from the API (filters: propertyId, from, to)."
    />
  );
}
