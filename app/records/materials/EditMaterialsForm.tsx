"use client"

import { useState } from "react"
import { SquarePen } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import EditMaterial, { type MaterialRow } from "./editMaterial"
import type { Material } from "./columns" // Import the Material type from columns.tsx

// Create a function to convert Material to MaterialRow
function materialToMaterialRow(material: Material): MaterialRow {
  return {
    id: Number.parseInt(material.id),
    material: material.name,
    name: material.name,
    unit: material.unitOfMeasurement,
    category: material.category,
    quantity: material.quantity,
    cost: material.cost,
    total_cost: material.total_cost,
    created_at: material.created_at,
  }
}

interface EditMaterialDialogProps {
  material: Material // Changed from MaterialRow to Material
  onMaterialUpdated: (updatedMaterial: Material) => void // Changed return type
}

export default function EditMaterialDialog({ material, onMaterialUpdated }: EditMaterialDialogProps) {
  const [open, setOpen] = useState(false)

  // Convert Material to MaterialRow for the EditMaterial component
  const materialRow = materialToMaterialRow(material)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
          <SquarePen className="mr-2 h-4 w-4" />
          Edit Cost
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Material Cost</DialogTitle>
          <DialogDescription>
            Update the cost for <span className="font-semibold">{material.name}</span>
          </DialogDescription>
        </DialogHeader>
        <EditMaterial
          material={materialRow}
          onMaterialUpdated={(updatedMaterialRow) => {
            // Convert MaterialRow back to Material
            const updatedMaterial: Material = {
              ...material,
              name: updatedMaterialRow.material,
              unitOfMeasurement: updatedMaterialRow.unit,
              // Update other properties as needed
              cost: updatedMaterialRow.cost,
              total_cost: updatedMaterialRow.total_cost,
              // Add any other properties that might have been updated
            }

            onMaterialUpdated(updatedMaterial)
            setOpen(false)
          }}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

