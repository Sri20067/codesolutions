import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { mockProblems, mockContests } from "../data/mock";
import { ArrowLeft, Clock, HardDrive, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../components/CodeBlock";
import { cn } from "../lib/utils";

export default function ProblemDetail() {
  const { slug } = useParams<{ slug: string }>();
  const problem = mockProblems.find(p => p.slug === slug);
  const contest = problem ? mockContests.find(c => c.id === problem.contestId) : null;
  
  const [activeTab, setActiveTab] = useState<"cpp" | "java" | "python">("cpp");

  if (!problem || !contest) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900">Problem not found</h2>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">Back to home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Link to={`/contests/${contest.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to {contest.title}
      </Link>

      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm font-mono font-bold text-gray-600 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded">
                {problem.problemCode}
              </span>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                problem.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                problem.difficulty === 'Easy' ? 'bg-blue-100 text-blue-700' :
                problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {problem.difficulty}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{problem.title}</h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="font-medium">Time:</span> {problem.timeComplexity}
          </div>
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-gray-400" />
            <span className="font-medium">Space:</span> {problem.spaceComplexity}
          </div>
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-gray-400" />
            <div className="flex gap-1.5">
              {problem.tags.map(tag => (
                <span key={tag} className="bg-white border border-gray-200 px-2 py-0.5 rounded text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Statement & Approach */}
        <div className="lg:col-span-1 space-y-8">
          <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Problem Statement</h2>
            <div className="prose prose-sm prose-blue max-w-none text-gray-600">
              <ReactMarkdown>{problem.statement}</ReactMarkdown>
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Approach & Logic</h2>
            <div className="prose prose-sm prose-blue max-w-none text-gray-600">
              <ReactMarkdown>{problem.approach}</ReactMarkdown>
            </div>
          </section>
        </div>

        {/* Right Column: Code Solutions */}
        <div className="lg:col-span-2">
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="flex items-center border-b border-gray-200 bg-gray-50 px-2 pt-2">
              {(["cpp", "java", "python"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveTab(lang)}
                  className={cn(
                    "px-6 py-3 text-sm font-medium rounded-t-lg transition-colors relative",
                    activeTab === lang
                      ? "bg-white text-blue-600"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  )}
                >
                  {lang === "cpp" ? "C++" : lang === "java" ? "Java" : "Python"}
                  {activeTab === lang && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                  )}
                </button>
              ))}
            </div>
            <div className="p-4 sm:p-6 bg-white flex-1">
              <CodeBlock code={problem.solutions[activeTab]} language={activeTab} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
