import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { get, put } from "@vercel/blob";
import type { PortfolioData } from "@/types/portfolio";
import seedData from "../../data/portfolio.json";

const BLOB_PATHNAME = "portfolio/data.json";
const BLOB_ACCESS = "private" as const;
const LOCAL_DATA_PATH = path.join(process.cwd(), "data", "portfolio.json");

function withUpdatedTimestamp(data: PortfolioData): PortfolioData {
  return {
    ...data,
    updatedAt: new Date().toISOString(),
  };
}

/** Vercel Blob: OIDC (BLOB_STORE_ID) or legacy token (BLOB_READ_WRITE_TOKEN) */
function hasBlobStorage(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

async function readFromBlob(): Promise<PortfolioData | null> {
  if (!hasBlobStorage()) return null;

  try {
    const result = await get(BLOB_PATHNAME, { access: BLOB_ACCESS });
    if (!result || result.statusCode !== 200 || !result.stream) return null;

    const text = await new Response(result.stream).text();
    return JSON.parse(text) as PortfolioData;
  } catch {
    return null;
  }
}

async function writeToBlob(data: PortfolioData): Promise<void> {
  if (!hasBlobStorage()) {
    throw new Error("BLOB_NOT_CONFIGURED: 请在 Vercel 项目中连接 Blob Store 并重新部署");
  }

  await put(BLOB_PATHNAME, JSON.stringify(data, null, 2), {
    access: BLOB_ACCESS,
    addRandomSuffix: false,
    allowOverwrite: true,
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
  const isVercel = Boolean(process.env.VERCEL);

  if (hasBlobStorage()) {
    await writeToBlob(payload);
    return payload;
  }

  if (isVercel) {
    throw new Error(
      "BLOB_NOT_CONFIGURED: 请在 Vercel 项目中连接 Blob Store 并重新部署"
    );
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
