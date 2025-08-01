"use client";

import { useState } from "react";
import { OnboardingStepper } from "./onboarding-stepper";
import { DocumentUpload } from "./document-upload";
import { PatientDataForm } from "./patient-data-form";
import { AppointmentScheduler } from "./appointment-scheduler";
import { VisitSummary } from "./visit-summary";
import type { PatientData, Appointment } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";

const FADE_IN_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function OnboardingDashboard() {
  const [step, setStep] = useState(1);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  const handleExtractionComplete = (data: PatientData) => {
    setPatientData(data);
    setStep(2);
  };

  const handleInfoConfirmed = (data: PatientData) => {
    setPatientData(data);
    setStep(3);
  };
  
  const handleAppointmentBooked = (app: Appointment) => {
    setAppointment(app);
    setStep(4);
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleStartOver = () => {
    setStep(1);
    setPatientData(null);
    setAppointment(null);
  }

  const renderStepComponent = () => {
    switch (step) {
      case 1:
        return <DocumentUpload onExtractionComplete={handleExtractionComplete} />;
      case 2:
        return patientData ? <PatientDataForm initialData={patientData} onConfirm={handleInfoConfirmed} onBack={handleBack} /> : null;
      case 3:
        return <AppointmentScheduler onBook={handleAppointmentBooked} onBack={handleBack} />;
      case 4:
        return appointment ? <VisitSummary appointment={appointment} onStartOver={handleStartOver} /> : null;
      default:
        return <DocumentUpload onExtractionComplete={handleExtractionComplete} />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full p-4 sm:p-8 space-y-12">
      <header className="text-center space-y-2">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight">OnboardAI</h1>
        <p className="text-muted-foreground text-lg">A smarter, faster way to begin your care.</p>
      </header>

      <div className="w-full max-w-md lg:max-w-2xl pb-10">
        <OnboardingStepper currentStep={step} />
      </div>

      <main className="w-full flex justify-center">
        <AnimatePresence mode="wait">
            <motion.div
                key={step}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={FADE_IN_VARIANTS}
                transition={{ duration: 0.3 }}
                className="w-full flex justify-center"
            >
                {renderStepComponent()}
            </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
