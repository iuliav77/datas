"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type SystemType = "solar" | "aerothermal" | "hydro"
type Component = {
  id: string
  name: string
  systemTypes: SystemType[]
}

const components: Component[] = [
  { id: "solar-panel", name: "Solar Panel", systemTypes: ["solar"] },
  { id: "tank", name: "Storage Tank", systemTypes: ["solar", "hydro"] },
  { id: "consumer", name: "Consumer Unit", systemTypes: ["solar", "aerothermal", "hydro"] },
  { id: "heat-pump", name: "Heat Pump", systemTypes: ["aerothermal"] },
  { id: "turbine", name: "Hydro Turbine", systemTypes: ["hydro"] },
  { id: "controller", name: "System Controller", systemTypes: ["solar", "aerothermal", "hydro"] },
]

export function ConfiguratorPanel() {
  const [systemType, setSystemType] = useState<SystemType | null>(null)
  const [selectedComponents, setSelectedComponents] = useState<string[]>([])

  const handleSystemTypeChange = (type: SystemType) => {
    setSystemType(type)
    setSelectedComponents([]) // Reset selections when system type changes
  }

  const handleComponentToggle = (componentId: string) => {
    setSelectedComponents(prev => 
      prev.includes(componentId)
        ? prev.filter(id => id !== componentId)
        : [...prev, componentId]
    )
  }

  const handleBuildSystem = () => {
    if (!systemType) {
      console.log("Please select a system type first")
      return
    }
    
    const selectedComponentNames = components
      .filter(comp => selectedComponents.includes(comp.id))
      .map(comp => comp.name)
    
    console.log("System Type:", systemType)
    console.log("Selected Components:", selectedComponentNames)
  }

  const availableComponents = components.filter(
    component => !systemType || component.systemTypes.includes(systemType)
  )

  return (
    <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">System Configurator</h2>
        <p className="text-gray-600">Select your system type and components</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">System Type</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">
                {systemType ? systemType.charAt(0).toUpperCase() + systemType.slice(1) : "Select System Type"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              <DropdownMenuItem onClick={() => handleSystemTypeChange("solar")}>
                Solar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSystemTypeChange("aerothermal")}>
                Aerothermal
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSystemTypeChange("hydro")}>
                Hydro
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {systemType && (
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-2">Available Components</label>
            <div className="space-y-2">
              {availableComponents.map((component) => (
                <div key={component.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={component.id}
                    checked={selectedComponents.includes(component.id)}
                    onCheckedChange={() => handleComponentToggle(component.id)}
                  />
                  <label
                    htmlFor={component.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {component.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          className="w-full"
          onClick={handleBuildSystem}
          disabled={!systemType || selectedComponents.length === 0}
        >
          Build System
        </Button>
      </div>
    </div>
  )
} 