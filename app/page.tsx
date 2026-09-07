import QuizApp from '@/components/quiz-app';

export const dynamic = 'force-static';
export const revalidate = false;

export default function Page() {
  return <QuizApp />;
}
