/**
 * REDE internal scoring engine — SERVER-ONLY. DO NOT EXPOSE.
 *
 * This file holds the deterministic normalizers and benchmark curves that turn a
 * property's raw measured inputs into 0–100 signal scores. These benchmarks ARE
 * the methodology / moat. They must never be imported into a Client Component,
 * rendered as text, or shipped to the browser as data.
 *
 * The UI only ever receives the OUTPUT (value display + score + band + note) —
 * never the curve, the floor/target, or the category scale used to derive it.
 *
 * Contract: every signal score in the product is COMPUTED here from a raw input.
 * No hand-typed scores. If someone asks "where did this number come from?", the
 * answer is: this raw reading, run through a fixed benchmark — same input, same
 * score, every time.
 */

const clamp = (n: number): number => Math.max(0, Math.min(100, Math.round(n)))

/**
 * Higher raw value = better. `floor` maps to 0, `target` maps to 100,
 * linear in between, clamped to 0–100.
 */
export function higherBetter(value: number, floor: number, target: number): number {
  return clamp(((value - floor) / (target - floor)) * 100)
}

/**
 * Lower raw value = better. `best` maps to 100, `worst` maps to 0,
 * linear in between, clamped to 0–100.
 */
export function lowerBetter(value: number, best: number, worst: number): number {
  return clamp(((worst - value) / (worst - best)) * 100)
}

/**
 * Peaked value — best at `ideal`, falling off linearly to 0 at `ideal ± halfSpan`.
 * Used for readings where both too-low and too-high are worse (e.g. median age).
 */
export function peak(value: number, ideal: number, halfSpan: number): number {
  return clamp(100 - (Math.abs(value - ideal) / halfSpan) * 100)
}

/**
 * Ordinal / categorical reading normalized against a fixed internal scale.
 * The raw input is the category label; the scale (hidden here) maps it to a score.
 */
export function rating(level: string, scale: Record<string, number>): number {
  return clamp(scale[level] ?? 0)
}

/** Shared ordinal scales (internal). */
export const SCALE = {
  quality: { 'Very High': 90, High: 82, Premium: 90, Moderate: 62, Low: 45, 'Very Low': 30 },
  exposure: { 'Low exposure': 82, 'Moderate exposure': 58, 'High exposure': 32 },
  maturity: { Mature: 78, Growing: 84, Emerging: 70, Saturated: 55 },
} as const
