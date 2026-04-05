import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getContestBySlug, getProblemsByContest } from "../lib/db";
import { Contest, Problem } from "../data/mock";
import { format } from "date-fns";
import { Calendar, ArrowLeft, ChevronRight } from "lucide-react";

export default function ContestDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [contest, setContest] = useState<Contest | null>(null);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      try {
        const c = await getContestBySlug(slug);
        setContest(c);
        if (c) {
          const p = await getProblemsByContest(c.id);
          setProblems(p);
        }
      } catch (error) {
        console.error("Failed to load contest details", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  if (loading) {
    return <div className="py-20 text-center text-gray-500">Loading...</div>;
  }
  
  if (!contest) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900">Contest not found</h2>
        <Link to="/contests" className="text-blue-600 hover:underline mt-4 inline-block">Back to contests</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link to="/contests" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Contests
      </Link>

      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{contest.title}</h1>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
            <Calendar className="w-4 h-4" />
            {format(new Date(contest.date), "MMMM d, yyyy")}
          </div>
        </div>
        <p className="text-gray-600 text-lg">
          {contest.description}
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Problems ({problems.length})</h2>
        
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="divide-y divide-gray-200">
            {problems.map((problem) => (
              <Link
                key={problem.id}
                to={`/problems/${problem.slug}`}
                className="flex items-center justify-between p-4 sm:p-6 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-start sm:items-center gap-4 flex-col sm:flex-row">
                  <span className="text-sm font-mono font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded w-24 text-center">
                    {problem.problemCode}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {problem.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                        problem.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                        problem.difficulty === 'Easy' ? 'bg-blue-100 text-blue-700' :
                        problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {problem.difficulty}
                      </span>
                      <div className="flex gap-1.5 hidden sm:flex">
                        {problem.tags.map(tag => (
                          <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
