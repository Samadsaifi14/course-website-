import type { Course, MockTest, StudyMaterial } from "@/lib/types";

// Production-facing pages intentionally show only data that exists in Supabase.
// Empty fallbacks avoid exposing fake courses, tests, prices, or downloadable files.
export const fallbackCourses: Course[] = [];
export const fallbackMaterial: StudyMaterial[] = [];
export const fallbackTests: MockTest[] = [];
