import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertPortfolioAsset, InsertUser, inquiryRateLimits, portfolioAssets, users } from "../drizzle/schema";
import { ENV } from './_core/env';
import { evaluateInquiryRateLimit } from "./inquiryRateLimit";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createPortfolioAsset(asset: InsertPortfolioAsset): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable while saving asset metadata");

  await db.insert(portfolioAssets).values(asset);
}

export async function listPortfolioAssets(ownerId: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(portfolioAssets)
    .where(eq(portfolioAssets.ownerId, ownerId))
    .orderBy(desc(portfolioAssets.createdAt));
}

export async function consumeInquiryRateLimit(keyHash: string, now = new Date()) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable while protecting the inquiry form");

  const [current] = await db
    .select({ attempts: inquiryRateLimits.attempts, windowStartedAt: inquiryRateLimits.windowStartedAt })
    .from(inquiryRateLimits)
    .where(eq(inquiryRateLimits.keyHash, keyHash))
    .limit(1);
  const decision = evaluateInquiryRateLimit(current, now);

  if (!decision.allowed) return false;

  if (current) {
    await db
      .update(inquiryRateLimits)
      .set({ attempts: decision.attempts, windowStartedAt: decision.windowStartedAt })
      .where(eq(inquiryRateLimits.keyHash, keyHash));
  } else {
    await db.insert(inquiryRateLimits).values({
      keyHash,
      attempts: decision.attempts,
      windowStartedAt: decision.windowStartedAt,
    });
  }

  return true;
}
