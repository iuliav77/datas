"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Droplet, Zap, Sun, Thermometer, SunDim, Wind, RefreshCw, ThermometerSun, ArrowLeft, Box } from "lucide-react";
import Link from "next/link";

export default function SystemLayoutPage() {
  return (
    <div className="h-screen bg-gradient-to-b from-background to-background/80 text-foreground p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary/70 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Configurator</span>
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            System Layout
          </h1>
          <div className="w-8" /> {/* Spacer for alignment */}
        </div>

        {/* System Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Storage Tank */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-xl p-4 border border-green-500/20 hover:border-green-500/30 transition-colors hover:bg-green-500/10 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg border border-green-500/30 shadow-inner">
                <Box className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Storage Tank</h3>
                <p className="text-sm text-green-500/70">500L Capacity</p>
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-500/70">Temperature</span>
                <span className="font-medium">65°C</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-500/70">Pressure</span>
                <span className="font-medium">3 bar</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-500/70">Material</span>
                <span className="font-medium">Stainless Steel</span>
              </div>
            </div>
          </motion.div>

          {/* Consumer Unit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-xl p-4 border border-green-500/20 hover:border-green-500/30 transition-colors hover:bg-green-500/10 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg border border-green-500/30 shadow-inner">
                <Box className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Consumer Unit</h3>
                <p className="text-sm text-green-500/70">3kW Power</p>
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-500/70">Voltage</span>
                <span className="font-medium">230V</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-500/70">Current</span>
                <span className="font-medium">13A</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-500/70">Protection</span>
                <span className="font-medium">IP65</span>
              </div>
            </div>
          </motion.div>

          {/* PV Panels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl p-4 border border-blue-500/20 hover:border-blue-500/30 transition-colors hover:bg-blue-500/10 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30 shadow-inner">
                <Box className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">PV Panels</h3>
                <p className="text-sm text-blue-500/70">6 Panels</p>
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-500/70">Power Output</span>
                <span className="font-medium">1.5kW</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-500/70">Efficiency</span>
                <span className="font-medium">21%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-500/70">Type</span>
                <span className="font-medium">Monocrystalline</span>
              </div>
            </div>
          </motion.div>

          {/* Solar Thermal Collectors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl p-4 border border-blue-500/20 hover:border-blue-500/30 transition-colors hover:bg-blue-500/10"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
                <Thermometer className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Solar Thermal</h3>
                <p className="text-sm text-blue-500/70">4 Units</p>
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-500/70">Heat Output</span>
                <span className="font-medium">2.4kW</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-500/70">Temperature</span>
                <span className="font-medium">80°C</span>
              </div>
            </div>
          </motion.div>

          {/* CSP */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl p-4 border border-blue-500/20 hover:border-blue-500/30 transition-colors hover:bg-blue-500/10"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
                <SunDim className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">CSP</h3>
                <p className="text-sm text-blue-500/70">1 Unit</p>
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-500/70">Power Output</span>
                <span className="font-medium">5kW</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-500/70">Temperature</span>
                <span className="font-medium">400°C</span>
              </div>
            </div>
          </motion.div>

          {/* Solar Air Heaters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl p-4 border border-blue-500/20 hover:border-blue-500/30 transition-colors hover:bg-blue-500/10"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
                <Wind className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Solar Air Heaters</h3>
                <p className="text-sm text-blue-500/70">2 Units</p>
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-500/70">Air Flow</span>
                <span className="font-medium">300 m³/h</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-500/70">Temperature</span>
                <span className="font-medium">45°C</span>
              </div>
            </div>
          </motion.div>

          {/* Inverter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/30 transition-colors hover:bg-purple-500/10"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg border border-purple-500/30">
                <RefreshCw className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Inverter</h3>
                <p className="text-sm text-purple-500/70">5kW</p>
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-purple-500/70">Efficiency</span>
                <span className="font-medium">98%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-purple-500/70">Frequency</span>
                <span className="font-medium">50Hz</span>
              </div>
            </div>
          </motion.div>

          {/* Heat Pump */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/30 transition-colors hover:bg-purple-500/10 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg border border-purple-500/30 shadow-inner">
                <Box className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Heat Pump</h3>
                <p className="text-sm text-purple-500/70">8kW</p>
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-purple-500/70">COP</span>
                <span className="font-medium">4.2</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-purple-500/70">Temperature</span>
                <span className="font-medium">55°C</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-purple-500/70">Type</span>
                <span className="font-medium">Air Source</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 