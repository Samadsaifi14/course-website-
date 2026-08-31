import { createClient } from "@/lib/supabase/server";
import type { Course, MockTest, StudyMaterial } from "@/lib/types";
import { fallbackCourses, fallbackMaterial, fallbackTests } from "@/lib/fallback-data";

export async function getPublishedCourses(): Promise<Course[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(6);
    if (!error && data) return data as Course[];
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
      .limit(50);
    if (!error && data) return data as StudyMaterial[];
    return fallbackMaterial;
  } catch {
    return fallbackMaterial;
  }
}

export async function getMaterialById(id: string): Promise<StudyMaterial | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("study_material")
      .select("*")
      .eq("id", id)
      .eq("is_published", true)
      .maybeSingle();
    if (!error && data) return data as StudyMaterial;
  } catch {
    // Fall through to local fallback data.
  }

  return fallbackMaterial.find((item) => item.id === id) ?? null;
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
    if (!error && data) return data as MockTest[];
    return fallbackTests;
  } catch {
    return fallbackTests;
  }
}
