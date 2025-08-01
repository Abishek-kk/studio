"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export function IndoorMap() {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Your Guide to the Clinic</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-muted">
            <Image
                src="https://placehold.co/800x450.png"
                alt="Hospital map"
                layout="fill"
                objectFit="cover"
                data-ai-hint="hospital floor plan"
            />
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 800 450"
                preserveAspectRatio="none"
            >
                {/* Path from entrance to clinic */}
                <path
                    d="M 100 400 C 150 300, 250 250, 400 200 S 600 100, 680 120"
                    stroke="hsl(var(--primary))"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="15 10"
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        from="300"
                        to="0"
                        dur="5s"
                        repeatCount="indefinite"
                    />
                </path>
                {/* Start point */}
                <circle cx="100" cy="400" r="10" fill="hsl(var(--accent))" stroke="hsl(var(--background))" strokeWidth="3" />
                <text x="85" y="435" fontSize="14" fill="hsl(var(--foreground))" fontWeight="bold">You Are Here</text>

                {/* End point marker */}
                <g transform="translate(680, 120) scale(1.5)">
                    <MapPin className="text-primary drop-shadow-lg" fill="hsl(var(--primary-foreground))" size={24} transform="translate(-12, -24)" />
                </g>
                 <text x="630" y="100" fontSize="14" fill="hsl(var(--foreground))" fontWeight="bold">Cardiology Clinic</text>
            </svg>
        </div>
      </CardContent>
    </Card>
  );
}
