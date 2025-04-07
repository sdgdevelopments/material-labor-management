"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { supabase } from "@/utils/supabase/client"

export interface MaterialRow {
  id: number
  material: string
  name?: string
  unit: string
  category: string
  quantity: number
  cost: number
  total_cost: number
  created_at?: string
  updated_at?: string
}

const formSchema = z.object({
  cost: z.coerce.number().refine((value) => /^\d+(\.\d{2})$/.test(value.toFixed(2)), {
    message: "Cost must be a decimal with 2 decimal places",
  }),
})

export default function EditMaterial({
  material,
  onMaterialUpdated,
  onClose,
}: {
  material: MaterialRow
  onMaterialUpdated: (updatedMaterial: MaterialRow) => void
  onClose: () => void
}) {
  const [loader, setLoader] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cost: material.cost,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoader(true)
    try {
      const now = new Date().toISOString()
      const total_cost = Number.parseFloat((values.cost * material.quantity).toFixed(2))

      const { data, error } = await supabase
        .from("material_adding")
        .update({
          cost: values.cost,
          total_cost,
          updated_at: now,
        })
        .eq("id", material.id)
        .select("*")

      // Add to history
      const { data: historyData, error: historyError } = await supabase
        .from("material_history")
        .insert([
          {
            material: material.material || material.name,
            cost: values.cost,
            date: new Date().toISOString().split("T")[0],
            created_at: now,
          },
        ])
        .select("*")

      if (error) {
        toast.error("Server-side error")
      } else {
        if (data && data.length > 0) {
          onMaterialUpdated(data[0])
          toast.success("Material Cost Updated")
          onClose()
        }
      }
    } catch (error) {
      toast.error("Failed to update the material. Please try again.")
    } finally {
      setLoader(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-full mx-auto py-4 px-4">
        <div className="mb-4">
          <p className="text-sm font-medium">
            Material: <span className="font-bold">{material.material || material.name}</span>
          </p>
          <p className="text-sm font-medium">
            Current Cost: <span className="font-bold">₱{material.cost.toFixed(2)}</span>
          </p>
        </div>

        <FormField
          control={form.control}
          name="cost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Cost</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter new cost (e.g., 65.00)"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : "")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loader}>
          {loader ? "Updating..." : "Update Cost"}
        </Button>
      </form>
    </Form>
  )
}

