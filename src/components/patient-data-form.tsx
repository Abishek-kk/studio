"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { PatientData } from "@/lib/types";
import { Trash2 } from "lucide-react";

const formSchema = z.object({
  patientName: z.string().optional(),
  dateOfBirth: z.string().optional(),
  medicalConditions: z.array(z.object({ value: z.string() })).optional(),
  allergies: z.array(z.object({ value: z.string() })).optional(),
  medications: z.array(z.object({ value: z.string() })).optional(),
});

type PatientDataFormProps = {
  initialData: PatientData;
  onConfirm: (data: PatientData) => void;
  onBack: () => void;
};

export function PatientDataForm({ initialData, onConfirm, onBack }: PatientDataFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        patientName: initialData.patientName || "",
        dateOfBirth: initialData.dateOfBirth || "",
        medicalConditions: initialData.medicalConditions?.map(value => ({ value })) || [],
        allergies: initialData.allergies?.map(value => ({ value })) || [],
        medications: initialData.medications?.map(value => ({ value })) || [],
    },
  });

  const { fields: conditions, append: appendCondition, remove: removeCondition } = useFieldArray({ control: form.control, name: "medicalConditions" });
  const { fields: allergies, append: appendAllergy, remove: removeAllergy } = useFieldArray({ control: form.control, name: "allergies" });
  const { fields: medications, append: appendMedication, remove: removeMedication } = useFieldArray({ control: form.control, name: "medications" });


  function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedData: PatientData = {
        patientName: values.patientName,
        dateOfBirth: values.dateOfBirth,
        medicalConditions: values.medicalConditions?.map(item => item.value),
        allergies: values.allergies?.map(item => item.value),
        medications: values.medications?.map(item => item.value),
    }
    onConfirm(formattedData);
  }

  const renderArrayField = (label: string, fields: any[], append: (obj: { value: string }) => void, remove: (index: number) => void) => (
    <div>
        <FormLabel>{label}</FormLabel>
        <div className="space-y-2 mt-2">
            {fields.map((field, index) => (
                <FormField
                    key={field.id}
                    control={form.control}
                    name={`${label.toLowerCase().replace(' ', '')}.${index}.value` as any}
                    render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </FormItem>
                    )}
                />
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => append({ value: "" })}>
                Add {label.slice(0, -1)}
            </Button>
        </div>
    </div>
  );

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Verify Your Information</CardTitle>
        <CardDescription>Please review and confirm the information extracted from your document. Edit any fields if necessary.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="patientName" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
                    <FormItem><FormLabel>Date of Birth</FormLabel><FormControl><Input placeholder="YYYY-MM-DD" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
            </div>

            {renderArrayField("Medical Conditions", conditions, appendCondition, removeCondition)}
            {renderArrayField("Allergies", allergies, appendAllergy, removeAllergy)}
            {renderArrayField("Medications", medications, appendMedication, removeMedication)}
            
            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={onBack}>
                Back
              </Button>
              <Button type="submit">Confirm & Continue</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
