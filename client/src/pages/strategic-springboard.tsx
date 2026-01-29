import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Target, Shield, Globe, Droplets, Building2, Handshake, Leaf, FlaskConical, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function StrategicSpringboardPage() {
    const strategyBoard = [
        {
            theme: "Immediate resolution of the crisis of access to water, sanitation and hygiene services",
            icon: Droplets,
            rows: [
                {
                    stakeholders: "National, state and local governments",
                    strategy: "State funding for access",
                    beneficiaries: "Public service providers, utilities, small town & rural water agencies"
                },
                {
                    stakeholders: "Regulatory institutions",
                    strategy: "State capacity to enhance functional regulation practices",
                    beneficiaries: "Sector institutions"
                },
                {
                    stakeholders: "Development partners NGOs (ODA)",
                    strategy: "Funding access with priority for hard component",
                    beneficiaries: "Public service providers, utilities"
                }
            ]
        },
        {
            theme: "Technical support to WASH institutions for sustainable operations",
            icon: Building2,
            rows: [
                {
                    stakeholders: "National, state and local governments",
                    strategy: "Demand for strong regulation that enforces service level agreements",
                    beneficiaries: "Supervisory/regulatory institution"
                },
                {
                    stakeholders: "Development partners NGOs (ODA)",
                    strategy: "Implement evaluation and rating systems impacting performance",
                    beneficiaries: "Entire WASH sector"
                }
            ]
        },
        {
            theme: "Ensuring that vulnerable peoples do not lack basic WASH services",
            icon: Shield,
            rows: [
                {
                    stakeholders: "National, state and local governments",
                    strategy: "Intentional funding of WASH facility construction by activating state of emergency",
                    beneficiaries: "Public service providers"
                },
                {
                    stakeholders: "Corporate organizations",
                    strategy: "Prioritizing WASH in CSR budgets",
                    beneficiaries: "Communities"
                }
            ]
        },
        {
            theme: "Insulate world population access to WASH from climate change",
            icon: Leaf,
            rows: [
                {
                    stakeholders: "Private financing, investing entities",
                    strategy: "Innovation to bolster resilience of WASH services to climate change",
                    beneficiaries: "Communities"
                },
                {
                    stakeholders: "Research, private sector",
                    strategy: "Innovations to confront challenges posed by climate change",
                    beneficiaries: "Public/private service providers"
                }
            ]
        }
    ];

    const keyApproaches = [
        {
            icon: Handshake,
            title: "Advocacy for best practice",
            description: "Promoting more inclusive approaches to WASH service delivery through partnerships with governments, NGOs, and private sector entities."
        },
        {
            icon: Target,
            title: "Prioritization of WASH funding",
            description: "Advocating for governments and philanthropic organizations including CSR of corporate giants to prioritize WASH in their budgets."
        },
        {
            icon: Globe,
            title: "Resource mobilization platform",
            description: "Coordinating a platform to mobilize resources through blended finance to fund sustainable water, sanitation, and hygiene projects."
        },
        {
            icon: FlaskConical,
            title: "Innovation & research",
            description: "Supporting research and innovation to develop climate-resilient WASH solutions that can withstand environmental challenges."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Header */}
            <section className="bg-white py-24 relative overflow-hidden">
                {/* Subtle pattern */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <span className="inline-block text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">
                            Strategic Framework
                        </span>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                            Strategic
                            <br />
                            <span className="text-slate-400">Springboard</span>
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed">
                            Our comprehensive framework for ensuring universal access to water, sanitation,
                            and hygiene services through strategic partnerships, advocacy, and sustainable financing.
                        </p>
                    </div>
                </div>
            </section>

            {/* Key Approaches Section */}
            <section className="py-24 bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <span className="inline-block text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">
                            Our Approach
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
                            Strategic Approach
                        </h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {keyApproaches.map((approach, index) => (
                            <div
                                key={index}
                                className="group bg-white border border-slate-200 rounded-3xl p-10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                                    <approach.icon className="h-8 w-8 text-slate-600 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{approach.title}</h3>
                                <p className="text-lg text-slate-600 leading-relaxed">{approach.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Strategy Springboard Table Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <span className="inline-block text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">
                            Strategic Themes
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
                            Stakeholder
                            <br />
                            <span className="text-slate-400">Engagement</span>
                        </h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mb-6" />
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Our strategic themes outline how different stakeholders can contribute to solving the global WASH crisis.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {strategyBoard.map((section, index) => (
                            <div key={index} className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                                <div className="bg-slate-900 text-white p-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                            <span className="text-xl font-bold">{index + 1}</span>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold flex-1">{section.theme}</h3>
                                    </div>
                                </div>
                                <div className="divide-y divide-slate-100">
                                    {section.rows.map((row, rIndex) => (
                                        <div key={rIndex} className="p-8 grid md:grid-cols-3 gap-8 hover:bg-slate-50 transition-colors">
                                            <div>
                                                <div className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Stakeholders</div>
                                                <div className="text-slate-900 font-bold text-lg">{row.stakeholders}</div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Strategy</div>
                                                <div className="text-slate-700 text-lg">{row.strategy}</div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Beneficiaries</div>
                                                <div className="text-slate-700 text-lg">{row.beneficiaries}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-24 bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        Join Our
                        <br />
                        <span className="text-slate-400">Mission</span>
                    </h2>
                    <p className="text-xl text-slate-400 mb-12 leading-relaxed max-w-2xl mx-auto">
                        Whether you're a government agency, corporate organization, NGO, or individual,
                        there's a role for you in solving the global WASH crisis.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/dashboard">
                            <Button className="bg-white hover:bg-slate-100 text-slate-900 px-10 py-6 text-lg font-bold rounded-full transition-all hover:scale-105 group">
                                Share Your Story
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="/wash-league">
                            <Button variant="outline" className="border-2 border-slate-600 text-white hover:bg-slate-800 px-10 py-6 text-lg font-semibold rounded-full transition-all hover:scale-105">
                                View WASH League
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
