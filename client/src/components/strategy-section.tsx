import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Lightbulb, TrendingUp, Handshake, Globe, CheckCircle2 } from "lucide-react";

export default function StrategySection() {
    const aims = [
        "To help improve water availability and sanitation management",
        "To deepen the involvement of major water users in solving global water challenges",
        "To promote the participation of local actors in global water events",
        "Mobilize citizens and consumers to address the national water crisis within global perspective"
    ];

    const strategyBoard = [
        {
            theme: "Immediate resolution of the crisis of access to water, sanitation and hygiene services",
            rows: [
                {
                    stakeholders: "National, State and Local Governments",
                    strategy: "State funding for access",
                    beneficiaries: "Public Service Providers, utilities, small town & rural water agencies"
                },
                {
                    stakeholders: "Regulatory Institutions",
                    strategy: "State bonding capacity and practice of functional regulation",
                    beneficiaries: "Sector Institutions"
                },
                {
                    stakeholders: "Development Partners NGOs (ODA)",
                    strategy: "Funding Access with priority for hard component",
                    beneficiaries: "Public Service Providers, utilities"
                }
            ]
        },
        {
            theme: "Technical support to WASH institutions for sustainable operations",
            rows: [
                {
                    stakeholders: "National, State and Local Governments",
                    strategy: "Demand for Strong Regulation that enforces Service Level Agreements",
                    beneficiaries: "Supervisory/Regulatory Institution"
                },
                {
                    stakeholders: "Development Partners NGOs (ODA)",
                    strategy: "Implement evaluation and rating systems impacting performance",
                    beneficiaries: "Entire WASH Sector"
                }
            ]
        },
        {
            theme: "Ensuring that vulnerable peoples do not lack basic WASH services",
            rows: [
                {
                    stakeholders: "National, State and Local Governments",
                    strategy: "Intentional Funding of WASH Facility construction by activating State of Emergency",
                    beneficiaries: "Public Service Providers"
                },
                {
                    stakeholders: "Corporate Organizations",
                    strategy: "Prioritizing WASH in CSR budgets",
                    beneficiaries: "Communities"
                }
            ]
        },
        {
            theme: "Insulate world population access to WASH from climate change",
            rows: [
                {
                    stakeholders: "Private Financing, Investing Entities",
                    strategy: "Innovation to bolster resilience of WASH services to climate change",
                    beneficiaries: "Communities"
                },
                {
                    stakeholders: "Research, Private Sector",
                    strategy: "Innovations to confront challenges posed by climate change",
                    beneficiaries: "Public/Private Service Providers"
                }
            ]
        }
    ];

    return (
        <div className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]">
                <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Our Strategic Focus
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Driving sustainable WASH solutions through strategic partnerships and global engagement
                    </p>
                </div>

                {/* Mission & Vision Cards */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {/* Mission */}
                    <Card className="group bg-white/80 backdrop-blur-xl border-0 shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 h-full">
                        <CardContent className="p-8 h-full">
                            <div className="flex flex-col h-full gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform duration-300">
                                        <Target className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
                                </div>
                                <div className="text-slate-600 leading-relaxed space-y-3 flex-grow">
                                    <p>To ensure immediate resolution of the crisis of access to water, sanitation and hygiene services.</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Ensuring that vulnerable peoples of the world do not lack basic WASH services regardless.</li>
                                        <li>Support every process to insulate world population access to WASH services from climate change variability.</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Vision */}
                    <Card className="group bg-white/80 backdrop-blur-xl border-0 shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 h-full">
                        <CardContent className="p-8 h-full">
                            <div className="flex flex-col h-full gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl shadow-lg shadow-emerald-500/25 group-hover:scale-110 transition-transform duration-300">
                                        <Eye className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
                                </div>
                                <div className="text-slate-600 leading-relaxed flex items-center flex-grow">
                                    <p className="text-lg">
                                        Our vision is to see the end to lack of safe water, clean toilets, and good hygiene everywhere in the world.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Aims and Objectives */}
                <div className="mb-16">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2 mb-3">
                            <Lightbulb className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-bold text-slate-800 uppercase tracking-wide">Aims & Objectives</span>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        {aims.map((aim, index) => (
                            <div key={index} className="flex items-start gap-3 p-4 bg-white/60 rounded-lg border border-slate-100 hover:bg-white hover:shadow-md transition-all">
                                <CheckCircle2 className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                                <p className="text-slate-800 font-semibold text-lg">{aim}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Strategy Springboard */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2 mb-3">
                        <TrendingUp className="h-4 w-4 text-blue-700" />
                        <span className="text-sm font-bold text-slate-800 uppercase tracking-wide">Strategy Springboard</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Strategic Themes & Actions</h3>
                </div>

                <div className="space-y-6">
                    {strategyBoard.map((section, index) => (
                        <Card key={index} className="overflow-hidden border-0 shadow-lg bg-white/90 backdrop-blur-sm ring-1 ring-slate-200">
                            <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 py-4">
                                <CardTitle className="text-lg text-slate-900 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-md shadow-blue-500/20">
                                        {index + 1}
                                    </span>
                                    {section.theme}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="grid grid-cols-1 divide-y divide-slate-100">
                                    {section.rows.map((row, rIndex) => (
                                        <div key={rIndex} className="p-5 grid md:grid-cols-3 gap-4 hover:bg-blue-50/30 transition-colors">
                                            <div>
                                                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Stakeholders</div>
                                                <div className="text-slate-800 font-bold text-base">{row.stakeholders}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Strategy</div>
                                                <div className="text-slate-800 font-medium">{row.strategy}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Beneficiaries</div>
                                                <div className="text-slate-800 font-medium">{row.beneficiaries}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
