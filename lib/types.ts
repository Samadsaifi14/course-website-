export interface TutorEnquiry {
  id: string;
  name: string;
  mobile: string;
  class?: string;
  subject?: string;
  location?: string;
  preferred_time?: string;
  status: "new" | "contacted" | "handled" | "closed";
  created_at: string;
}

export interface TutorRegistration {
  id: string;
  name: string;
  mobile: string;
  qualification: string;
  subjects: string[];
  classes: string[];
  experience?: number;
  location?: string;
  id_certificate_url?: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  class?: string;
  subject?: string;
  price: number;
  is_free: boolean;
  thumbnail_url?: string;
  is_published: boolean;
  created_at: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  class?: string;
  subject?: string;
  year?: string;
  is_free: boolean;
  price: number;
  is_published: boolean;
  created_at: string;
}

export interface MockTest {
  id: string;
  title: string;
  class?: string;
  subject?: string;
  duration_minutes: number;
  is_published: boolean;
  created_at: string;
}

export interface MockTestQuestion {
  id: string;
  test_id: string;
  question: string;
  option_a?: string;
  option_b?: string;
  option_c?: string;
  option_d?: string;
  correct_option?: "A" | "B" | "C" | "D";
  marks: number;
  negative_marks: number;
}

export interface Purchase {
  id: string;
  user_id: string;
  item_type: "course" | "material";
  item_id: string;
  amount: number;
  razorpay_payment_id?: string;
  status: "pending" | "paid" | "failed" | "refunded";
  created_at: string;
}
