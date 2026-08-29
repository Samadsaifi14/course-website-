import { createClient } from "@/lib/supabase/server";

export async function adminData() {
  const supabase = await createClient();
  const [enquiries, tutors, students, courses, material, tests, payments] =
    await Promise.all([
      supabase.from("tutor_enquiries").select("*").order("created_at", { ascending: false }).limit(100),
      supabase.from("tutor_registrations").select("*").order("created_at", { ascending: false }).limit(100),
      supabase.from("users").select("*").eq("role", "student").order("created_at", { ascending: false }).limit(100),
      supabase.from("courses").select("*").order("created_at", { ascending: false }),
      supabase.from("study_material").select("*").order("created_at", { ascending: false }),
      supabase.from("mock_tests").select("*").order("created_at", { ascending: false }),
      supabase.from("purchases").select("*").order("created_at", { ascending: false }).limit(100),
    ]);

  return {
    enquiries: enquiries.data ?? [],
    tutors: tutors.data ?? [],
    students: students.data ?? [],
    courses: courses.data ?? [],
    material: material.data ?? [],
    tests: tests.data ?? [],
    payments: payments.data ?? [],
  };
}
