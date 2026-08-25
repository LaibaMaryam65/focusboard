import { NextResponse } from "next/server";
import { projects } from "@/data/projects";

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(){
      await delay(500);
    return NextResponse.json({
        success: true,
        data: projects,
    });
}