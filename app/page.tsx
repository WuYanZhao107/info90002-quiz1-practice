'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { BookOpenCheck, CheckCircle2, CircleAlert, Database, RotateCcw, Save } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress, ProgressLabel, ProgressValue } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { choiceQuestions, coverageAudit, LETTERS, shortQuestions, weekMeta, weeks } from '@/lib/questions';
import { choiceAnalysis, getTopicGuidance, shortAnalysis } from '@/lib/question-guidance';
import { answeredChoice, answeredShort, sameAnswerSet } from '@/lib/quiz-utils';
import type { ChoiceQuestion, ShortQuestion, WeekNumber } from '@/lib/quiz-types';

type AnswerState = Record<string, number[]>;
type ShortAnswerState = Record<string, string>;
type Section = 'choice' | 'short';
type StoredState = { choiceAnswers: AnswerState; shortAnswers: ShortAnswerState; submittedChoiceWeeks: WeekNumber[]; submittedShortWeeks: WeekNumber[]; activeWeek: WeekNumber; activeSection: Section };
const STORAGE_KEY = 'info90002-quiz1-practice-v1';
const TOTAL_QUESTIONS = choiceQuestions.length + shortQuestions.length;
const isWeek = (value: unknown): value is WeekNumber => value === 1 || value === 2 || value === 3 || value === 4;
const getChoiceForWeek = (week: WeekNumber) => choiceQuestions.filter((q) => q.week === week);
const getShortForWeek = (week: WeekNumber) => shortQuestions.filter((q) => q.week === week);

function ChoiceCard({ question, index, total, answer, submitted, onChange }: { question: ChoiceQuestion; index: number; total: number; answer: number[]; submitted: boolean; onChange: (answer: number[]) => void }) {
  const correct = sameAnswerSet(answer, question.correct);
  const unanswered = !answer.length;
  const guidance = getTopicGuidance(question.topic);
  const optionClass = (optionIndex: number) => {
    const selected = answer.includes(optionIndex);
    const isCorrect = question.correct.includes(optionIndex);
    if (submitted && isCorrect) return 'border-emerald-400 bg-emerald-50';
    if (submitted && selected && !isCorrect) return 'border-rose-300 bg-rose-50';
    if (selected) return 'border-sky-500 bg-sky-50/70';
    return 'border-slate-200 hover:border-slate-300 hover:bg-slate-50';
  };
  const options = question.options.map((option, optionIndex) => (
    <label key={option} className={`flex items-start gap-3 rounded-xl border p-4 transition-colors ${submitted ? 'cursor-default' : 'cursor-pointer'} ${optionClass(optionIndex)}`}>
      {question.kind === 'single' ? (
        <RadioGroupItem className="mt-1" value={String(optionIndex)} disabled={submitted} />
      ) : (
        <Checkbox className="mt-1" checked={answer.includes(optionIndex)} disabled={submitted} onCheckedChange={(checked) => {
          const next = checked ? [...new Set([...answer, optionIndex])] : answer.filter((value) => value !== optionIndex);
          onChange(next.sort((a, b) => a - b));
        }} />
      )}
      <span className="grid size-7 shrink-0 place-items-center rounded-md bg-slate-100 text-sm font-semibold text-slate-600">{LETTERS[optionIndex]}</span>
      <span className="pt-0.5 text-base leading-7 text-slate-700">{option}</span>
    </label>
  ));
  return (
    <Card className="border-0 shadow-[0_10px_30px_rgb(15_23_42/0.06)] ring-1 ring-slate-200">
      <CardHeader className="border-b border-slate-100 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2"><Badge variant="secondary" className="bg-sky-50 text-sky-800">{question.kind === 'single' ? 'Single choice' : 'Multiple choice'}</Badge><span className="text-sm text-slate-500">{question.topic}</span></div>
          <span className="text-sm tabular-nums text-slate-400">{index + 1} / {total}</span>
        </div>
        <CardTitle className="mt-3 text-lg leading-8 text-slate-950">{question.stem}</CardTitle>
      </CardHeader>
      <CardContent className="pt-5">
        {question.kind === 'single' ? <RadioGroup value={answer.length ? String(answer[0]) : ''} onValueChange={(value) => onChange([Number(value)])} className="gap-3">{options}</RadioGroup> : <fieldset className="grid gap-3" aria-label={`${question.id} options`}>{options}</fieldset>}
        {submitted && <div className="mt-5 space-y-3">
          <div className={`rounded-xl border px-4 py-3 text-sm leading-6 ${unanswered ? 'border-amber-200 bg-amber-50 text-amber-900' : correct ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-rose-200 bg-rose-50 text-rose-900'}`}>
            <p className="font-semibold">{unanswered ? '未作答' : correct ? '回答正确' : '回答错误'}</p>
            <p>Correct answer: {question.correct.map((value) => `${LETTERS[value]}. ${question.options[value]}`).join(' · ')}</p>
          </div>
          <div className="rounded-xl border border-sky-200 bg-sky-50/70 px-4 py-4 text-sm leading-7 text-slate-700">
            <p className="font-semibold text-sky-950">考察知识点</p>
            <p>{question.topic}：{guidance.knowledge}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-700">
            <p className="font-semibold text-slate-950">解析</p>
            <p>{choiceAnalysis(question)}</p>
          </div>
          <div className="rounded-xl border border-indigo-200 bg-indigo-50/70 px-4 py-4 text-sm leading-7 text-slate-700">
            <p className="font-semibold text-indigo-950">拓展与易错提醒</p>
            <p>{guidance.extension}</p>
          </div>
        </div>}
      </CardContent>
    </Card>
  );
}

