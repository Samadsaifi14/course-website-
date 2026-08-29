import { createClient } from "@/lib/supabase/server";
import type { Course, MockTest, StudyMaterial } from "@/lib/types";
import { fallbackCourses, fallbackMaterial, fallbackTests } from "@/lib/fallback-data";

// These queries return sample data (from lib/fallback-data.ts) whenever the
// Supabase project cannot be reached (e.g. localhost before the DB subdomain
// resolves, or a paused project). This keeps the public pages full and
// demo-able. Once the database connects, real rows replace the samples.

export async function getPublishedCourses(): Promise<Course[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(6);
    if (!error && data && data.length > 0) return data as Course[];
    return fallbackCourses;
  } catch {
    return fallbackCourses;
  }
}

export async function getPublishedMaterial(): Promise<StudyMaterial[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("study_material")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(6);
    if (!error && data && data.length > 0) return data as StudyMaterial[];
    return fallbackMaterial;
  } catch {
    return fallbackMaterial;
  }
}

export async function getPublishedTests(): Promise<MockTest[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("mock_tests")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(6);
    if (!error && data && data.length > 0) return data as MockTest[];
    return fallbackTests;
  } catch {
    return fallbackTests;
  }
}
