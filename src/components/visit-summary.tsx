"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Appointment } from "@/lib/types";
import { IndoorMap } from "./indoor-map";
import { CheckCircle, Calendar, Clock } from "lucide-react";

type VisitSummaryProps = {
  appointment: Appointment;
  onStartOver: () => void;
};

export function VisitSummary({ appointment, onStartOver }: VisitSummaryProps) {
  return (
    <div className="w-full max-w-4xl space-y-8">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-3xl">Appointment Confirmed!</CardTitle>
          <CardDescription>Your onboarding is complete. We look forward to seeing you.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-lg">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary">
              <Calendar className="h-5 w-5 text-primary" />
              <span>{appointment.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary">
              <Clock className="h-5 w-5 text-primary" />
              <span>{appointment.time}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <IndoorMap />

      <div className="text-center">
        <Button onClick={onStartOver} variant="link">Start a new onboarding</Button>
      </div>
    </div>
  );
}