function ShortCard({ question, index, total, answer, submitted, onChange }: { question: ShortQuestion; index: number; total: number; answer: string; submitted: boolean; onChange: (answer: string) => void }) {
  const guidance = getTopicGuidance(question.topic);
  return (
    <Card className="border-0 shadow-[0_10px_30px_rgb(15_23_42/0.06)] ring-1 ring-slate-200">
      <CardHeader className="border-b border-slate-100 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2"><Badge variant="secondary" className="bg-indigo-50 text-indigo-800">Short answer</Badge><span className="text-sm text-slate-500">{question.topic}</span></div><span className="text-sm tabular-nums text-slate-400">{index + 1} / {total}</span></div>
        <CardTitle className="mt-3 text-lg leading-8 text-slate-950">{question.prompt}</CardTitle>
      </CardHeader>
      <CardContent className="pt-5">
        <Textarea aria-label={`Answer for ${question.id}`} className="min-h-32 resize-y bg-white text-base leading-7" disabled={submitted} placeholder="Write your answer in English…" value={answer} onChange={(event) => onChange(event.target.value)} />
        {submitted && <div className="mt-5 space-y-3 text-sm leading-7">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-950">
            {!answer.trim() && <p className="mb-1 font-semibold text-amber-800">未作答</p>}<p className="font-semibold">Reference answer</p><p>{question.answer}</p>
          </div>
          <div className="rounded-xl border border-sky-200 bg-sky-50/70 px-4 py-4 text-slate-700"><p className="font-semibold text-sky-950">考察知识点</p><p>{question.topic}：{guidance.knowledge}</p></div>
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-700"><p className="font-semibold text-slate-950">解析与得分点</p><p>{shortAnalysis(question)}</p></div>
          <div className="rounded-xl border border-indigo-200 bg-indigo-50/70 px-4 py-4 text-slate-700"><p className="font-semibold text-indigo-950">拓展与易错提醒</p><p>{guidance.extension}</p></div>
        </div>}
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const [activeWeek, setActiveWeek] = useState<WeekNumber>(1);
  const [activeSection, setActiveSection] = useState<Section>('choice');
  const [choiceAnswers, setChoiceAnswers] = useState<AnswerState>({});
  const [shortAnswers, setShortAnswers] = useState<ShortAnswerState>({});
  const [submittedChoiceWeeks, setSubmittedChoiceWeeks] = useState<WeekNumber[]>([]);
  const [submittedShortWeeks, setSubmittedShortWeeks] = useState<WeekNumber[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const stateRef = useRef({ choiceAnswers, shortAnswers });
  useEffect(() => { stateRef.current = { choiceAnswers, shortAnswers }; }, [choiceAnswers, shortAnswers]);

  useEffect(() => {
    let stored: Partial<StoredState> = {};
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) stored = JSON.parse(raw) as Partial<StoredState>;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    queueMicrotask(() => {
      if (Object.keys(stored).length) {
        if (stored.choiceAnswers && typeof stored.choiceAnswers === 'object') setChoiceAnswers(stored.choiceAnswers);
        if (stored.shortAnswers && typeof stored.shortAnswers === 'object') setShortAnswers(stored.shortAnswers);
        if (Array.isArray(stored.submittedChoiceWeeks)) setSubmittedChoiceWeeks(stored.submittedChoiceWeeks.filter(isWeek));
        if (Array.isArray(stored.submittedShortWeeks)) setSubmittedShortWeeks(stored.submittedShortWeeks.filter(isWeek));
        if (isWeek(stored.activeWeek)) setActiveWeek(stored.activeWeek);
        if (stored.activeSection === 'choice' || stored.activeSection === 'short') setActiveSection(stored.activeSection);
      }
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const state: StoredState = { choiceAnswers, shortAnswers, submittedChoiceWeeks, submittedShortWeeks, activeWeek, activeSection };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [activeSection, activeWeek, choiceAnswers, hydrated, shortAnswers, submittedChoiceWeeks, submittedShortWeeks]);

  useEffect(() => {
    if (!document.modelContext) return;
    const controller = new AbortController();
    document.modelContext.registerTool({
      name: 'save_week_answers', description: 'Save visible quiz answers for one INFO90002 practice week.',
      inputSchema: { type: 'object', properties: { week: { type: 'integer', minimum: 1, maximum: 4 }, choiceAnswers: { type: 'object', additionalProperties: { type: 'array', items: { type: 'integer', minimum: 0, maximum: 3 } } }, shortAnswers: { type: 'object', additionalProperties: { type: 'string' } } }, required: ['week'], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute: (input) => {
        const payload = input as { week?: unknown; choiceAnswers?: unknown; shortAnswers?: unknown };
        if (!isWeek(payload.week)) throw new Error('week must be an integer from 1 to 4');
        const validChoice = new Map(getChoiceForWeek(payload.week).map((q) => [q.id, q]));
        const validShort = new Set(getShortForWeek(payload.week).map((q) => q.id));
        const nextChoice: AnswerState = {}; const nextShort: ShortAnswerState = {};
        if (payload.choiceAnswers !== undefined) {
          if (!payload.choiceAnswers || typeof payload.choiceAnswers !== 'object' || Array.isArray(payload.choiceAnswers)) throw new Error('choiceAnswers must be an object');
          for (const [id, answer] of Object.entries(payload.choiceAnswers)) {
            const question = validChoice.get(id);
            if (!question || !Array.isArray(answer) || !answer.every((value) => Number.isInteger(value) && value >= 0 && value < question.options.length)) throw new Error(`Invalid answer for ${id}`);
            const unique = [...new Set(answer as number[])];
            if (question.kind === 'single' && unique.length > 1) throw new Error(`Invalid selection count for ${id}`);
            nextChoice[id] = unique;
          }
        }
        if (payload.shortAnswers !== undefined) {
          if (!payload.shortAnswers || typeof payload.shortAnswers !== 'object' || Array.isArray(payload.shortAnswers)) throw new Error('shortAnswers must be an object');
          for (const [id, answer] of Object.entries(payload.shortAnswers)) { if (!validShort.has(id) || typeof answer !== 'string') throw new Error(`Invalid short answer for ${id}`); nextShort[id] = answer; }
        }
        setChoiceAnswers((current) => ({ ...current, ...nextChoice })); setShortAnswers((current) => ({ ...current, ...nextShort })); setActiveWeek(payload.week);
        return { saved: true, week: payload.week, choiceCount: Object.keys(nextChoice).length, shortCount: Object.keys(nextShort).length };
      },
    }, { signal: controller.signal });
    document.modelContext.registerTool({
      name: 'submit_week', description: 'Submit one section of an INFO90002 practice week and reveal its answers.',
      inputSchema: { type: 'object', properties: { week: { type: 'integer', minimum: 1, maximum: 4 }, section: { type: 'string', enum: ['choice', 'short'] } }, required: ['week', 'section'], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute: (input) => {
        const payload = input as { week?: unknown; section?: unknown };
        if (!isWeek(payload.week) || (payload.section !== 'choice' && payload.section !== 'short')) throw new Error('Valid week and section are required');
        setActiveWeek(payload.week); setActiveSection(payload.section);
        if (payload.section === 'choice') {
          setSubmittedChoiceWeeks((current) => [...new Set([...current, payload.week as WeekNumber])]);
          const questions = getChoiceForWeek(payload.week); const score = questions.filter((q) => sameAnswerSet(stateRef.current.choiceAnswers[q.id], q.correct)).length;
          return { submitted: true, week: payload.week, section: 'choice', score, total: questions.length };
        }
        setSubmittedShortWeeks((current) => [...new Set([...current, payload.week as WeekNumber])]);
        return { submitted: true, week: payload.week, section: 'short', referenceAnswers: getShortForWeek(payload.week).length };
      },
    }, { signal: controller.signal });
    return () => controller.abort();
  }, []);

  const weekChoice = useMemo(() => getChoiceForWeek(activeWeek), [activeWeek]);
  const weekShort = useMemo(() => getShortForWeek(activeWeek), [activeWeek]);
  const choiceSubmitted = submittedChoiceWeeks.includes(activeWeek); const shortSubmitted = submittedShortWeeks.includes(activeWeek);
  const overallAnswered = choiceQuestions.filter((q) => answeredChoice(choiceAnswers[q.id])).length + shortQuestions.filter((q) => answeredShort(shortAnswers[q.id])).length;
  const overallPercent = Math.round((overallAnswered / TOTAL_QUESTIONS) * 100);
  const weekChoiceAnswered = weekChoice.filter((q) => answeredChoice(choiceAnswers[q.id])).length;
  const weekShortAnswered = weekShort.filter((q) => answeredShort(shortAnswers[q.id])).length;
  const choiceScore = weekChoice.filter((q) => sameAnswerSet(choiceAnswers[q.id], q.correct)).length;
  const weekProgress = (week: WeekNumber) => { const choices = getChoiceForWeek(week); const shorts = getShortForWeek(week); const answered = choices.filter((q) => answeredChoice(choiceAnswers[q.id])).length + shorts.filter((q) => answeredShort(shortAnswers[q.id])).length; return Math.round((answered / (choices.length + shorts.length)) * 100); };
  const resetWeek = () => {
    const choiceIds = new Set(weekChoice.map((q) => q.id)); const shortIds = new Set(weekShort.map((q) => q.id));
    setChoiceAnswers((current) => Object.fromEntries(Object.entries(current).filter(([id]) => !choiceIds.has(id))));
    setShortAnswers((current) => Object.fromEntries(Object.entries(current).filter(([id]) => !shortIds.has(id))));
    setSubmittedChoiceWeeks((current) => current.filter((week) => week !== activeWeek)); setSubmittedShortWeeks((current) => current.filter((week) => week !== activeWeek));
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-white/10 bg-primary text-primary-foreground"><div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-5 sm:px-8"><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-white/10"><Database aria-hidden="true" className="size-6" /></span><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">INFO90002 · Quiz 1</p><h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Week 1–4 交互式模拟题库</h1></div></div><Badge className="hidden border-white/15 bg-white/10 px-3 py-1.5 text-white sm:inline-flex">{choiceQuestions.length} choice · {shortQuestions.length} short</Badge></div></header>
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-7 sm:px-8 lg:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <Card className="border-0 shadow-sm ring-1 ring-slate-200"><CardHeader><CardDescription>总体进度</CardDescription><CardTitle className="text-2xl">{overallAnswered} / {TOTAL_QUESTIONS}</CardTitle></CardHeader><CardContent><Progress value={overallPercent}><ProgressLabel>已作答</ProgressLabel><ProgressValue>{() => `${overallPercent}%`}</ProgressValue></Progress><p className="mt-4 flex items-center gap-2 text-xs leading-5 text-slate-500"><Save aria-hidden="true" className="size-3.5" />进度自动保存在当前设备</p></CardContent></Card>
          <nav aria-label="Week navigation" className="grid grid-cols-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm lg:grid-cols-1">{weeks.map((week) => <button key={week} className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium transition-colors ${week === activeWeek ? 'bg-sky-50 text-sky-950' : 'text-slate-600 hover:bg-slate-50'}`} type="button" aria-current={week === activeWeek ? 'page' : undefined} onClick={() => setActiveWeek(week)}>Week {week}<span className="text-xs tabular-nums text-slate-400">{weekProgress(week)}%</span></button>)}</nav>
          <Card className="hidden border-0 bg-slate-900 text-slate-100 shadow-sm lg:block"><CardContent className="p-4 text-sm leading-6"><p className="font-semibold">Quiz information</p><p className="mt-2 text-slate-300">Week 1–4 · 11 questions · 70 minutes · MCQ + short answer</p><p className="mt-3 border-t border-slate-700 pt-3 text-xs text-slate-400">题库覆盖 {coverageAudit.length} 个课件考点组</p></CardContent></Card>
        </aside>
        <section className="min-w-0">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4"><div><div className="mb-2 flex items-center gap-2 text-sm font-medium text-sky-800"><BookOpenCheck aria-hidden="true" className="size-4" />Week {activeWeek} · {weekMeta[activeWeek].title}</div><h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{weekMeta[activeWeek].topics}</h2><p className="mt-2 max-w-3xl text-base leading-7 text-slate-600">提交后显示正确答案、考察知识点、解析和拓展。Multiple choice 必须选中完整正确集合才得分，不设部分分。</p></div>
            <AlertDialog><AlertDialogTrigger render={<Button variant="outline" />}><RotateCcw aria-hidden="true" />重做本周</AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>清除 Week {activeWeek} 的全部记录？</AlertDialogTitle><AlertDialogDescription>选择题、简答题、得分和交卷状态都会从当前设备清除。</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>取消</AlertDialogCancel><AlertDialogAction variant="destructive" onClick={resetWeek}>确认重做</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
          </div>
          <Tabs value={activeSection} onValueChange={(value) => setActiveSection(value as Section)}>
            <TabsList className="mb-5 h-11 bg-slate-100 p-1"><TabsTrigger className="px-4" value="choice">选择题 <span className="text-xs text-slate-400">{weekChoiceAnswered}/{weekChoice.length}</span></TabsTrigger><TabsTrigger className="px-4" value="short">简答题 <span className="text-xs text-slate-400">{weekShortAnswered}/{weekShort.length}</span></TabsTrigger></TabsList>
            <TabsContent value="choice">
              {choiceSubmitted && <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-950"><div><p className="font-semibold">Week {activeWeek} 选择题已提交</p><p className="text-sm">得分 {choiceScore} / {weekChoice.length}；每题下方已显示答案、知识点、解析与拓展。</p></div><Badge className="bg-emerald-700 text-white">{Math.round((choiceScore / weekChoice.length) * 100)}%</Badge></div>}
              <div className="grid gap-5">{weekChoice.map((question, index) => <ChoiceCard key={question.id} question={question} index={index} total={weekChoice.length} answer={choiceAnswers[question.id] ?? []} submitted={choiceSubmitted} onChange={(answer) => setChoiceAnswers((current) => ({ ...current, [question.id]: answer }))} />)}</div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><p className="flex items-center gap-2 text-sm text-slate-500">{weekChoiceAnswered < weekChoice.length && <CircleAlert aria-hidden="true" className="size-4 text-amber-500" />}已作答 {weekChoiceAnswered} / {weekChoice.length}；未答题也可交卷</p><Button size="lg" disabled={choiceSubmitted} onClick={() => setSubmittedChoiceWeeks((current) => [...new Set([...current, activeWeek])])}><CheckCircle2 aria-hidden="true" />{choiceSubmitted ? '已提交' : `提交 Week ${activeWeek} 选择题`}</Button></div>
            </TabsContent>
            <TabsContent value="short">
              {shortSubmitted && <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-950"><p className="font-semibold">Week {activeWeek} 简答题已提交</p><p>已显示参考答案、得分点、知识解析和拓展；简答题不进行自动评分。</p></div>}
              <div className="grid gap-5">{weekShort.map((question, index) => <ShortCard key={question.id} question={question} index={index} total={weekShort.length} answer={shortAnswers[question.id] ?? ''} submitted={shortSubmitted} onChange={(answer) => setShortAnswers((current) => ({ ...current, [question.id]: answer }))} />)}</div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><p className="flex items-center gap-2 text-sm text-slate-500">{weekShortAnswered < weekShort.length && <CircleAlert aria-hidden="true" className="size-4 text-amber-500" />}已作答 {weekShortAnswered} / {weekShort.length}；提交后显示参考答案</p><Button size="lg" disabled={shortSubmitted} onClick={() => setSubmittedShortWeeks((current) => [...new Set([...current, activeWeek])])}><CheckCircle2 aria-hidden="true" />{shortSubmitted ? '已提交' : `提交 Week ${activeWeek} 简答题`}</Button></div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
      <footer className="mt-4 border-t border-slate-200 bg-white"><div className="mx-auto max-w-7xl px-5 py-6 text-sm leading-6 text-slate-500 sm:px-8">本题库依据 INFO90002 Week 1–4 课件范围，并参考公开 practice-exam 的题型风格原创编写；它不是泄露或预测的正式 Quiz 题目。</div></footer>
    </main>
  );
}
