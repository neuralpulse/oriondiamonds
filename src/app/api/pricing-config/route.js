// src/app/api/pricing-config/route.js
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const CONFIG_FILE = path.join(process.cwd(), "pricing-config.json");

// Get admin password with proper fallback
const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || "changeme123").trim();

console.log("🔑 Admin password configured:", ADMIN_PASSWORD); // Debug log on startup

// Health check endpoint
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}

// Default configuration
const DEFAULT_CONFIG = {
  diamondMargins: {
    lessThan1ct: {
      multiplier: 2.2,
      flatAddition: 900,
      description: "For diamonds < 1ct: multiply by 2.2 and add ₹900",
    },
    greaterThan1ct: {
      multiplier: 2.7,
      flatAddition: 0,
      description: "For diamonds ≥ 1ct: multiply by 2.7",
    },
    baseFees: {
      fee1: 150,
      fee2: 700,
      description: "Flat fees added to all diamond prices",
    },
  },
  makingCharges: {
    lessThan2g: {
      ratePerGram: 950,
      description: "For gold weight < 2g",
    },
    greaterThan2g: {
      ratePerGram: 700,
      description: "For gold weight ≥ 2g",
    },
    multiplier: 1.75,
    description: "Final making charge is multiplied by 1.75",
  },
  gstRate: 0.03,
  lastUpdated: new Date().toISOString(),
  updatedBy: "system",
};

// Initialize config file if it doesn't exist
async function initializeConfig() {
  try {
    await fs.access(CONFIG_FILE);
  } catch {
    await fs.writeFile(CONFIG_FILE, JSON.stringify(DEFAULT_CONFIG, null, 2));
    console.log("✅ Initialized pricing config file");
  }
}

// Read config
async function getConfig() {
  try {
    await initializeConfig();
    const data = await fs.readFile(CONFIG_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading config:", error);
    return DEFAULT_CONFIG;
  }
}

// Write config
async function saveConfig(config) {
  await fs.writeFile(CONFIG_FILE, JSON.stringify(config, null, 2));
}

// GET - Fetch current configuration (public)
export async function GET() {
  try {
    const config = await getConfig();
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load configuration" },
      { status: 500 }
    );
  }
}

// POST - Update configuration (protected)
export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { password, config, updatedBy } = body || {};

    // Debug logs
    console.log("=== PRICING-CONFIG POST ===");
    console.log("Request body keys:", Object.keys(body));
    console.log("Password received:", password ? "***" : "EMPTY");
    console.log("Password length:", String(password || "").length);
    console.log("Expected password:", ADMIN_PASSWORD);
    console.log("Match:", String(password || "").trim() === ADMIN_PASSWORD);

    // Verify password exists
    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 401 }
      );
    }

    // Verify admin password
    const receivedPassword = String(password).trim();
    if (receivedPassword !== ADMIN_PASSWORD) {
      console.log("❌ Password mismatch!");
      console.log("Received (trimmed):", receivedPassword);
      console.log("Expected:", ADMIN_PASSWORD);
      return NextResponse.json(
        { error: "Invalid admin password" },
        { status: 401 }
      );
    }

    console.log("✅ Password verified");

    // Validate config structure
    if (!config || !config.diamondMargins || !config.makingCharges) {
      return NextResponse.json(
        { error: "Invalid configuration structure" },
        { status: 400 }
      );
    }

    // Add metadata
    const updatedConfig = {
      ...config,
      lastUpdated: new Date().toISOString(),
      updatedBy: updatedBy || "admin",
    };

    await saveConfig(updatedConfig);
    console.log("✅ Config saved successfully");

    return NextResponse.json({ success: true, config: updatedConfig });
  } catch (error) {
    console.error("Error saving config:", error);
    return NextResponse.json(
      { error: "Failed to save configuration" },
      { status: 500 }
    );
  }
}
