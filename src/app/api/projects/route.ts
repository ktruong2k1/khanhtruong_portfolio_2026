import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const projectsFilePath = path.join(process.cwd(), "data", "projects.json");

export async function GET() {
  try {
    const fileContent = fs.readFileSync(projectsFilePath, "utf8");
    return NextResponse.json(JSON.parse(fileContent));
  } catch (error) {
    return NextResponse.json({ error: "Failed to read projects data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, projects } = body;
    
    // Simple password security checking Vercel / local env variables
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    if (password !== adminPassword) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2), "utf8");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to write projects data" }, { status: 500 });
  }
}
