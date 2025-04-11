"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SystemDiagram } from "@/components/system/SystemDiagram";
import Image from "next/image";
import { motion } from "framer-motion";
import { AlertCircle, Lightbulb, TrendingUp, Download, Thermometer, Droplets, Activity, Zap, Clock, Shield, ArrowLeft } from "lucide-react";
import { Line } from 'react-chartjs-2';
import { useCallback, useMemo, useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useRouter } from "next/navigation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

export default function SimulationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const systemType = searchParams.get("type") || "";
  const modularComponent = searchParams.get("modular") || "";
  const optionalComponents = searchParams.get("optional")?.split(",").filter(Boolean) || [];

  // System metrics with live updates
  const [metrics, setMetrics] = useState({
    // Temperature Card
    panelTemp: 45,
    // Efficiency Card
    efficiency: 92,
    // Power Card
    powerOutput: 2.5,
    // System Metrics
    voltage: 230,
    current: 10.87,
    frequency: 50,
    // Performance Stats
    dailyProduction: 18.5,
    peakPower: 3.2,
    uptime: 99.98,
    // PV Panels
    pvPanelTemp: 45,
    pvPanelOutput: 2.5,
    // Inverter
    inverterEfficiency: 96,
    inverterVoltage: 230,
    // Heat Pump
    heatPumpCOP: 3.2,
    heatPumpTemp: 55,
    // Storage
    storageLevel: 85,
    storageTemp: 58,
    // Consumer
    consumerDemand: 1.8,
    consumerFlow: 12
  });

  // Effect to update metrics every 30 seconds
  useEffect(() => {
    const updateMetrics = () => {
      setMetrics(prev => {
        // Helper function to create random fluctuations within a range
        const fluctuate = (value: number, percent: number) => {
          const change = (Math.random() - 0.5) * 2 * (value * percent / 100);
          return parseFloat((value + change).toFixed(1));
        };

        // Create small random variations for all metrics
        return {
          // Temperature Card
          panelTemp: fluctuate(prev.panelTemp, 3),
          // Efficiency Card
          efficiency: Math.min(100, Math.max(85, fluctuate(prev.efficiency, 2))),
          // Power Card
          powerOutput: fluctuate(prev.powerOutput, 4),
          // System Metrics
          voltage: fluctuate(prev.voltage, 1),
          current: fluctuate(prev.current, 2),
          frequency: fluctuate(prev.frequency, 0.5),
          // Performance Stats
          dailyProduction: fluctuate(prev.dailyProduction, 1),
          peakPower: fluctuate(prev.peakPower, 1),
          uptime: Math.min(100, fluctuate(prev.uptime, 0.1)),
          // PV Panels
          pvPanelTemp: fluctuate(prev.pvPanelTemp, 3),
          pvPanelOutput: fluctuate(prev.pvPanelOutput, 4),
          // Inverter
          inverterEfficiency: Math.min(100, Math.max(90, fluctuate(prev.inverterEfficiency, 1))),
          inverterVoltage: fluctuate(prev.inverterVoltage, 1),
          // Heat Pump
          heatPumpCOP: fluctuate(prev.heatPumpCOP, 2),
          heatPumpTemp: fluctuate(prev.heatPumpTemp, 2),
          // Storage
          storageLevel: Math.min(100, Math.max(70, fluctuate(prev.storageLevel, 1))),
          storageTemp: fluctuate(prev.storageTemp, 2),
          // Consumer
          consumerDemand: fluctuate(prev.consumerDemand, 5),
          consumerFlow: fluctuate(prev.consumerFlow, 3)
        };
      });
    };

    // Update immediately once
    updateMetrics();
    
    // Set interval for updates every 30 seconds
    const intervalId = setInterval(updateMetrics, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Simulated values
  const simulatedValues = {
    temp: 65.5,
    flow: 18.2,
    cop: 2.8
  };

  // Generate dynamic insights
  const [insights, setInsights] = useState({
    efficiency: {
      title: "Efficiency Optimization",
      tip: "Optimize flow rate between 15-20 L/min for maximum efficiency",
      impact: "Potential improvement: 12%",
      status: "warning"
    },
    risk: {
      title: "Risk Assessment",
      warning: "Heat pump temperature approaching upper limit",
      action: "Consider reducing load or increasing cooling",
      status: "critical"
    },
    performance: {
      title: "Performance Trend",
      trend: "up",
      value: "+8.5%",
      period: "Last 24 hours"
    }
  });

  // Effect to periodically update insights with random values
  useEffect(() => {
    const updateInterval = setInterval(() => {
      // Generate random efficiency insights
      const efficiencyTips = [
        "Optimize flow rate between 15-20 L/min for maximum efficiency",
        "Adjust panel orientation by 5° east for morning optimization",
        "Consider cleaning solar panels to improve efficiency by 8%",
        "Reduce standby power consumption in inverter settings"
      ];
      
      const efficiencyImpacts = [
        "Potential improvement: 12%",
        "Potential improvement: 8%",
        "Potential improvement: 15%",
        "Potential savings: 5.2 kWh/day"
      ];
      
      // Generate random risk insights
      const riskWarnings = [
        "Heat pump temperature approaching upper limit",
        "Inverter efficiency dropping below optimal range",
        "Storage tank pressure fluctuations detected",
        "Uneven load distribution in consumer unit"
      ];
      
      const riskActions = [
        "Consider reducing load or increasing cooling",
        "Check inverter settings and connections",
        "Monitor pressure valves and flow regulators",
        "Balance loads across consumer circuits"
      ];
      
      // Generate random performance values
      const performanceValues = ["+8.5%", "+4.2%", "+12.1%", "-2.3%"];
      const performancePeriods = ["Last 24 hours", "Current week", "Month to date", "Since last maintenance"];
      const performanceTrends = ["up", "up", "up", "down"];
      
      // Randomly select indices
      const effIndex = Math.floor(Math.random() * efficiencyTips.length);
      const riskIndex = Math.floor(Math.random() * riskWarnings.length);
      const perfIndex = Math.floor(Math.random() * performanceValues.length);
      
      // Update insights state
      setInsights({
        efficiency: {
          title: "Efficiency Optimization",
          tip: efficiencyTips[effIndex],
          impact: efficiencyImpacts[effIndex],
          status: "warning"
        },
        risk: {
          title: "Risk Assessment",
          warning: riskWarnings[riskIndex],
          action: riskActions[riskIndex],
          status: riskIndex === 0 ? "critical" : "warning"
        },
        performance: {
          title: "Performance Trend",
          trend: performanceTrends[perfIndex],
          value: performanceValues[perfIndex],
          period: performancePeriods[perfIndex]
        }
      });
    }, 10000); // Update every 10 seconds
    
    return () => clearInterval(updateInterval);
  }, []);

  // Determine system category based on components
  const getSystemCategory = () => {
    if (systemType === "solar") return "Solar";
    if (systemType === "aerothermal") return "Aerothermal";
    if (systemType === "hydro") return "Hydro";
    return "Hybrid";
  };

  // Get all selected components
  const getAllComponents = () => {
    const coreComponents = SYSTEM_OPTIONS[systemType as keyof typeof SYSTEM_OPTIONS]?.core || [];
    return [...coreComponents, modularComponent, ...optionalComponents].filter(Boolean);
  };

  // Generate random data for the chart - only generate once on component mount
  const chartData = useMemo(() => {
    const labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    const producedData = Array.from({ length: 24 }, () => Math.random() * 10 + 5);
    const demandedData = Array.from({ length: 24 }, () => Math.random() * 8 + 3);

    return {
      labels,
      datasets: [
        {
          label: 'Produced kW',
          data: producedData,
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.5)',
          tension: 0.4,
        },
        {
          label: 'Demanded kW',
          data: demandedData,
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.5)',
          tension: 0.4,
        },
      ],
    };
  }, []); // Empty dependency array ensures this runs only once

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          boxWidth: 10,
          padding: 10,
          font: {
            size: 10
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          font: {
            size: 10
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 10
          }
        }
      }
    }
  };

  // Generate and download report as PDF
  const handleExportReport = useCallback(() => {
    try {
      // Create new PDF document
      const doc = new jsPDF();
      
      // Set font size and add title
      doc.setFontSize(20);
      doc.setTextColor(0, 102, 204);
      doc.text("Neural Heat Technologies", 15, 20);
      doc.text("System Report", 15, 30);
      
      // Add date
      doc.setFontSize(12);
      doc.setTextColor(90, 90, 90);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 15, 40);
      
      // Add horizontal line
      doc.setDrawColor(220, 220, 220);
      doc.line(15, 45, 195, 45);
      
      // System information
      doc.setFontSize(16);
      doc.setTextColor(60, 60, 60);
      doc.text("System Information", 15, 55);
      
      // System details
      doc.setFontSize(12);
      doc.setTextColor(90, 90, 90);
      doc.text(`System Type: ${getSystemCategory()}`, 20, 65);
      doc.text(`Components: ${getAllComponents().join(", ")}`, 20, 75);
      
      // Performance data
      doc.setFontSize(16);
      doc.setTextColor(60, 60, 60);
      doc.text("Performance Data", 15, 95);
      
      // Performance details
      doc.setFontSize(12);
      doc.setTextColor(90, 90, 90);
      doc.text(`Power Output: 2.5kW`, 20, 105);
      doc.text(`Daily Production: 18.5kWh`, 20, 115);
      doc.text(`Peak Power: 3.2kW`, 20, 125);
      doc.text(`Uptime: 99.98%`, 20, 135);
      doc.text(`Efficiency: 92%`, 20, 145);
      
      // AI Insights
      doc.setFontSize(16);
      doc.setTextColor(60, 60, 60);
      doc.text("AI Insights", 15, 165);
      
      // AI details
      doc.setFontSize(12);
      doc.setTextColor(90, 90, 90);
      doc.text(`Efficiency: ${insights.efficiency.tip}`, 20, 175);
      doc.text(`Risk Assessment: ${insights.risk.warning}`, 20, 185);
      doc.text(`Recommended Action: ${insights.risk.action}`, 20, 195);
      doc.text(`Performance Trend: ${insights.performance.value} (${insights.performance.period})`, 20, 205);
      
      // Add footer
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text("© 2023 Neural Heat Technologies - Confidential", 15, 280);
      
      // Save PDF
      doc.save(`thermal-system-report-${Date.now()}.pdf`);
      
      // Show success message
      alert("PDF Report downloaded successfully");
    } catch (error) {
      // Show error alert
      alert("Error generating PDF report. Please try again.");
      console.error(error);
    }
  }, [getAllComponents, getSystemCategory, insights]);

  return (
    <main className="h-screen pt-2 px-4 bg-background text-foreground overflow-hidden">
      <div className="h-full max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-1">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1 text-primary hover:text-primary/80"
                onClick={() => router.push("/")}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Button>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              System Simulation Dashboard
            </h1>
            <div className="h-0.5 w-20 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
            <p className="text-xs text-muted-foreground">Real-time monitoring and analysis</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 bg-green-50 dark:bg-green-950/20 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-green-600 dark:text-green-400">System Active</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 dark:bg-blue-950/20 rounded-full">
              <Clock className="w-3 h-3 text-blue-500" />
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Last Update: 2m ago</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-3 h-[calc(100%-3rem)]">
          {/* LEFT: System Layout (70%) */}
          <Card className="border-none shadow-lg h-full">
            <CardContent className="space-y-3 p-3 h-full">
              {/* System Category */}
              <div className="flex items-center">
                <div className="flex items-center gap-3">
                  <Image
                    src={`/${getSystemCategory().toLowerCase()}.png`}
                    alt={`${getSystemCategory()} System`}
                    width={48}
                    height={48}
                    className="rounded-lg shadow-md"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{getSystemCategory()} System</h2>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Active and monitoring
                    </p>
                  </div>
                </div>
              </div>

              {/* Simulated Values */}
              <div className="grid grid-cols-3 gap-3">
                {/* Temperature Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="border rounded-xl p-2 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1">
                      <Thermometer className="w-3 h-3 text-red-500" />
                      <p className="text-xs font-medium">Temperature</p>
                    </div>
                    <div className="text-xs px-1.5 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full">
                      Optimal
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xl font-bold text-red-600 dark:text-red-400">{metrics.panelTemp}°C</p>
                    <p className="text-xs text-muted-foreground">Solar Panel</p>
                  </div>
                </motion.div>

                {/* Efficiency Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="border rounded-xl p-2 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1">
                      <Activity className="w-3 h-3 text-blue-500" />
                      <p className="text-xs font-medium">Efficiency</p>
                    </div>
                    <div className="text-xs px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                      High
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{metrics.efficiency}%</p>
                    <p className="text-xs text-muted-foreground">Current Performance</p>
                  </div>
                </motion.div>

                {/* Power Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="border rounded-xl p-2 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-green-500" />
                      <p className="text-xs font-medium">Power Output</p>
                    </div>
                    <div className="text-xs px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
                      Active
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">{metrics.powerOutput}kW</p>
                    <p className="text-xs text-muted-foreground">Current Generation</p>
                  </div>
                </motion.div>
              </div>

              {/* Technical Details */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="border rounded-xl p-2 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950/20 dark:to-gray-900/20 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-gray-500" />
                      <p className="text-xs font-medium">System Metrics</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Voltage</span>
                      <span className="text-xs font-medium">{metrics.voltage}V AC</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Current</span>
                      <span className="text-xs font-medium">{metrics.current}A</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Frequency</span>
                      <span className="text-xs font-medium">{metrics.frequency}Hz</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="border rounded-xl p-2 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950/20 dark:to-gray-900/20 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                      <p className="text-xs font-medium">Performance Stats</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Daily Production</span>
                      <span className="text-xs font-medium">{metrics.dailyProduction} kWh</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Peak Power</span>
                      <span className="text-xs font-medium">{metrics.peakPower} kW</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Uptime</span>
                      <span className="text-xs font-medium">{metrics.uptime}%</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* System Layout Section */}
              <div className="space-y-1">
                <h2 className="text-sm font-semibold">System Layout</h2>
                <div className="flex items-center justify-center">
                  <SystemDiagram 
                    systemType={systemType}
                    components={getAllComponents()}
                    metrics={metrics}
                  />
                </div>
                <p className="text-xs text-muted-foreground">Auto-generated via React Flow</p>
              </div>

              {/* System Summary */}
              <div className="grid grid-cols-2 gap-3 mt-1">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="border rounded-lg p-2 bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-1 mb-1">
                    <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <Activity className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-xs font-medium">System Status</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-medium">Operating Normally</p>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    </div>
                    <p className="text-xs text-muted-foreground">All components functioning within optimal parameters</p>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="border rounded-lg p-2 bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-1 mb-1">
                    <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-xs font-medium">Next Maintenance</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-medium">14 days remaining</p>
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    </div>
                    <p className="text-xs text-muted-foreground">Scheduled for routine inspection</p>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>

          {/* RIGHT: AI Insights (30%) */}
          <Card className="border-none shadow-lg h-full">
            <CardHeader className="flex flex-row items-center gap-2 p-3">
              <Image
                src="/logo.png"
                alt="Logo"
                width={64}
                height={64}
                className="rounded-lg shadow-md"
              />
              <div>
                <CardTitle className="text-xl">AI Insights</CardTitle>
                <p className="text-xs text-muted-foreground">Neural Heat Technologies</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 p-3">
              {/* Efficiency Tip */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-1"
              >
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-yellow-500" />
                  <p className="text-sm font-medium">{insights.efficiency.title}</p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-xl shadow-sm">
                  <p className="text-xs text-muted-foreground">{insights.efficiency.tip}</p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1 flex items-center gap-2">
                    <Zap className="w-3 h-3" />
                    {insights.efficiency.impact}
                  </p>
                </div>
              </motion.div>

              {/* Risk Prediction */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <p className="text-sm font-medium">{insights.risk.title}</p>
                </div>
                <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-xl shadow-sm">
                  <p className="text-xs text-muted-foreground">{insights.risk.warning}</p>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1 flex items-center gap-2">
                    <Shield className="w-3 h-3" />
                    {insights.risk.action}
                  </p>
                </div>
              </motion.div>

              {/* Performance Trend */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <p className="text-sm font-medium">{insights.performance.title}</p>
                </div>
                <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-xl shadow-sm">
                  <div className="flex items-baseline gap-2">
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">
                      {insights.performance.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {insights.performance.period}
                    </p>
                  </div>
                  <div className="h-32 mt-2 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm p-2">
                    <Line data={chartData} options={chartOptions} />
                  </div>
                </div>
              </motion.div>

              {/* Export Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-2"
              >
                <Button 
                  className="w-full h-8 text-xs bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-md hover:shadow-lg transition-all duration-200"
                  onClick={handleExportReport}
                >
                  <Download className="w-3 h-3 mr-1.5" />
                  Export PDF Report
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
