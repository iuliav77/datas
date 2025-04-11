"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Activity, Thermometer, Droplets, Zap, Gauge } from "lucide-react";

// Add animation keyframes
const styles = `
  @keyframes flow {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

interface SystemDiagramProps {
  systemType: string;
  components: string[];
  metrics?: {
    pvPanelTemp?: number;
    pvPanelOutput?: number;
    inverterEfficiency?: number;
    inverterVoltage?: number;
    heatPumpCOP?: number;
    heatPumpTemp?: number;
    storageLevel?: number;
    storageTemp?: number;
    consumerDemand?: number;
    consumerFlow?: number;
  };
}

// Component configuration with technical details
const componentConfig = {
  "solar panel": {
    label: "Solar Panel",
    icon: "🔆",
    color: "bg-yellow-200 border-yellow-400",
    arrowColor: "bg-yellow-400",
    metrics: {
      temperature: "45°C",
      efficiency: "92%",
      power: "2.5kW"
    },
    status: "optimal"
  },
  "csp": {
    label: "CSP",
    icon: "☀️",
    color: "bg-amber-200 border-amber-400",
    arrowColor: "bg-amber-400",
    metrics: {
      temperature: "650°C",
      efficiency: "80%",
      power: "5.0kW"
    },
    status: "operating"
  },
  "heat pump": {
    label: "Heat Pump",
    icon: "♨️",
    color: "bg-teal-200 border-teal-400",
    arrowColor: "bg-teal-400",
    metrics: {
      temperature: "65°C",
      cop: "3.2",
      flow: "18L/min"
    },
    status: "operating"
  },
  "tank": {
    label: "Storage Tank",
    icon: "💧",
    color: "bg-blue-200 border-blue-400",
    arrowColor: "bg-blue-400",
    metrics: {
      temperature: "58°C",
      level: "85%",
      volume: "500L"
    },
    status: "normal"
  },
  "consumer": {
    label: "Consumer",
    icon: "🏭",
    color: "bg-orange-200 border-orange-400",
    arrowColor: "bg-orange-400",
    metrics: {
      demand: "15kW",
      flow: "12L/min",
      returnTemp: "45°C"
    },
    status: "active"
  },
  "turbine": {
    label: "Turbine",
    icon: "🔄",
    color: "bg-green-200 border-green-400",
    arrowColor: "bg-green-400",
    metrics: {
      power: "1.2MW",
      efficiency: "88%",
      rpm: "1500"
    },
    status: "running"
  },
};

// Status indicator component
const StatusIndicator = ({ status }: { status: string }) => {
  const statusColors = {
    optimal: "bg-green-500",
    operating: "bg-blue-500",
    normal: "bg-gray-500",
    active: "bg-orange-500",
    running: "bg-green-500"
  };

  return (
    <div className="flex items-center gap-1">
      <div className={`w-2 h-2 rounded-full ${statusColors[status as keyof typeof statusColors]}`} />
      <span className="text-[10px] capitalize">{status}</span>
    </div>
  );
};

// Metric display component
const MetricDisplay = ({ icon: Icon, value, label }: { icon: any, value: string, label: string }) => (
  <div className="flex items-center gap-1">
    <Icon className="w-3 h-3 text-muted-foreground" />
    <span className="text-[10px] font-medium">{value}</span>
    <span className="text-[10px] text-muted-foreground">{label}</span>
  </div>
);

export function SystemDiagram({ systemType, components, metrics }: SystemDiagramProps) {
  if (components.length === 0) {
    return (
      <div className="min-h-[200px] flex items-center justify-center border rounded-lg bg-muted">
        <p className="text-muted-foreground">No components selected</p>
      </div>
    );
  }

  // Sort components in logical order with modular component first and consumer last
  const orderedComponents = [...components].sort((a, b) => {
    // Always put Consumer Unit/Consumer at the end
    if (a.toLowerCase().includes("consumer")) return 1;
    if (b.toLowerCase().includes("consumer")) return -1;
    
    // Helper function to identify if a component is modular
    const isModular = (comp: string) => {
      const lower = comp.toLowerCase();
      return lower.includes("solar") || 
             lower.includes("pv") || 
             lower.includes("air source") || 
             lower.includes("ground source") || 
             lower.includes("water turbine") ||
             lower.includes("thermal");
    };
    
    // Always put modular components first
    if (isModular(a) && !isModular(b)) return -1;
    if (!isModular(a) && isModular(b)) return 1;
    
    // For the rest, use standard ordering
    const getOrderPriority = (comp: string) => {
      const lowerComp = comp.toLowerCase();
      if (lowerComp.includes("solar") || lowerComp.includes("pv") || lowerComp.includes("air")) return 1;
      if (lowerComp.includes("inverter")) return 2;
      if (lowerComp.includes("heat pump")) return 3;
      if (lowerComp.includes("tank")) return 4;
      return 5;
    };
    
    return getOrderPriority(a) - getOrderPriority(b);
  });

  // Function to get component data
  const getComponentData = (component: string) => {
    switch (component.toLowerCase()) {
      case "photovoltaic (pv) panels":
        return [
          { label: "Temperature", value: `${metrics?.pvPanelTemp || 45}°C` },
          { label: "Output", value: `${metrics?.pvPanelOutput || 2.5}kW` }
        ];
      case "csp":
        return [
          { label: "Temperature", value: "650°C" },
          { label: "Output", value: "5.0kW" }
        ];
      case "inverter":
        return [
          { label: "Efficiency", value: `${metrics?.inverterEfficiency || 96}%` },
          { label: "Voltage", value: `${metrics?.inverterVoltage || 230}V` }
        ];
      case "heat pump":
        return [
          { label: "COP", value: metrics?.heatPumpCOP || 3.2 },
          { label: "Temp", value: `${metrics?.heatPumpTemp || 55}°C` }
        ];
      case "storage tank":
        return [
          { label: "Level", value: `${metrics?.storageLevel || 85}%` },
          { label: "Temp", value: `${metrics?.storageTemp || 58}°C` }
        ];
      case "consumer unit":
        return [
          { label: "Demand", value: `${metrics?.consumerDemand || 1.8}kW` },
          { label: "Flow", value: `${metrics?.consumerFlow || 12}L/m` }
        ];
      default:
        return [
          { label: "Status", value: "Active" },
          { label: "Efficiency", value: "94%" }
        ];
    }
  };

  return (
    <div className="min-h-[200px] border rounded-lg bg-blue-100/50 p-4">
      <style>{styles}</style>
      <div className="overflow-x-auto">
        <div className="flex items-center justify-start w-full gap-2">
          {orderedComponents.map((component, index) => {
            // Get the normalized component name for configuration lookup
            const normalizedName = component.toLowerCase().includes("tank") ? "tank" : 
                                  component.toLowerCase().includes("consumer") ? "consumer" :
                                  component.toLowerCase().includes("heat pump") ? "heat pump" :
                                  component.toLowerCase().includes("csp") ? "csp" :
                                  component.toLowerCase().includes("solar") || component.toLowerCase().includes("pv") ? "solar panel" :
                                  component.toLowerCase().includes("inverter") ? "inverter" :
                                  component.toLowerCase().includes("turbine") ? "turbine" : "";
            
            const config = normalizedName ? componentConfig[normalizedName as keyof typeof componentConfig] : {
              label: component,
              icon: "📦",
              color: "bg-white border-gray-200",
              arrowColor: "bg-gray-300",
              metrics: {},
              status: "unknown"
            };

            // Define status based on component type
            const getStatus = () => {
              if (component.toLowerCase().includes("solar") || component.toLowerCase().includes("pv")) {
                return "optimal";
              }
              if (component.toLowerCase().includes("tank")) {
                return "normal";
              }
              if (component.toLowerCase().includes("consumer")) {
                return "active";
              }
              if (component.toLowerCase().includes("inverter")) {
                return "operating";
              }
              if (component.toLowerCase().includes("heat pump")) {
                return "operating";
              }
              return "unknown";
            };

            // Make sure we have a valid status - default to "unknown" if undefined
            const status = (config && config.status && config.status !== "unknown") 
              ? config.status 
              : getStatus();

            // Define status color
            const getStatusColor = () => {
              if (status === "optimal") return "bg-green-600";
              if (status === "normal") return "bg-gray-600";
              if (status === "active") return "bg-orange-600";
              if (status === "operating") return "bg-blue-600";
              if (status === "running") return "bg-green-600";
              return "bg-gray-400";
            };

            // Define color scheme based on component type
            const getColorScheme = () => {
              if (component.toLowerCase().includes("csp")) {
                return "bg-amber-200 border-amber-500";
              }
              if (component.toLowerCase().includes("solar") || component.toLowerCase().includes("pv")) {
                return "bg-yellow-200 border-yellow-500";
              }
              if (component.toLowerCase().includes("heat pump")) {
                return "bg-teal-200 border-teal-500";
              }
              if (component.toLowerCase().includes("inverter")) {
                return "bg-purple-200 border-purple-500";
              }
              if (component.toLowerCase().includes("tank")) {
                return "bg-blue-200 border-blue-500";
              }
              if (component.toLowerCase().includes("consumer")) {
                return "bg-orange-200 border-orange-500";
              }
              return "bg-gray-200 border-gray-500";
            };
            
            // Define arrow color
            const getArrowColor = () => {
              if (component.toLowerCase().includes("csp")) {
                return "bg-amber-500";
              }
              if (component.toLowerCase().includes("solar") || component.toLowerCase().includes("pv")) {
                return "bg-yellow-500";
              }
              if (component.toLowerCase().includes("heat pump")) {
                return "bg-teal-500";
              }
              if (component.toLowerCase().includes("inverter")) {
                return "bg-purple-500";
              }
              if (component.toLowerCase().includes("tank")) {
                return "bg-blue-500";
              }
              if (component.toLowerCase().includes("consumer")) {
                return "bg-orange-500";
              }
              return "bg-gray-400";
            };

            // Get the appropriate icon
            const getIcon = () => {
              if (normalizedName === "csp") return "☀️";
              if (normalizedName === "solar panel") return "��";
              if (normalizedName === "heat pump") return "♨️";
              if (normalizedName === "tank") return "💧";
              if (normalizedName === "consumer") return "🏭";
              if (normalizedName === "inverter") return "🔌";
              if (normalizedName === "turbine") return "🔄";
              return "📦";
            };

            // Get a shorter display name for the component
            const getShortName = (comp: string) => {
              if (comp.toLowerCase().includes("photovoltaic") || comp.toLowerCase().includes("pv")) {
                return "PV Panels";
              }
              if (comp.toLowerCase().includes("solar thermal")) {
                return "Solar Thermal";
              }
              if (comp.toLowerCase().includes("consumer unit")) {
                return "Consumer";
              }
              if (comp.toLowerCase().includes("storage tank")) {
                return "Storage";
              }
              if (comp.toLowerCase() === "csp") {
                return "CSP";
              }
              if (comp.length > 15) {
                return comp.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1, 3)).join(' ');
              }
              return comp;
            };

            const statusColor = getStatusColor();
            const colorScheme = getColorScheme();
            const arrowColor = getArrowColor();
            const icon = getIcon();
            const componentData = getComponentData(component);
            const shortName = getShortName(component);

            return (
              <div key={component} className="flex items-center">
                {/* Component Box */}
                <div className={`w-[140px] h-[140px] ${colorScheme} rounded-lg p-2 relative shadow-sm hover:shadow-md transition-shadow`}>
                  {/* Status indicator in top right */}
                  {status !== "unknown" && (
                    <div className="absolute top-2 right-2 flex items-center gap-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${statusColor}`} />
                      <span className="text-[9px] capitalize leading-none">{status}</span>
                    </div>
                  )}
                  
                  {/* Icon and name in top left */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="text-lg">{icon}</span>
                    <span className="text-xs font-semibold">{shortName}</span>
                  </div>
                  
                  {/* Component data */}
                  <div className="space-y-1.5">
                    {componentData.map((data, i) => (
                      <div key={i} className="grid grid-cols-2 text-xs">
                        <span className="text-gray-600">{data.label}:</span>
                        <span className="font-semibold text-right">{data.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow (except for last component) */}
                {index < orderedComponents.length - 1 && (
                  <div className="h-[4px] w-[20px] relative overflow-hidden">
                    <div className={`absolute inset-0 ${arrowColor} rounded-full`}></div>
                    <div className={`absolute -right-1 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ${arrowColor === 'bg-yellow-500' ? 'border-l-[12px] border-l-yellow-500' : 
                      arrowColor === 'bg-purple-500' ? 'border-l-[12px] border-l-purple-500' : 
                      arrowColor === 'bg-teal-500' ? 'border-l-[12px] border-l-teal-500' : 
                      arrowColor === 'bg-blue-500' ? 'border-l-[12px] border-l-blue-500' : 
                      arrowColor === 'bg-orange-500' ? 'border-l-[12px] border-l-orange-500' : 
                      'border-l-[12px] border-l-gray-400'}`}></div>
                    <div className={`absolute inset-0 ${arrowColor} rounded-full animate-[flow_1.5s_linear_infinite]`} 
                         style={{ background: `linear-gradient(90deg, transparent, ${arrowColor.replace('bg-', '')}, transparent)` }}></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}