"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Appointment } from "@/lib/types";

const availableTimes = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
];

type AppointmentSchedulerProps = {
  onBook: (appointment: Appointment) => void;
  onBack: () => void;
};

export function AppointmentScheduler({ onBook, onBack }: AppointmentSchedulerProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleBooking = () => {
    if (date && selectedTime) {
      onBook({ date, time: selectedTime });
    }
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Book an Appointment</CardTitle>
        <CardDescription>Select a date and time that works for you.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={(d) => d < new Date(new Date().setDate(new Date().getDate() -1))}
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium mb-4 text-center md:text-left">
              Available Times for {date ? date.toLocaleDateString() : '...'}
            </h3>
            <div className="grid grid-cols-3 gap-2 overflow-y-auto max-h-64 pr-2">
              {availableTimes.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => setSelectedTime(time)}
                  className={cn("transition-all duration-200", selectedTime === time && "ring-2 ring-ring ring-offset-2")}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between pt-8 mt-8 border-t">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={handleBooking} disabled={!date || !selectedTime}>
            Book Appointment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
