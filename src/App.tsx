import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BinaryHub from "./pages/BinaryHub";
import BinaryHubTeam from "./pages/BinaryHubTeam";
import BinaryHubGallery from "./pages/BinaryHubGallery";
import DigitalServicesCourses from "./pages/DigitalServicesCourses";
import DigitalServicesServices from "./pages/DigitalServicesServices";
import DigitalServicesInternships from "./pages/DigitalServicesInternships";
import EnrollCourse from "./pages/EnrollCourse";
import Consultancy from "./pages/Consultancy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/binary-hub" element={<BinaryHub />} />
          <Route path="/binary-hub/team" element={<BinaryHubTeam />} />
          <Route path="/binary-hub/gallery" element={<BinaryHubGallery />} />
          <Route path="/digital-services/courses" element={<DigitalServicesCourses />} />
          <Route path="/digital-services/services" element={<DigitalServicesServices />} />
          <Route path="/digital-services/internships" element={<DigitalServicesInternships />} />
          <Route path="/digital-services/enroll/:courseSlug" element={<EnrollCourse />} />
          <Route path="/consultancy" element={<Consultancy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
