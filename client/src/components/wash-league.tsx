import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Trophy,
    TrendingUp,
    TrendingDown,
    Minus,
    Search,
    ChevronUp,
    ChevronDown,
    Droplets,
    Home,
    Building2
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface StateData {
    rank: number;
    name: string;
    points: number;
    waterAccess: number;
    sanitation: number;
    hygiene: number;
    change: "up" | "down" | "same";
    zone: "promotion" | "safe" | "relegation";
}

// All 37 Nigerian states (36 states + FCT) with FCT Abuja first
const nigerianStates: StateData[] = [
    "FCT Abuja", "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
    "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
    "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
    "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
    "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
].map((name, index) => ({
    rank: index + 1,
    name: name + " State",
    points: 0,
    waterAccess: 0,
    sanitation: 0,
    hygiene: 0,
    change: "same" as const,
    zone: index < 5 ? "promotion" as const : index >= 32 ? "relegation" as const : "safe" as const
}));

export default function WashLeague() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedState, setSelectedState] = useState<StateData | null>(null);

    const filteredStates = nigerianStates.filter(state =>
        state.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getZoneStyle = (zone: string) => {
        switch (zone) {
            case "promotion":
                return "bg-gradient-to-r from-emerald-500/10 to-transparent border-l-4 border-emerald-500";
            case "relegation":
                return "bg-gradient-to-r from-red-500/10 to-transparent border-l-4 border-red-500";
            default:
                return "hover:bg-slate-50/50";
        }
    };

    const getChangeIcon = (change: string) => {
        switch (change) {
            case "up":
                return <ChevronUp className="h-4 w-4 text-emerald-500" />;
            case "down":
                return <ChevronDown className="h-4 w-4 text-red-500" />;
            default:
                return <Minus className="h-4 w-4 text-slate-400" />;
        }
    };

    const getRankBadge = (rank: number) => {
        if (rank <= 3) {
            const colors = ["bg-yellow-500", "bg-slate-400", "bg-amber-600"];
            return (
                <div className={`w-8 h-8 rounded-full ${colors[rank - 1]} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                    {rank}
                </div>
            );
        }
        return (
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-semibold text-sm">
                {rank}
            </div>
        );
    };

    return (
        <div className="pt-20 pb-16 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full px-5 py-2 mb-6 shadow-lg shadow-cyan-500/25">
                        <Trophy className="h-5 w-5" />
                        <span className="font-semibold">WASH League Table</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        State WASH Rankings
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Track Water, Sanitation, and Hygiene progress across all 36 Nigerian states
                        and the Federal Capital Territory. Rankings update as data is collected.
                    </p>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap justify-center gap-6 mb-8">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-emerald-500 rounded" />
                        <span className="text-sm text-slate-600">Promotion Zone (Top 5)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-slate-300 rounded" />
                        <span className="text-sm text-slate-600">Safe Zone</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded" />
                        <span className="text-sm text-slate-600">Needs Improvement (Bottom 5)</span>
                    </div>
                </div>

                {/* Search */}
                <div className="relative max-w-md mx-auto mb-8">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                        type="text"
                        placeholder="Search for a state..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 py-3 rounded-xl border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-cyan-500/20"
                    />
                </div>

                {/* League Table */}
                <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white py-6">
                        <CardTitle className="flex items-center justify-between">
                            <span className="text-xl">2025 WASH League Standings</span>
                            <Badge className="bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                                Season Not Started
                            </Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-2 py-4 px-6 bg-slate-50 border-b border-slate-100 text-sm font-medium text-slate-500">
                            <div className="col-span-1">#</div>
                            <div className="col-span-4">State</div>
                            <div className="col-span-2 text-center">
                                <Droplets className="h-4 w-4 inline mr-1" />
                                Water
                            </div>
                            <div className="col-span-2 text-center">
                                <Home className="h-4 w-4 inline mr-1" />
                                Sanitation
                            </div>
                            <div className="col-span-2 text-center">
                                <Building2 className="h-4 w-4 inline mr-1" />
                                Hygiene
                            </div>
                            <div className="col-span-1 text-center">Pts</div>
                        </div>

                        {/* Table Rows */}
                        <div className="divide-y divide-slate-100">
                            {filteredStates.map((state) => (
                                <Dialog key={state.name}>
                                    <DialogTrigger asChild>
                                        <div
                                            className={`grid grid-cols-12 gap-2 py-4 px-6 cursor-pointer transition-all duration-200 ${getZoneStyle(state.zone)}`}
                                            onClick={() => setSelectedState(state)}
                                        >
                                            <div className="col-span-1 flex items-center gap-2">
                                                {getRankBadge(state.rank)}
                                            </div>
                                            <div className="col-span-4 flex items-center gap-3">
                                                <span className="font-semibold text-slate-900">{state.name}</span>
                                                {getChangeIcon(state.change)}
                                            </div>
                                            <div className="col-span-2 text-center">
                                                <span className="inline-flex items-center justify-center w-12 h-8 bg-blue-50 text-blue-700 rounded-lg font-medium">
                                                    {state.waterAccess}%
                                                </span>
                                            </div>
                                            <div className="col-span-2 text-center">
                                                <span className="inline-flex items-center justify-center w-12 h-8 bg-emerald-50 text-emerald-700 rounded-lg font-medium">
                                                    {state.sanitation}%
                                                </span>
                                            </div>
                                            <div className="col-span-2 text-center">
                                                <span className="inline-flex items-center justify-center w-12 h-8 bg-purple-50 text-purple-700 rounded-lg font-medium">
                                                    {state.hygiene}%
                                                </span>
                                            </div>
                                            <div className="col-span-1 text-center">
                                                <span className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl font-bold text-slate-700">
                                                    {state.points}
                                                </span>
                                            </div>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-lg">
                                        <DialogHeader>
                                            <DialogTitle className="flex items-center gap-3 text-2xl">
                                                {getRankBadge(state.rank)}
                                                {state.name}
                                            </DialogTitle>
                                        </DialogHeader>
                                        <div className="py-6">
                                            <div className="grid grid-cols-3 gap-4 mb-6">
                                                <div className="text-center p-4 bg-blue-50 rounded-xl">
                                                    <Droplets className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                                                    <div className="text-2xl font-bold text-blue-700">{state.waterAccess}%</div>
                                                    <div className="text-sm text-blue-600">Water Access</div>
                                                </div>
                                                <div className="text-center p-4 bg-emerald-50 rounded-xl">
                                                    <Home className="h-6 w-6 mx-auto mb-2 text-emerald-600" />
                                                    <div className="text-2xl font-bold text-emerald-700">{state.sanitation}%</div>
                                                    <div className="text-sm text-emerald-600">Sanitation</div>
                                                </div>
                                                <div className="text-center p-4 bg-purple-50 rounded-xl">
                                                    <Building2 className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                                                    <div className="text-2xl font-bold text-purple-700">{state.hygiene}%</div>
                                                    <div className="text-sm text-purple-600">Hygiene</div>
                                                </div>
                                            </div>
                                            <div className="text-center p-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl">
                                                <div className="text-4xl font-bold text-slate-800 mb-2">{state.points}</div>
                                                <div className="text-slate-600">Total Points</div>
                                            </div>
                                            <p className="text-sm text-slate-500 text-center mt-6">
                                                Data collection has not yet begun. Check back once the WASH League season starts.
                                            </p>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Info Notice */}
                <div className="mt-8 text-center p-6 bg-amber-50 border border-amber-200 rounded-xl">
                    <p className="text-amber-800">
                        <strong>⏳ League Not Started:</strong> All states currently show 0 points.
                        Rankings will update once WASH data collection begins across Nigeria.
                    </p>
                </div>
            </div>
        </div>
    );
}
