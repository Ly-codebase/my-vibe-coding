import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { head, put } from "@vercel/blob";
import type { PortfolioData } from "@/types/portfolio";
import seedData from "../../data/portfolio.json";

const BLOB_PATHNAME = "portfolio/data.json";
const LOCAL_DATA_PATH = path.join(process.cwd(), "data", "portfolio.json");

function withUpdatedTimestamp(data: PortfolioData): PortfolioData {
  return {
    ...data,
    updatedAt: new Date().toISOString(),
  };
}

async function readFromBlob(): Promise<PortfolioData | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;

  try {
    const blobMeta = await head(BLOB_PATHNAME);
    if (!blobMeta) return null;

    const response = await fetch(blobMeta.url, { cache: "no-store" });
    if (!response.ok) return null;

    return (await response.json()) as PortfolioData;
  } catch {
    return null;
  }
}

async function writeToBlob(data: PortfolioData): Promise<void> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  }

  await put(BLOB_PATHNAME, JSON.stringify(data, null, 2), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
  });
}

async function readFromLocalFile(): Promise<PortfolioData> {
  try {
    const raw = await readFile(LOCAL_DATA_PATH, "utf-8");
    return JSON.parse(raw) as PortfolioData;
  } catch {
    return seedData as PortfolioData;
  }
}

async function writeToLocalFile(data: PortfolioData): Promise<void> {
  await mkdir(path.dirname(LOCAL_DATA_PATH), { recursive: true });
  await writeFile(LOCAL_DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const blobData = await readFromBlob();
  if (blobData) return blobData;

  return readFromLocalFile();
}

export async function savePortfolioData(data: PortfolioData): Promise<PortfolioData> {
  const payload = withUpdatedTimestamp(data);

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await writeToBlob(payload);
    return payload;
  }

  await writeToLocalFile(payload);
  return payload;
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return process.env.NODE_ENV === "development" && password === "admin";
  }
  return password === expected;
}
