import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Lightbulb, CheckCircle2 } from "lucide-react";

export default function MissionVisionSection() {
    const aims = [
        "To help improve water availability and sanitation management",
        "To deepen the involvement of major water users in solving global water challenges",
        "To promote the participation of local actors in global water events",
        "Mobilize citizens and consumers to address the national water crisis within global perspective"
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
                backgroundSize: '40px 40px'
            }} />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <span className="inline-block text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">
                        Who We Are
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                        Our Strategic Focus
                    </h2>
                    <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full" />
                </div>

                {/* Mission & Vision Cards */}
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    {/* Mission */}
                    <div className="group relative bg-white border border-slate-200 rounded-3xl p-10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                                <Target className="h-8 w-8 text-slate-700 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Our Mission</h3>
                        </div>

                        <div className="text-slate-600 leading-relaxed space-y-4">
                            <p className="text-lg">
                                To ensure immediate resolution of the crisis of access to water,
                                sanitation and hygiene services.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                                    <span>Ensuring that vulnerable peoples of the world do not lack basic WASH services.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                                    <span>Support every process to insulate world population access to WASH services from climate change.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Vision */}
                    <div className="group relative bg-white border border-slate-200 rounded-3xl p-10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-emerald-500 transition-colors duration-300">
                                <Eye className="h-8 w-8 text-slate-700 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Our Vision</h3>
                        </div>

                        <div className="flex items-center h-[calc(100%-100px)]">
                            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
                                Our vision is to see the end to lack of safe water, clean toilets,
                                and good hygiene <span className="text-blue-600 font-semibold">everywhere in the world.</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Aims and Objectives */}
                <div>
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-slate-100 rounded-full px-5 py-2 mb-4">
                            <Lightbulb className="h-5 w-5 text-slate-700" />
                            <span className="font-semibold text-slate-800">Aims & Objectives</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {aims.map((aim, index) => (
                            <div
                                key={index}
                                className="group flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-lg hover:border-blue-200 transition-all duration-300"
                            >
                                <span className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-lg font-bold text-slate-700 group-hover:border-blue-600 group-hover:text-blue-600 transition-colors flex-shrink-0">
                                    {index + 1}
                                </span>
                                <p className="text-slate-700 font-medium text-lg leading-relaxed">{aim}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
