import { useState } from "react";
import { mockContests, mockProblems } from "../data/mock";
import { Plus, Edit2, Trash2, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"contests" | "problems">("contests");

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage contests and problem solutions.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          Add {activeTab === "contests" ? "Contest" : "Problem"}
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200 bg-gray-50 px-4 pt-4">
          <button
            onClick={() => setActiveTab("contests")}
            className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-colors relative ${
              activeTab === "contests" ? "bg-white text-blue-600" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
          >
            Contests
            {activeTab === "contests" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
          </button>
          <button
            onClick={() => setActiveTab("problems")}
            className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-colors relative ${
              activeTab === "problems" ? "bg-white text-blue-600" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
          >
            Problems
            {activeTab === "problems" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
          </button>
        </div>

        <div className="p-0">
          {activeTab === "contests" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-4 font-medium">Title</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockContests.map((contest) => (
                    <tr key={contest.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{contest.title}</div>
                        <div className="text-sm text-gray-500">{contest.slug}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {format(new Date(contest.date), "MMM d, yyyy")}
                      </td>
                      <td className="px-6 py-4">
                        {contest.isPublished ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            <CheckCircle className="w-3.5 h-3.5" /> Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                            <XCircle className="w-3.5 h-3.5" /> Draft
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button className="text-gray-400 hover:text-blue-600 transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-4 font-medium">Code</th>
                    <th className="px-6 py-4 font-medium">Title</th>
                    <th className="px-6 py-4 font-medium">Contest</th>
                    <th className="px-6 py-4 font-medium">Difficulty</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockProblems.map((problem) => {
                    const contest = mockContests.find(c => c.id === problem.contestId);
                    return (
                      <tr key={problem.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="text-sm font-mono font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {problem.problemCode}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {problem.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {contest?.title || "Unknown"}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                            problem.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                            problem.difficulty === 'Easy' ? 'bg-blue-100 text-blue-700' :
                            problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {problem.difficulty}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <button className="text-gray-400 hover:text-blue-600 transition-colors">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button className="text-gray-400 hover:text-red-600 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
