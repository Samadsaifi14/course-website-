"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { MockTestQuestion } from "@/lib/types";

interface Props {
  testId: string;
  title: string;
  durationMinutes: number;
  questions: MockTestQuestion[];
  userId: string | null;
}

type Selected = Record<string, string>;

export function TestPlayer({ testId, title, durationMinutes, questions, userId }: Props) {
  const supabase = createClient();
  const router = useRouter();
  const totalSeconds = durationMinutes * 60;

  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<Selected>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    total: number;
    correct: number;
    wrong: number;
    unanswered: number;
    timeTaken: number;
  } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const startedAt = useRef<number>(Date.now());
  const submittedRef = useRef(false);

  const maxMarks = useMemo(
    () => questions.reduce((sum, q) => sum + q.marks, 0),
    [questions]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timer);
          // auto-submit when time runs out
          if (!submittedRef.current) {
            finishTest(selected);
          }
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function finishTest(currentSelected: Selected) {
    if (submittedRef.current) return;
    submittedRef.current = true;

    const timeTaken = Math.max(0, Math.round((Date.now() - startedAt.current) / 1000));
    let score = 0;
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    const answers = questions.map((q) => {
      const sel = currentSelected[q.id];
      if (!sel) {
        unanswered++;
        return { question_id: q.id, selected_option: null, is_correct: false, marks_awarded: 0 };
      }
      const isCorrect = sel === q.correct_option;
      if (isCorrect) {
        score += q.marks;
        correct++;
      } else {
        score -= q.negative_marks;
        wrong++;
      }
      return {
        question_id: q.id,
        selected_option: sel,
        is_correct: isCorrect,
        marks_awarded: isCorrect ? q.marks : q.negative_marks ? -q.negative_marks : 0,
      };
    });

    const res = {
      score: Math.max(0, score),
      total: maxMarks,
      correct,
      wrong,
      unanswered,
      timeTaken,
    };
    setResult(res);
    setSubmitted(true);
    setSecondsLeft(0);

    if (!userId) {
      return; // guest — just show result locally
    }

    try {
      const { data, error } = await supabase
        .from("mock_test_attempts")
        .insert([
          {
            user_id: userId,
            test_id: testId,
            score: res.score,
            total_marks: maxMarks,
            correct_count: correct,
            wrong_count: wrong,
            unanswered_count: unanswered,
            time_taken_seconds: timeTaken,
            answers_json: answers,
            submitted_at: new Date().toISOString(),
          },
        ])
        .select("id")
        .single();

      if (error) throw error;

      // Normalized per-question answers (reporting-friendly, per feedback #5)
      if (data) {
        await supabase.from("mock_test_attempt_answers").insert(
          answers.map((a) => ({ ...a, attempt_id: data.id }))
        );
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Result save karne mein dikkat hui, par aapka score neeche hai.";
      setSubmitError(message);
    }
  }

  function handleSelect(qid: string, option: string) {
    setSelected((prev) => ({ ...prev, [qid]: option }));
  }

  function next() {
    setCurrent((c) => Math.min(questions.length - 1, c + 1));
  }
  function prev() {
    setCurrent((c) => Math.max(0, c - 1));
  }

  // ---- Result view ----
  if (submitted && result) {
    const pct = maxMarks > 0 ? Math.round((result.score / maxMarks) * 100) : 0;
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8">
        <h1 className="text-2xl font-extrabold text-slate-900">{title} — Result</h1>
        {submitError && <p className="mt-3 rounded-lg bg-amber-50 px-4 py-2 text-sm text-amber-700">{submitError}</p>}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-brand-50 p-5 text-center">
            <p className="text-sm text-brand-700">Score</p>
            <p className="mt-1 text-3xl font-extrabold text-brand-700">{result.score} / {result.total}</p>
            <p className="text-sm text-brand-600">{pct}%</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-5 text-center">
            <p className="text-sm text-slate-600">Time Taken</p>
            <p className="mt-1 text-3xl font-extrabold text-slate-900">
              {Math.floor(result.timeTaken / 60)}m {result.timeTaken % 60}s
            </p>
          </div>
          <div className="rounded-xl bg-green-50 p-5 text-center">
            <p className="text-sm text-green-700">Correct / Wrong / Unattempted</p>
            <p className="mt-1 text-3xl font-extrabold text-slate-900">
              {result.correct} / {result.wrong} / {result.unanswered}
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => router.refresh()}
            className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Back to Tests
          </button>
          <button
            onClick={() => {
              setSelected({});
              setSubmitted(false);
              setResult(null);
              setCurrent(0);
              setSecondsLeft(totalSeconds);
              submittedRef.current = false;
              startedAt.current = Date.now();
            }}
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-brand-500"
          >
            Retake Test
          </button>
        </div>
      </div>
    );
  }

  const q = questions[current];

  if (!q) {
    return <p className="text-slate-500">Is test mein abhi koi question nahi hai.</p>;
  }

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">{title}</h1>
          <p className="text-sm text-slate-500">
            Question {current + 1} of {questions.length}
          </p>
        </div>
        <div
          className={`rounded-full px-4 py-2 font-bold tabular-nums ${
            secondsLeft <= 60 ? "bg-red-50 text-red-600" : "bg-brand-50 text-brand-700"
          }`}
        >
          ⏱ {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-lg font-medium text-slate-900">{q.question}</p>
        <p className="mt-1 text-xs text-slate-400">
          {q.marks} mark{q.marks > 1 ? "s" : ""}
          {q.negative_marks > 0 ? ` · -${q.negative_marks} wrong mein` : ""}
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {(["A", "B", "C", "D"] as const).map((opt) => {
          const val = q[`option_${opt.toLowerCase()}` as "option_a" | "option_b" | "option_c" | "option_d"];
          if (!val) return null;
          const isSel = selected[q.id] === opt;
          return (
            <button
              key={opt}
              onClick={() => handleSelect(q.id, opt)}
              className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left text-sm transition ${
                isSel ? "border-brand-600 bg-brand-50" : "border-slate-200 hover:border-brand-300"
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  isSel ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                {opt}
              </span>
              <span className="text-slate-800">{val}</span>
            </button>
          );
        })}
      </div>

      {/* Question navigator */}
      <div className="mt-6 flex flex-wrap gap-2">
        {questions.map((qq, i) => (
          <button
            key={qq.id}
            onClick={() => setCurrent(i)}
            className={`h-9 w-9 rounded-full text-sm font-semibold ${
              i === current
                ? "bg-brand-600 text-white"
                : selected[qq.id]
                ? "bg-brand-100 text-brand-700"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          onClick={prev}
          disabled={current === 0}
          className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 disabled:opacity-40"
        >
          Previous
        </button>
        {current < questions.length - 1 ? (
          <button
            onClick={next}
            className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => finishTest(selected)}
            className="rounded-full bg-green-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
          >
            Submit Test
          </button>
        )}
      </div>
    </div>
  );
}
