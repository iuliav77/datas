"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Radio, Settings2, Sun, Wind, Droplets, Lightbulb, Activity, Zap, Droplet, Thermometer, SunDim, RefreshCw, ThermometerSun } from "lucide-react";

const SYSTEM_OPTIONS = {
  solar: {
    core: ["Storage Tank", "Consumer Unit"],
    modular: ["Photovoltaic (PV) Panels", "Solar Thermal Collectors", "CSP", "Solar Air Heaters"],
    optional: ["Inverter", "Heat Pump"]
  },
  aerothermal: {
    core: ["Storage Tank", "Consumer Unit"],
    modular: ["Air Source Heat Pump", "Ground Source Heat Pump", "Exhaust Air Heat Pump"],
    optional: ["Inverter", "Solar Panel"]
  },
  hydro: {
    core: ["Storage Tank", "Consumer Unit"],
    modular: ["Water Turbine", "Pumped Storage System", "Micro-hydro Systems"],
    optional: ["Inverter", "Pump"]
  }
};

export default function Page() {
  const router = useRouter();
  const [selectedSystem, setSelectedSystem] = useState("");
  const [selectedModular, setSelectedModular] = useState("");
  const [selectedOptional, setSelectedOptional] = useState<string[]>([]);

  const handleBuild = () => {
    console.log("Selected System:", selectedSystem);
    console.log("Selected Modular Component:", selectedModular);
    console.log("Selected Optional Components:", selectedOptional);
    
    const query = new URLSearchParams({
      type: selectedSystem,
      modular: selectedModular,
      optional: selectedOptional.join(","),
    }).toString();
    router.push(`/simulation?${query}`);
  };

  const toggleOptionalComponent = (component: string) => {
    setSelectedOptional((prev) =>
      prev.includes(component)
        ? prev.filter((c) => c !== component)
        : [...prev, component]
    );
  };

  const components = SYSTEM_OPTIONS[selectedSystem as keyof typeof SYSTEM_OPTIONS] || { core: [], modular: [], optional: [] };

  return (
    <div className="h-screen bg-gradient-to-b from-background to-background/80 text-foreground p-2">
      <div className="h-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_2.2fr] gap-3">
        {/* Left Column: Logo and Welcome */}
        <div className="space-y-3">
          {/* Logo Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/20 rounded-xl p-3 shadow-lg border border-primary/20 backdrop-blur-sm"
          >
            <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-lg shadow-md border border-primary/30">
              <Image
                src="/logo.png"
                alt="NeuralHeat Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                NeuralHeat
              </h1>
              <p className="text-sm text-primary/70">Smart thermal system configurator</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-green-600">System Ready</span>
              </div>
            </div>
          </motion.div>

          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-primary/10 via-primary/20 to-primary/10 rounded-xl p-3 space-y-2 shadow-lg border border-primary/20 backdrop-blur-sm"
          >
            <h2 className="text-lg font-medium flex items-center gap-2">
              <div className="p-1.5 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
              </div>
              Welcome to NeuralHeat Configurator
            </h2>
            <p className="text-sm text-primary/70">
              Design your optimal thermal system by selecting components that best suit your needs.
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-lg p-2 border border-blue-500/20 hover:border-blue-500/30 transition-colors">
                <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center text-sm font-medium mb-1 text-blue-500 border border-blue-500/40">1</div>
                <p className="text-xs font-medium">Choose system type</p>
                <p className="text-xs text-primary/70 mt-0.5">Select your thermal system</p>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-lg p-2 border border-green-500/20 hover:border-green-500/30 transition-colors">
                <div className="w-6 h-6 rounded-full bg-green-500/30 flex items-center justify-center text-sm font-medium mb-1 text-green-500 border border-green-500/40">2</div>
                <p className="text-xs font-medium">Select modular</p>
                <p className="text-xs text-primary/70 mt-0.5">Pick your main component</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-lg p-2 border border-purple-500/20 hover:border-purple-500/30 transition-colors">
                <div className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center text-sm font-medium mb-1 text-purple-500 border border-purple-500/40">3</div>
                <p className="text-xs font-medium">Add optional</p>
                <p className="text-xs text-primary/70 mt-0.5">Enhance your system</p>
              </div>
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-primary/10 via-primary/20 to-primary/10 rounded-xl p-3 space-y-2 shadow-lg border border-primary/20 backdrop-blur-sm"
          >
            <h2 className="text-lg font-medium flex items-center gap-2">
              <div className="p-1.5 bg-primary/20 rounded-lg border border-primary/30">
                <Settings2 className="w-5 h-5 text-primary" />
              </div>
              Key Features
            </h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-lg border border-blue-500/20 hover:border-blue-500/30 transition-colors">
                <div className="p-1 bg-blue-500/20 rounded border border-blue-500/30">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Smart Configuration</p>
                  <p className="text-xs text-primary/70">Intelligent component selection</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-lg border border-green-500/20 hover:border-green-500/30 transition-colors">
                <div className="p-1 bg-green-500/20 rounded border border-green-500/30">
                  <Activity className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Real-time Analysis</p>
                  <p className="text-xs text-primary/70">Instant performance feedback</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-lg border border-purple-500/20 hover:border-purple-500/30 transition-colors">
                <div className="p-1 bg-purple-500/20 rounded border border-purple-500/30">
                  <Zap className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Energy Efficient</p>
                  <p className="text-xs text-primary/70">Optimized thermal solutions</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Configurator */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* System Type Section */}
          <Card className="border-none shadow-lg bg-gradient-to-br from-background to-background/80 border border-primary/20 backdrop-blur-sm max-w-md">
            <CardHeader className="p-2 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-t-lg border-b border-primary/20">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-primary/20 rounded-lg border border-primary/30">
                  <Settings2 className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold">System Type</CardTitle>
                  <p className="text-xs text-primary/70 mt-0.5">
                    Select your thermal system configuration
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-2 space-y-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full h-9 bg-gradient-to-r from-primary/10 to-primary/20 hover:from-primary/20 hover:to-primary/30 transition-all duration-200 border-primary/30">
                    {selectedSystem ? (
                      <div className="flex items-center gap-2">
                        {selectedSystem === "solar" && <Sun className="w-4 h-4 text-yellow-500" />}
                        {selectedSystem === "aerothermal" && <Wind className="w-4 h-4 text-blue-500" />}
                        {selectedSystem === "hydro" && <Droplets className="w-4 h-4 text-cyan-500" />}
                        <span className="capitalize text-sm font-medium">{selectedSystem}</span>
                      </div>
                    ) : (
                      <span className="text-sm">Select System Type</span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-row gap-2 p-2 bg-white/95 backdrop-blur-sm border border-primary/20">
                  {Object.keys(SYSTEM_OPTIONS).map((type) => (
                    <DropdownMenuItem
                      key={type}
                      onClick={() => {
                        setSelectedSystem(type);
                        setSelectedModular("");
                        setSelectedOptional([]);
                      }}
                      className="flex items-center gap-2 min-w-[120px] justify-center text-sm hover:bg-primary/20 transition-colors duration-200"
                    >
                      {type === "solar" && <Sun className="w-4 h-4 text-yellow-500" />}
                      {type === "aerothermal" && <Wind className="w-4 h-4 text-blue-500" />}
                      {type === "hydro" && <Droplets className="w-4 h-4 text-cyan-500" />}
                      <span className="capitalize">{type}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {selectedSystem && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg p-2 space-y-1.5 border border-primary/20"
                >
                  <h2 className="text-sm font-medium flex items-center gap-2">
                    <div className="p-1 bg-yellow-500/20 rounded border border-yellow-500/30">
                      <Lightbulb className="w-4 h-4 text-yellow-500" />
                    </div>
                    About {selectedSystem.charAt(0).toUpperCase() + selectedSystem.slice(1)} Systems
                  </h2>
                  <p className="text-xs text-primary/70">
                    {selectedSystem === "solar" && "Harness the power of sunlight to generate thermal energy efficiently. Solar systems are ideal for areas with abundant sunlight."}
                    {selectedSystem === "aerothermal" && "Utilize ambient air temperature to provide sustainable heating and cooling. Aerothermal systems are versatile and efficient."}
                    {selectedSystem === "hydro" && "Generate thermal energy using water-based systems for consistent performance. Hydro systems are perfect for locations with water access."}
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* Core Components Section */}
          <Card className="border-none shadow-lg bg-gradient-to-br from-background to-background/80 border border-green-500/20 backdrop-blur-sm max-w-md">
            <CardHeader className="p-2 bg-gradient-to-r from-green-500/20 via-green-500/10 to-green-500/20 rounded-t-lg border-b border-green-500/20">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-green-500/20 rounded-lg border border-green-500/30">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold">Core Components</CardTitle>
                  <p className="text-xs text-green-500/70 mt-0.5">
                    Essential components for your system
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-2 space-y-1.5">
              <div className="flex items-center gap-2 bg-green-500/10 p-2 rounded-lg border border-green-500/20 hover:border-green-500/30 transition-colors hover:bg-green-500/20">
                <Checkbox
                  id="storage-tank"
                  checked={true}
                  disabled
                  className="border-green-500/50 h-4 w-4"
                />
                <label htmlFor="storage-tank" className="text-sm font-medium flex-1">
                  Storage Tank
                </label>
                <div className="text-xs text-green-500/70">500L</div>
              </div>
              <div className="flex items-center gap-2 bg-green-500/10 p-2 rounded-lg border border-green-500/20 hover:border-green-500/30 transition-colors hover:bg-green-500/20">
                <Checkbox
                  id="consumer-unit"
                  checked={true}
                  disabled
                  className="border-green-500/50 h-4 w-4"
                />
                <label htmlFor="consumer-unit" className="text-sm font-medium flex-1">
                  Consumer Unit
                </label>
                <div className="text-xs text-green-500/70">3kW</div>
              </div>
            </CardContent>
          </Card>

          {/* Modular Components Section */}
          <Card className="border-none shadow-lg bg-gradient-to-br from-background to-background/80 border border-blue-500/20 backdrop-blur-sm max-w-md">
            <CardHeader className="p-2 bg-gradient-to-r from-blue-500/20 via-blue-500/10 to-blue-500/20 rounded-t-lg border-b border-blue-500/20">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-500/20 rounded-lg border border-blue-500/30">
                  <Radio className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold">Modular Components</CardTitle>
                  <p className="text-xs text-blue-500/70 mt-0.5">
                    Select your primary component
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-2 space-y-1.5">
              {!selectedSystem ? (
                <div className="p-2 text-xs text-blue-500/70 text-center bg-blue-500/10 rounded-lg border border-blue-500/20">
                  Please select a system type first
                </div>
              ) : (
                components.modular.map((component) => {
                  // Determine capacity/unit for each component
                  const getCapacity = () => {
                    if (component.includes("PV") || component.includes("Photovoltaic")) 
                      return "6 panels";
                    if (component.includes("Thermal")) 
                      return "4 units";
                    if (component.includes("CSP")) 
                      return "1 unit";
                    if (component.includes("Air")) 
                      return "2 units";
                    if (component.includes("Turbine")) 
                      return "1 unit";
                    if (component.includes("Heat Pump")) 
                      return "8 kW";
                    if (component.includes("Pump")) 
                      return "3 kW";
                    if (component.includes("Storage")) 
                      return "25 kWh";
                    if (component.includes("Micro-hydro")) 
                      return "2 units";
                    return "1 unit";
                  };
                  
                  return (
                    <div key={component} className="flex items-center gap-2 bg-blue-500/10 p-2 rounded-lg border border-blue-500/20 hover:border-blue-500/30 transition-colors hover:bg-blue-500/20">
                      <input
                        type="radio"
                        id={component.toLowerCase().replace(/\s+/g, '-')}
                        name="modular"
                        checked={selectedModular === component}
                        onChange={() => setSelectedModular(component)}
                        className="h-4 w-4 text-blue-500 focus:ring-blue-500"
                      />
                      <label htmlFor={component.toLowerCase().replace(/\s+/g, '-')} className="text-sm font-medium flex-1">
                        {component}
                      </label>
                      <div className="text-xs text-blue-500/70">{getCapacity()}</div>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>

          {/* Optional Components Section */}
          <Card className="border-none shadow-lg bg-gradient-to-br from-background to-background/80 border border-purple-500/20 backdrop-blur-sm max-w-md">
            <CardHeader className="p-2 bg-gradient-to-r from-purple-500/20 via-purple-500/10 to-purple-500/20 rounded-t-lg border-b border-purple-500/20">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-purple-500/20 rounded-lg border border-purple-500/30">
                  <Settings2 className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold">Optional Components</CardTitle>
                  <p className="text-xs text-purple-500/70 mt-0.5">
                    Enhance your system with additional features
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-2 space-y-1.5">
              {!selectedSystem ? (
                <div className="p-2 text-xs text-purple-500/70 text-center bg-purple-500/10 rounded-lg border border-purple-500/20">
                  Please select a system type first
                </div>
              ) : (
                components.optional.map((component) => {
                  // Determine capacity for optional component
                  const getCapacity = () => {
                    if (component.includes("Inverter")) 
                      return "5 kW";
                    if (component.includes("Heat Pump")) 
                      return "8 kW";
                    if (component.includes("Solar") || component.includes("PV")) 
                      return "4 panels";
                    if (component.includes("Pump")) 
                      return "2 kW";
                    return "1 unit";
                  };
                  
                  return (
                    <div key={component} className="flex items-center gap-2 bg-purple-500/10 p-2 rounded-lg border border-purple-500/20 hover:border-purple-500/30 transition-colors hover:bg-purple-500/20">
                      <Checkbox
                        id={component.toLowerCase().replace(/\s+/g, '-')}
                        checked={selectedOptional.includes(component)}
                        onCheckedChange={() => toggleOptionalComponent(component)}
                        className="border-purple-500/50 h-4 w-4"
                      />
                      <label htmlFor={component.toLowerCase().replace(/\s+/g, '-')} className="text-sm font-medium flex-1">
                        {component}
                      </label>
                      <div className="text-xs text-purple-500/70">{getCapacity()}</div>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>

          {/* Build Button Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="col-span-2"
          >
            <Button
              onClick={handleBuild}
              disabled={!selectedSystem || !selectedModular}
              className="group w-full h-12 text-sm bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary/80 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/30 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/30 via-blue-500/30 to-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-center justify-center gap-2 relative z-10">
                <div className="flex items-center gap-1.5">
                  <div className="p-1.5 bg-white/20 rounded-lg border border-white/30">
                    <Zap className="w-4 h-4 text-white animate-pulse" />
                  </div>
                  <span className="font-medium text-white">Build Thermal System</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse delay-75" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse delay-150" />
                </div>
              </div>
            </Button>
            {!selectedSystem || !selectedModular ? (
              <p className="text-xs text-primary/70 mt-1.5 text-center">
                Please select a system type and modular component to continue
              </p>
            ) : (
              <p className="text-xs text-primary/70 mt-1.5 text-center">
                Ready to generate your thermal system configuration
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
