import { Link } from "react-router-dom";
import { mockContests, mockProblems } from "../data/mock";
import { format } from "date-fns";
import { Calendar, ChevronRight, Trophy, Code } from "lucide-react";

export default function Home() {
  const latestContests = mockContests.filter(c => c.isPublished).slice(0, 3);
  const featuredProblems = mockProblems.slice(0, 4);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 px-4 rounded-3xl bg-gradient-to-b from-blue-50 to-white border border-blue-100">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Master <span className="text-blue-600">CodeChef</span> Contests
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Detailed explanations, approaches, and code solutions in C++, Java, and Python for weekly CodeChef contests. Published every Wednesday after the contest ends.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/contests"
            className="px-8 py-3.5 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
          >
            Browse Contests
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Latest Contests */}
        <section className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              Latest Contests
            </h2>
            <Link to="/contests" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid gap-4">
            {latestContests.map((contest) => (
              <Link
                key={contest.id}
                to={`/contests/${contest.slug}`}
                className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                    {contest.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {contest.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 whitespace-nowrap bg-gray-50 px-3 py-1.5 rounded-full">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(contest.date), "MMM d, yyyy")}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Problems */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Code className="w-6 h-6 text-blue-600" />
            Featured Problems
          </h2>
          
          <div className="grid gap-4">
            {featuredProblems.map((problem) => (
              <Link
                key={problem.id}
                to={`/problems/${problem.slug}`}
                className="p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {problem.problemCode}
                  </span>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                    problem.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                    problem.difficulty === 'Easy' ? 'bg-blue-100 text-blue-700' :
                    problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {problem.difficulty}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{problem.title}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {problem.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                  {problem.tags.length > 2 && (
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded">
                      +{problem.tags.length - 2}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
