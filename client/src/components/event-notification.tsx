import { useState, useEffect } from "react";
import { Calendar, ExternalLink, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

const events = [
    {
        title: "11th World Water Forum Riyadh 2027",
        venue: "Riyadh, Saudi Arabia",
        date: "2027",
        description: "WAFI is participating in the preparatory process for the 11th World Water Forum",
        link: "https://worldwaterforum.org/",
    },
    {
        title: "1st Nigerian Water Finance Roundtable Meeting 2026",
        venue: "Virtual",
        date: "TBD",
        description: "A planned preparatory event to the World Water Forum Riyadh 2027",
        link: "https://drive.google.com/file/d/1Au7MjPVIUrudAQS40862XkP-umvanT0D/view?usp=sharing",
    },
];

export default function EventNotification() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % events.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const currentEvent = events[currentIndex];

    const goToNext = () => setCurrentIndex((prev) => (prev + 1) % events.length);
    const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);

    return (
        <div className="fixed top-0 right-0 left-0 z-[60] bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-10 gap-4">
                    {/* Left nav button */}
                    <button
                        onClick={goToPrev}
                        className="p-1 hover:bg-slate-800 rounded-full transition-colors hidden sm:block"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>

                    {/* Event Content */}
                    <div className="flex-1 flex items-center justify-center gap-4 text-sm overflow-hidden">
                        <span className="px-2 py-0.5 bg-blue-600 rounded text-xs font-bold uppercase tracking-wider flex-shrink-0">
                            Event
                        </span>

                        <div
                            key={currentIndex}
                            className="flex items-center gap-4 animate-fade-in whitespace-nowrap overflow-hidden"
                        >
                            <span className="font-semibold truncate max-w-[200px] sm:max-w-none">
                                {currentEvent.title}
                            </span>

                            <span className="hidden md:flex items-center gap-1 text-slate-400">
                                <MapPin className="h-3 w-3" />
                                {currentEvent.venue}
                            </span>

                            <span className="hidden lg:flex items-center gap-1 text-slate-400">
                                <Calendar className="h-3 w-3" />
                                {currentEvent.date}
                            </span>

                            {currentEvent.link && (
                                <a
                                    href={currentEvent.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors font-medium"
                                >
                                    Learn More
                                    <ExternalLink className="h-3 w-3" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Right nav button */}
                    <button
                        onClick={goToNext}
                        className="p-1 hover:bg-slate-800 rounded-full transition-colors hidden sm:block"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex gap-1">
                        {events.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex
                                    ? "bg-blue-500 w-4"
                                    : "bg-slate-600 hover:bg-slate-500"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
