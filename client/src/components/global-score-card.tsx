import { Droplets, Users, AlertTriangle, Heart } from "lucide-react";

export default function GlobalScoreCard() {
    const stats = [
        {
            value: "703",
            suffix: "M+",
            label: "People lack clean water",
            icon: Droplets,
        },
        {
            value: "1.7",
            suffix: "B",
            label: "Lack basic sanitation",
            icon: Users,
        },
        {
            value: "829K",
            suffix: "",
            label: "Die annually from unsafe water",
            icon: AlertTriangle,
        },
        {
            value: "3B",
            suffix: "+",
            label: "Lack handwashing facilities",
            icon: Heart,
        },
    ];

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Subtle pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
                backgroundSize: '40px 40px'
            }} />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="inline-block text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">
                        Global Impact
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                        The Water Crisis
                        <br />
                        <span className="text-slate-400">by Numbers</span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Understanding the scale of the global water crisis helps us work together toward solutions.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="group relative bg-white rounded-3xl p-8 text-center border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                        >
                            {/* Hover accent line */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-blue-600 rounded-full group-hover:w-1/2 transition-all duration-300" />

                            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                                <stat.icon className="h-7 w-7 text-slate-600 group-hover:text-white transition-colors" />
                            </div>

                            <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                                {stat.value}
                                <span className="text-blue-600">{stat.suffix}</span>
                            </div>

                            <p className="text-slate-500 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
