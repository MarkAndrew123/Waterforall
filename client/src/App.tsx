import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/navigation";
import EventNotification from "@/components/event-notification";
import Footer from "@/components/footer";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import Gallery from "@/pages/gallery";
import WashAnalysis from "@/pages/wash-analysis";
import WashLeaguePage from "@/pages/wash-league";
import StrategicSpringboardPage from "@/pages/strategic-springboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/wash-analysis" component={WashAnalysis} />
      <Route path="/wash-league" component={WashLeaguePage} />
      <Route path="/strategic-springboard" component={StrategicSpringboardPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <EventNotification />
          <Navigation />
          <main className="flex-1 pt-[104px]"> {/* 40px for notification + 64px for nav */}
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
