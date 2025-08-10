import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertCircle, Download, FileText } from "lucide-react";

interface WashIndicator {
  category: string;
  indicator: string;
  status: "Covered" | "Missing" | "Partial";
  description?: string;
  currentData?: string;
}

export default function WashIndicatorsAnalysis() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const washIndicators: WashIndicator[] = [
    // Policy, Legal & Institutional Framework
    {
      category: "Policy, Legal & Institutional Framework",
      indicator: "Existence of WASH policy",
      status: "Missing",
      description: "No policy documentation tracked in current system"
    },
    {
      category: "Policy, Legal & Institutional Framework", 
      indicator: "Existence of legal framework",
      status: "Missing",
      description: "Legal framework data not captured"
    },
    {
      category: "Policy, Legal & Institutional Framework",
      indicator: "Institutional roles clarity",
      status: "Missing",
      description: "Institutional mapping not documented"
    },
    {
      category: "Policy, Legal & Institutional Framework",
      indicator: "Budget allocation to WASH",
      status: "Partial",
      description: "Project funding tracked but not full budget allocation",
      currentData: "Funding Raised (USD)"
    },
    {
      category: "Policy, Legal & Institutional Framework",
      indicator: "Sustainable financing mechanisms",
      status: "Missing",
      description: "Financing mechanisms not tracked"
    },
    {
      category: "Policy, Legal & Institutional Framework",
      indicator: "Monitoring & evaluation system",
      status: "Partial",
      description: "Basic project monitoring via completion tracking",
      currentData: "Project completion percentage, Status tracking"
    },

    // Urban Water Supply Services
    {
      category: "Urban Water Supply Services",
      indicator: "Urban population coverage (%)",
      status: "Missing",
      description: "Urban-specific coverage not differentiated"
    },
    {
      category: "Urban Water Supply Services",
      indicator: "Service quality (continuity, safety)",
      status: "Missing",
      description: "Quality metrics not captured"
    },
    {
      category: "Urban Water Supply Services",
      indicator: "Financial sustainability",
      status: "Missing",
      description: "Sustainability indicators not tracked"
    },
    {
      category: "Urban Water Supply Services",
      indicator: "Customer satisfaction",
      status: "Missing",
      description: "Satisfaction surveys not conducted"
    },

    // Small Town WASH Services
    {
      category: "Small Town WASH Services",
      indicator: "Coverage in small towns",
      status: "Partial",
      description: "Location data exists but not categorized by town size",
      currentData: "Project locations tracked"
    },
    {
      category: "Small Town WASH Services",
      indicator: "Service reliability & quality",
      status: "Missing",
      description: "Reliability metrics not measured"
    },
    {
      category: "Small Town WASH Services",
      indicator: "Maintenance systems",
      status: "Missing",
      description: "Maintenance protocols not documented"
    },

    // Rural WASH Services
    {
      category: "Rural WASH Services",
      indicator: "Rural water point coverage (%)",
      status: "Covered",
      description: "People served by projects tracked",
      currentData: "People with Clean Water Access, People Served metrics"
    },
    {
      category: "Rural WASH Services",
      indicator: "Functionality rate (% working)",
      status: "Partial",
      description: "Water flowing percentage tracked but not comprehensive",
      currentData: "Water Flowing Percentage (96%)"
    },
    {
      category: "Rural WASH Services",
      indicator: "Hygiene promotion outreach",
      status: "Covered",
      description: "Health and hygiene programs tracked",
      currentData: "People in Health Centers with Better Hygiene"
    },

    // Urban Sanitation Services
    {
      category: "Urban Sanitation Services",
      indicator: "Access to improved sanitation",
      status: "Covered",
      description: "Sanitation access tracked",
      currentData: "People with Decent Toilets"
    },
    {
      category: "Urban Sanitation Services",
      indicator: "Wastewater/sludge management",
      status: "Missing",
      description: "Waste management systems not tracked"
    },
    {
      category: "Urban Sanitation Services",
      indicator: "Hygiene promotion",
      status: "Covered",
      description: "Hygiene programs documented",
      currentData: "School hygiene programs, Health center hygiene"
    }
  ];

  const categories = ["all", ...Array.from(new Set(washIndicators.map(ind => ind.category)))];

  const filteredIndicators = selectedCategory === "all" 
    ? washIndicators 
    : washIndicators.filter(ind => ind.category === selectedCategory);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Covered":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "Partial":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case "Missing":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      "Covered": "bg-green-100 text-green-800",
      "Partial": "bg-yellow-100 text-yellow-800",
      "Missing": "bg-red-100 text-red-800"
    };
    return <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>;
  };

  const summary = {
    covered: washIndicators.filter(ind => ind.status === "Covered").length,
    partial: washIndicators.filter(ind => ind.status === "Partial").length,
    missing: washIndicators.filter(ind => ind.status === "Missing").length,
    total: washIndicators.length
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{summary.covered}</div>
            <div className="text-sm text-gray-600">Fully Covered</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{summary.partial}</div>
            <div className="text-sm text-gray-600">Partially Covered</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{summary.missing}</div>
            <div className="text-sm text-gray-600">Missing</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-water-blue">{summary.total}</div>
            <div className="text-sm text-gray-600">Total Indicators</div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <label className="text-gray-700 font-medium">Filter by Category:</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border rounded-md px-3 py-2 bg-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Button className="bg-water-blue text-white hover:bg-blue-600">
                <Download className="mr-2 h-4 w-4" />
                Export Analysis
              </Button>
              <Button className="bg-clean-green text-white hover:bg-green-600">
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Indicators Table */}
      <Card>
        <CardHeader>
          <CardTitle>WASH League Table Indicators Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Indicator
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Data / Notes
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredIndicators.map((indicator, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="font-medium text-gray-900">{indicator.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(indicator.status)}
                        <span className="ml-2 text-sm font-medium text-gray-900">
                          {indicator.indicator}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(indicator.status)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {indicator.currentData && (
                        <div className="font-medium text-green-700 mb-1">{indicator.currentData}</div>
                      )}
                      <div className="text-gray-600">{indicator.description}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommendations for Data Collection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">High Priority Missing Indicators:</h4>
              <ul className="list-disc list-inside text-red-700 space-y-1">
                <li>Urban population coverage and service quality metrics</li>
                <li>Financial sustainability and customer satisfaction data</li>
                <li>Policy and legal framework documentation</li>
                <li>Wastewater and sludge management systems</li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Enhance Partial Coverage:</h4>
              <ul className="list-disc list-inside text-yellow-700 space-y-1">
                <li>Expand location categorization (urban vs rural vs small towns)</li>
                <li>Add comprehensive functionality rate tracking</li>
                <li>Include full budget allocation beyond project funding</li>
                <li>Implement systematic monitoring and evaluation framework</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Well Covered Areas:</h4>
              <ul className="list-disc list-inside text-green-700 space-y-1">
                <li>Rural water coverage and people served</li>
                <li>Sanitation access tracking</li>
                <li>Hygiene promotion programs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}