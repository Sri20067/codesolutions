export interface Contest {
  id: string;
  title: string;
  date: string;
  description: string;
  slug: string;
  isPublished: boolean;
}

export interface Problem {
  id: string;
  contestId: string;
  problemCode: string;
  title: string;
  slug: string;
  difficulty: "Beginner" | "Easy" | "Medium" | "Hard";
  tags: string[];
  statement: string;
  approach: string;
  timeComplexity: string;
  spaceComplexity: string;
  solutions: {
    cpp: string;
    java: string;
    python: string;
  };
}

export const mockContests: Contest[] = [
  {
    id: "c1",
    title: "CodeChef Starters 150",
    date: "2026-04-08T18:00:00Z",
    description: "Weekly contest solutions for Starters 150.",
    slug: "codechef-starters-150",
    isPublished: true,
  },
  {
    id: "c2",
    title: "CodeChef Starters 149",
    date: "2026-04-01T18:00:00Z",
    description: "Weekly contest solutions for Starters 149.",
    slug: "codechef-starters-149",
    isPublished: true,
  },
];

export const mockProblems: Problem[] = [
  {
    id: "p1",
    contestId: "c1",
    problemCode: "FLOW001",
    title: "Add Two Numbers",
    slug: "add-two-numbers-flow001",
    difficulty: "Beginner",
    tags: ["math", "implementation", "basic"],
    statement: "Shivam is the youngest programmer in the world, he is just 12 years old. Shivam is learning programming and today he is writing his first program. The task is very simple: given two integers A and B, write a program to add these two numbers and output it.",
    approach: "This is a very basic problem. We just need to read two integers from the standard input and print their sum. \n\n### Steps:\n1. Read the number of test cases `T`.\n2. Loop `T` times.\n3. In each iteration, read two integers `A` and `B`.\n4. Print `A + B`.",
    timeComplexity: "O(1) per test case",
    spaceComplexity: "O(1)",
    solutions: {
      cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int t;\n    cin >> t;\n    while (t--) {\n        int a, b;\n        cin >> a >> b;\n        cout << a + b << "\\n";\n    }\n    return 0;\n}`,
      java: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int t = sc.nextInt();\n        while (t-- > 0) {\n            int a = sc.nextInt();\n            int b = sc.nextInt();\n            System.out.println(a + b);\n        }\n        sc.close();\n    }\n}`,
      python: `t = int(input())\nfor _ in range(t):\n    a, b = map(int, input().split())\n    print(a + b)`
    }
  },
  {
    id: "p2",
    contestId: "c1",
    problemCode: "MAXDIFF",
    title: "Maximum Weight Difference",
    slug: "maximum-weight-difference-maxdiff",
    difficulty: "Easy",
    tags: ["greedy", "sorting"],
    statement: "Chef has gone shopping with his 5-year old son. They have bought `N` items so far. The items are numbered from 1 to `N`, and the item `i` weighs `W_i` grams.\n\nChef's son insists on carrying exactly `K` items. He wants to maximize the absolute difference between the total weight of the items carried by his son and the total weight of the items carried by himself.",
    approach: "To maximize the absolute difference, we should either give the `K` lightest items to the son (and keep the rest) OR give the `K` heaviest items to the son (and keep the rest). \n\n### Steps:\n1. Sort the array of weights.\n2. Calculate the sum of the first `K` elements (lightest).\n3. Calculate the sum of the first `N-K` elements.\n4. The maximum difference will be `max(total_sum - 2 * sum_lightest_K, total_sum - 2 * sum_lightest_N_minus_K)`.",
    timeComplexity: "O(N log N)",
    spaceComplexity: "O(1)",
    solutions: {
      cpp: `#include <iostream>\n#include <vector>\n#include <numeric>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int t;\n    cin >> t;\n    while (t--) {\n        int n, k;\n        cin >> n >> k;\n        vector<int> w(n);\n        long long total_sum = 0;\n        for (int i = 0; i < n; i++) {\n            cin >> w[i];\n            total_sum += w[i];\n        }\n        sort(w.begin(), w.end());\n        \n        k = min(k, n - k);\n        long long son_sum = 0;\n        for (int i = 0; i < k; i++) {\n            son_sum += w[i];\n        }\n        \n        cout << total_sum - 2 * son_sum << "\\n";\n    }\n    return 0;\n}`,
      java: `import java.util.Scanner;\nimport java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int t = sc.nextInt();\n        while (t-- > 0) {\n            int n = sc.nextInt();\n            int k = sc.nextInt();\n            int[] w = new int[n];\n            long totalSum = 0;\n            for (int i = 0; i < n; i++) {\n                w[i] = sc.nextInt();\n                totalSum += w[i];\n            }\n            Arrays.sort(w);\n            k = Math.min(k, n - k);\n            long sonSum = 0;\n            for (int i = 0; i < k; i++) {\n                sonSum += w[i];\n            }\n            System.out.println(totalSum - 2 * sonSum);\n        }\n        sc.close();\n    }\n}`,
      python: `t = int(input())\nfor _ in range(t):\n    n, k = map(int, input().split())\n    w = list(map(int, input().split()))\n    w.sort()\n    k = min(k, n - k)\n    son_sum = sum(w[:k])\n    total_sum = sum(w)\n    print(total_sum - 2 * son_sum)`
    }
  }
];
