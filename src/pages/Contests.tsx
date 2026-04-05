import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPublishedContests } from "../lib/db";
import { Contest } from "../data/mock";
import { format } from "date-fns";
import { Calendar, ChevronRight } from "lucide-react";

export default function Contests() {
  const [publishedContests, setPublishedContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const contests = await getPublishedContests();
        setPublishedContests(contests);
      } catch (error) {
        console.error("Failed to load contests", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <div className="py-20 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">All Contests</h1>
        <p className="text-gray-600">
          Browse solutions for past CodeChef contests. Solutions are published every Wednesday after the contest concludes.
        </p>
      </div>

      <div className="grid gap-4">
        {publishedContests.map((contest) => (
          <Link
            key={contest.id}
            to={`/contests/${contest.slug}`}
            className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                {contest.title}
              </h2>
              <p className="text-gray-600 text-sm">
                {contest.description}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 whitespace-nowrap bg-gray-50 px-3 py-1.5 rounded-full">
                <Calendar className="w-4 h-4" />
                {format(new Date(contest.date), "MMM d, yyyy")}
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors hidden sm:block" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
