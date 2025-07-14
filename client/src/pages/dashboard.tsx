import ExcelUpload from "@/components/excel-upload";
import AnalyticsDashboard from "@/components/analytics-dashboard";

export default function Dashboard() {
  return (
    <div className="pt-20 pb-16 bg-light-gray min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-dark-gray mb-4">
            Analytics Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Interactive data visualization and reporting tools for water aid projects
          </p>
        </div>

        <ExcelUpload />
        <AnalyticsDashboard />
      </div>
    </div>
  );
}
