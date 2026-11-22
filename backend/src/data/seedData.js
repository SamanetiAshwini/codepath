/**
 * CodePath Platform Seed Data
 * "CODEPATH – FROM ZERO TO PLACEMENT READY"
 */

export const learningPaths = [
  {
    id: "python-path",
    title: "Python Programming Mastery",
    slug: "python",
    description: "Master Python from absolute basics to OOP and advanced data structures. Ideal for beginners, data science aspirants, and coding interviews.",
    icon: "Code2",
    color: "blue",
    order_index: 1,
    total_topics: 10
  },
  {
    id: "java-path",
    title: "Java for Placements",
    slug: "java",
    description: "Comprehensive Java from fundamental syntax, OOP paradigms, to the Java Collections Framework demanded in corporate campus drives.",
    icon: "Coffee",
    color: "amber",
    order_index: 2,
    total_topics: 8
  },
  {
    id: "cpp-path",
    title: "C++ & STL Masterclass",
    slug: "cpp",
    description: "Fast-track C++ syntax, memory pointers, OOP, and the Standard Template Library (STL) designed for competitive programming and tech interviews.",
    icon: "Cpu",
    color: "emerald",
    order_index: 3,
    total_topics: 8
  },
  {
    id: "dsa-path",
    title: "DSA Placement Roadmap",
    slug: "dsa",
    description: "Structured Data Structures and Algorithms curriculum covering Arrays to Dynamic Programming with company-specific interview patterns.",
    icon: "Layers",
    color: "purple",
    order_index: 4,
    total_topics: 15
  }
];

export const topics = [
  // PYTHON TOPICS
  {
    id: "py-intro",
    path_id: "python-path",
    title: "Introduction to Python",
    slug: "intro-to-python",
    category: "language",
    description: "Understand Python architecture, interpreter workflow, REPL, and your first Hello World script.",
    icon: "FileCode",
    order_index: 1,
    prerequisites: [],
    estimated_hours: 2
  },
  {
    id: "py-vars",
    path_id: "python-path",
    title: "Variables and Data Types",
    slug: "python-variables-data-types",
    category: "language",
    description: "Dynamic typing, integers, floats, booleans, strings, and type conversion in Python.",
    icon: "Binary",
    order_index: 2,
    prerequisites: ["py-intro"],
    estimated_hours: 3
  },
  {
    id: "py-ops",
    path_id: "python-path",
    title: "Operators",
    slug: "python-operators",
    category: "language",
    description: "Arithmetic, comparison, logical, bitwise, assignment, and identity operators.",
    icon: "Divide",
    order_index: 3,
    prerequisites: ["py-vars"],
    estimated_hours: 2
  },
  {
    id: "py-conditionals",
    path_id: "python-path",
    title: "Conditional Statements",
    slug: "python-conditional-statements",
    category: "language",
    description: "if, elif, else branching logic, nested conditions, and ternary expressions.",
    icon: "GitBranch",
    order_index: 4,
    prerequisites: ["py-ops"],
    estimated_hours: 3
  },
  {
    id: "py-loops",
    path_id: "python-path",
    title: "Loops & Iterations",
    slug: "python-loops",
    category: "language",
    description: "for loops, while loops, range(), break, continue, pass, and loop else clauses.",
    icon: "RefreshCw",
    order_index: 5,
    prerequisites: ["py-conditionals"],
    estimated_hours: 4
  },
  {
    id: "py-funcs",
    path_id: "python-path",
    title: "Functions",
    slug: "python-functions",
    category: "language",
    description: "Defining functions, parameters, *args, **kwargs, return values, scope, and lambda functions.",
    icon: "Code",
    order_index: 6,
    prerequisites: ["py-loops"],
    estimated_hours: 4
  },
  {
    id: "py-lists",
    path_id: "python-path",
    title: "Lists and Tuples",
    slug: "python-lists-tuples",
    category: "language",
    description: "Mutable lists, immutable tuples, slicing, list comprehensions, and common methods.",
    icon: "List",
    order_index: 7,
    prerequisites: ["py-funcs"],
    estimated_hours: 4
  },
  {
    id: "py-dicts",
    path_id: "python-path",
    title: "Dictionaries and Sets",
    slug: "python-dictionaries-sets",
    category: "language",
    description: "Hash-based key-value pairs, set operations (union, intersection), and dictionary comprehensions.",
    icon: "Database",
    order_index: 8,
    prerequisites: ["py-lists"],
    estimated_hours: 4
  },
  {
    id: "py-oop",
    path_id: "python-path",
    title: "Object-Oriented Programming (OOP)",
    slug: "python-oop",
    category: "language",
    description: "Classes, instances, __init__, inheritance, encapsulation, polymorphism, and dunder methods.",
    icon: "Boxes",
    order_index: 9,
    prerequisites: ["py-dicts"],
    estimated_hours: 6
  },
  {
    id: "py-exceptions",
    path_id: "python-path",
    title: "Exception Handling",
    slug: "python-exception-handling",
    category: "language",
    description: "try, except, finally, else, raising custom exceptions, and robust error management.",
    icon: "AlertTriangle",
    order_index: 10,
    prerequisites: ["py-oop"],
    estimated_hours: 3
  },

  // JAVA TOPICS
  {
    id: "java-fundamentals",
    path_id: "java-path",
    title: "Java Fundamentals",
    slug: "java-fundamentals",
    category: "language",
    description: "JVM, JRE, JDK architecture, bytecode compilation, and the structure of a Java class.",
    icon: "Terminal",
    order_index: 1,
    prerequisites: [],
    estimated_hours: 3
  },
  {
    id: "java-datatypes",
    path_id: "java-path",
    title: "Data Types & Variables",
    slug: "java-data-types",
    category: "language",
    description: "Primitive types (byte, short, int, long, float, double, char, boolean) vs Reference types.",
    icon: "Binary",
    order_index: 2,
    prerequisites: ["java-fundamentals"],
    estimated_hours: 3
  },
  {
    id: "java-control",
    path_id: "java-path",
    title: "Conditions and Loops",
    slug: "java-conditions-loops",
    category: "language",
    description: "if-else, switch-case, for, while, do-while, and enhanced for-each loops in Java.",
    icon: "GitFork",
    order_index: 3,
    prerequisites: ["java-datatypes"],
    estimated_hours: 4
  },
  {
    id: "java-methods",
    path_id: "java-path",
    title: "Methods & Scope",
    slug: "java-methods",
    category: "language",
    description: "Static vs instance methods, parameters passing by value, method overloading, and recursion.",
    icon: "Box",
    order_index: 4,
    prerequisites: ["java-control"],
    estimated_hours: 4
  },
  {
    id: "java-arrays",
    path_id: "java-path",
    title: "Arrays and Strings",
    slug: "java-arrays-strings",
    category: "language",
    description: "1D/2D arrays, String immutability, String Constant Pool, StringBuilder, and StringBuffer.",
    icon: "FileSpreadsheet",
    order_index: 5,
    prerequisites: ["java-methods"],
    estimated_hours: 5
  },
  {
    id: "java-oop",
    path_id: "java-path",
    title: "Java OOP Deep-Dive",
    slug: "java-oop",
    category: "language",
    description: "Encapsulation, Inheritance (extends, super), Polymorphism, Abstraction (abstract classes & interfaces).",
    icon: "Cpu",
    order_index: 6,
    prerequisites: ["java-arrays"],
    estimated_hours: 6
  },
  {
    id: "java-collections",
    path_id: "java-path",
    title: "Java Collections Framework",
    slug: "java-collections",
    category: "language",
    description: "List (ArrayList, LinkedList), Set (HashSet, TreeSet), Map (HashMap, TreeMap), and Queue.",
    icon: "Layers",
    order_index: 7,
    prerequisites: ["java-oop"],
    estimated_hours: 6
  },
  {
    id: "java-exceptions",
    path_id: "java-path",
    title: "Exception Handling in Java",
    slug: "java-exceptions",
    category: "language",
    description: "Checked vs Unchecked exceptions, try-catch-finally, multi-catch, and try-with-resources.",
    icon: "AlertOctagon",
    order_index: 8,
    prerequisites: ["java-collections"],
    estimated_hours: 3
  },

  // C++ TOPICS
  {
    id: "cpp-fundamentals",
    path_id: "cpp-path",
    title: "C++ Fundamentals",
    slug: "cpp-fundamentals",
    category: "language",
    description: "C++ compilation pipeline, namespaces, iostream, cout/cin, and basic program anatomy.",
    icon: "Terminal",
    order_index: 1,
    prerequisites: [],
    estimated_hours: 3
  },
  {
    id: "cpp-datatypes",
    path_id: "cpp-path",
    title: "Variables and Data Types",
    slug: "cpp-variables-data-types",
    category: "language",
    description: "Integral types, floating points, auto keyword, const qualifiers, and type casting.",
    icon: "Binary",
    order_index: 2,
    prerequisites: ["cpp-fundamentals"],
    estimated_hours: 3
  },
  {
    id: "cpp-control",
    path_id: "cpp-path",
    title: "Conditions and Loops",
    slug: "cpp-conditions-loops",
    category: "language",
    description: "Conditionals, switch statements, for loops, while loops, and range-based loops.",
    icon: "GitBranch",
    order_index: 3,
    prerequisites: ["cpp-datatypes"],
    estimated_hours: 4
  },
  {
    id: "cpp-functions",
    path_id: "cpp-path",
    title: "Functions & Parameters",
    slug: "cpp-functions",
    category: "language",
    description: "Pass by value, pass by reference (&), pass by pointer (*), inline functions, and default arguments.",
    icon: "Code",
    order_index: 4,
    prerequisites: ["cpp-control"],
    estimated_hours: 4
  },
  {
    id: "cpp-arrays",
    path_id: "cpp-path",
    title: "Arrays and Strings",
    slug: "cpp-arrays-strings",
    category: "language",
    description: "C-style arrays, std::array, std::string methods, memory layout, and multi-dimensional arrays.",
    icon: "ListOrdered",
    order_index: 5,
    prerequisites: ["cpp-functions"],
    estimated_hours: 4
  },
  {
    id: "cpp-pointers",
    path_id: "cpp-path",
    title: "Pointers & Memory Management",
    slug: "cpp-pointers",
    category: "language",
    description: "Memory addresses, pointer arithmetic, dynamic memory (new/delete), and smart pointers (unique_ptr, shared_ptr).",
    icon: "Key",
    order_index: 6,
    prerequisites: ["cpp-arrays"],
    estimated_hours: 6
  },
  {
    id: "cpp-oop",
    path_id: "cpp-path",
    title: "OOP in C++",
    slug: "cpp-oop",
    category: "language",
    description: "Classes, constructors, destructors, copy constructors, operator overloading, inheritance, and virtual functions.",
    icon: "Boxes",
    order_index: 7,
    prerequisites: ["cpp-pointers"],
    estimated_hours: 6
  },
  {
    id: "cpp-stl",
    path_id: "cpp-path",
    title: "Standard Template Library (STL)",
    slug: "cpp-stl",
    category: "language",
    description: "Vectors, pairs, iterators, unordered_map, set, priority_queue, algorithms (sort, lower_bound).",
    icon: "Layers",
    order_index: 8,
    prerequisites: ["cpp-oop"],
    estimated_hours: 6
  },

  // 15 DSA TOPICS
  {
    id: "dsa-arrays",
    path_id: "dsa-path",
    title: "Arrays",
    slug: "arrays",
    category: "dsa",
    description: "Contiguous memory allocation, two-pointer techniques, sliding windows, prefix sums, and Kadane's algorithm.",
    icon: "Table",
    order_index: 1,
    prerequisites: [],
    estimated_hours: 8
  },
  {
    id: "dsa-strings",
    path_id: "dsa-path",
    title: "Strings",
    slug: "strings",
    category: "dsa",
    description: "String manipulation, pattern matching, palindrome validation, anagram checks, and character frequency counts.",
    icon: "Type",
    order_index: 2,
    prerequisites: ["dsa-arrays"],
    estimated_hours: 6
  },
  {
    id: "dsa-searching",
    path_id: "dsa-path",
    title: "Searching",
    slug: "searching",
    category: "dsa",
    description: "Linear search, Binary search on sorted arrays, search space reduction, and rotated array searching.",
    icon: "Search",
    order_index: 3,
    prerequisites: ["dsa-arrays"],
    estimated_hours: 6
  },
  {
    id: "dsa-sorting",
    path_id: "dsa-path",
    title: "Sorting",
    slug: "sorting",
    category: "dsa",
    description: "Bubble, Selection, Insertion sort, Merge Sort, Quick Sort, Dutch National Flag, and custom comparator sorting.",
    icon: "ArrowDownUp",
    order_index: 4,
    prerequisites: ["dsa-searching"],
    estimated_hours: 8
  },
  {
    id: "dsa-recursion",
    path_id: "dsa-path",
    title: "Recursion & Backtracking",
    slug: "recursion",
    category: "dsa",
    description: "Base cases, recursive call stacks, subset generation, permutations, combinations, and backtracking pruning.",
    icon: "GitCommit",
    order_index: 5,
    prerequisites: ["dsa-sorting"],
    estimated_hours: 8
  },
  {
    id: "dsa-linked-lists",
    path_id: "dsa-path",
    title: "Linked Lists",
    slug: "linked-lists",
    category: "dsa",
    description: "Singly and Doubly linked lists, reversal, fast & slow pointers (Floyd's cycle detection), and node manipulation.",
    icon: "Link2",
    order_index: 6,
    prerequisites: ["dsa-recursion"],
    estimated_hours: 8
  },
  {
    id: "dsa-stacks",
    path_id: "dsa-path",
    title: "Stacks",
    slug: "stacks",
    category: "dsa",
    description: "LIFO structures, monotonic stacks, balanced parentheses validation, postfix evaluation, and next greater element.",
    icon: "Layers",
    order_index: 7,
    prerequisites: ["dsa-linked-lists"],
    estimated_hours: 6
  },
  {
    id: "dsa-queues",
    path_id: "dsa-path",
    title: "Queues & Deques",
    slug: "queues",
    category: "dsa",
    description: "FIFO structures, circular queues, deques, sliding window maximum, and BFS tree/graph traversals.",
    icon: "AlignHorizontalDistributeCenter",
    order_index: 8,
    prerequisites: ["dsa-stacks"],
    estimated_hours: 6
  },
  {
    id: "dsa-hashing",
    path_id: "dsa-path",
    title: "Hashing & HashMaps",
    slug: "hashing",
    category: "dsa",
    description: "Collision resolution, hash functions, O(1) lookup frequency maps, subarray sum problems, and two-sum patterns.",
    icon: "Hash",
    order_index: 9,
    prerequisites: ["dsa-queues"],
    estimated_hours: 6
  },
  {
    id: "dsa-trees",
    path_id: "dsa-path",
    title: "Trees & Binary Trees",
    slug: "trees",
    category: "dsa",
    description: "Tree anatomy, preorder, inorder, postorder, level-order traversal, height, diameter, and LCA.",
    icon: "GitPullRequest",
    order_index: 10,
    prerequisites: ["dsa-hashing"],
    estimated_hours: 10
  },
  {
    id: "dsa-bst",
    path_id: "dsa-path",
    title: "Binary Search Trees",
    slug: "binary-search-trees",
    category: "dsa",
    description: "BST property, search, insert, delete, BST validation, kth smallest element, and balanced BSTs.",
    icon: "Network",
    order_index: 11,
    prerequisites: ["dsa-trees"],
    estimated_hours: 7
  },
  {
    id: "dsa-heaps",
    path_id: "dsa-path",
    title: "Heaps & Priority Queues",
    slug: "heaps",
    category: "dsa",
    description: "Min-Heap, Max-Heap, heapify, kth largest element, median from data stream, and task scheduling.",
    icon: "TrendingUp",
    order_index: 12,
    prerequisites: ["dsa-bst"],
    estimated_hours: 7
  },
  {
    id: "dsa-graphs",
    path_id: "dsa-path",
    title: "Graphs",
    slug: "graphs",
    category: "dsa",
    description: "Adjacency matrix & list, BFS, DFS, cycle detection, topological sort (Kahn's), and Dijkstra shortest path.",
    icon: "Share2",
    order_index: 13,
    prerequisites: ["dsa-heaps"],
    estimated_hours: 12
  },
  {
    id: "dsa-greedy",
    path_id: "dsa-path",
    title: "Greedy Algorithms",
    slug: "greedy-algorithms",
    category: "dsa",
    description: "Locally optimal choices, interval scheduling, fractional knapsack, activity selection, and jump games.",
    icon: "Zap",
    order_index: 14,
    prerequisites: ["dsa-graphs"],
    estimated_hours: 7
  },
  {
    id: "dsa-dp",
    path_id: "dsa-path",
    title: "Dynamic Programming",
    slug: "dynamic-programming",
    category: "dsa",
    description: "Optimal substructure, overlapping subproblems, memoization (top-down), tabulation (bottom-up), knapsack, and LCS.",
    icon: "Flame",
    order_index: 15,
    prerequisites: ["dsa-greedy"],
    estimated_hours: 14
  }
];

export const lessons = [
  {
    id: "lesson-arrays-core",
    topic_id: "dsa-arrays",
    title: "Array Fundamentals & Two Pointers",
    order_index: 1,
    concept_summary: "Arrays are contiguous blocks of allocated memory offering O(1) random access by index. Master the two-pointer pattern where two pointers traverse the array towards each other or in lockstep.",
    syntax_example: `// Two-Pointer Pattern (C++ / Java / Python concept)
// Left starts at 0, Right starts at n - 1
while (left < right) {
    int sum = arr[left] + arr[right];
    if (sum == target) return {left, right};
    else if (sum < target) left++;
    else right--;
}`,
    detailed_content: `### Why Arrays Matter in Interviews
Arrays are the foundational building block for almost all software engineering interview questions.
Key patterns to recognize:
1. **Two Pointers:** Used when the array is sorted, or when reversing/partitioning elements in-place.
2. **Sliding Window:** Optimal for finding the longest or shortest contiguous subarray satisfying a condition in O(N) instead of O(N^2).
3. **Prefix Sums:** Precomputing running sums allows answering range sum queries in O(1).
4. **Kadane's Algorithm:** Computes the maximum subarray sum in a single pass O(N) by deciding at each index whether to extend the existing contiguous sum or start fresh.`,
    time_complexity: "Access: O(1), Search: O(N), Insert/Delete: O(N)",
    space_complexity: "O(1) auxiliary for in-place algorithms"
  },
  {
    id: "lesson-strings-core",
    topic_id: "dsa-strings",
    title: "String Processing & Frequency Tables",
    order_index: 1,
    concept_summary: "Strings are sequences of characters. In languages like Java and Python, strings are immutable, requiring StringBuilder or list conversions for efficient mutations.",
    syntax_example: `# Frequency map pattern in Python
freq = {}
for ch in s:
    freq[ch] = freq.get(ch, 0) + 1`,
    detailed_content: `### Core String Techniques
In placement rounds, string questions usually test:
- **Character Frequencies:** Use a 26-element array for lowercase ASCII characters instead of a hash table to save overhead.
- **Two Pointers from Ends:** Ideal for palindrome checks and string reversal.
- **Sliding Window with Hash Set:** Finding non-repeating substrings and anagram windows.`,
    time_complexity: "Traversals: O(N), Comparison: O(N)",
    space_complexity: "O(1) for fixed alphabet (26 ASCII characters)"
  },
  {
    id: "lesson-searching-core",
    topic_id: "dsa-searching",
    title: "Binary Search & Search Space Pruning",
    order_index: 1,
    concept_summary: "Binary search repeatedly cuts the search space in half. It applies not just to sorted arrays, but to any monotonic predicate function (e.g., minimum capacity to ship packages).",
    syntax_example: `def binary_search(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = low + (high - low) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
    detailed_content: `### The Golden Formula: low + (high - low) // 2
Always calculate mid using integer overflow prevention. Binary search applies whenever you can discard an entire half of your candidate solutions based on a condition.`,
    time_complexity: "Time: O(log N)",
    space_complexity: "Space: O(1)"
  },
  {
    id: "lesson-sorting-core",
    topic_id: "dsa-sorting",
    title: "Divide & Conquer Sorting (Merge & Quick)",
    order_index: 1,
    concept_summary: "Merge Sort guarantees O(N log N) stable sorting by splitting the array recursively and merging. Quick Sort uses a pivot partition and achieves O(N log N) average time with low memory overhead.",
    syntax_example: `// Merge Sort Divide Step
void mergeSort(vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}`,
    detailed_content: `### Interview Comparison
- **Merge Sort:** Guaranteed O(N log N), stable, requires O(N) extra space. Excellent for linked lists.
- **Quick Sort:** O(N log N) average, O(N^2) worst case if pivot is poorly chosen. In-place O(log N) stack space.
- **Dutch National Flag:** 3-way partition in single pass O(N) time and O(1) space.`,
    time_complexity: "Merge: O(N log N), Quick: O(N log N) avg",
    space_complexity: "Merge: O(N), Quick: O(log N)"
  },
  {
    id: "lesson-dp-core",
    topic_id: "dsa-dp",
    title: "Dynamic Programming: Memoization & Tabulation",
    order_index: 1,
    concept_summary: "Dynamic Programming breaks complex problems down into overlapping subproblems with optimal substructure. Store subproblem answers to avoid exponential recalculation.",
    syntax_example: `// Tabulation for Climbing Stairs / Fibonacci
int climbStairs(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        int cur = prev1 + prev2;
        prev2 = prev1;
        prev1 = cur;
    }
    return prev1;
}`,
    detailed_content: `### The 4-Step DP Framework
1. **Define State:** What does dp[i] or dp[i][j] represent?
2. **Formulate Recurrence Relation:** How does dp[i] depend on smaller subproblems (dp[i-1], dp[i-w])?
3. **Identify Base Cases:** Smallest trivial inputs (e.g., dp[0] = 0 or 1).
4. **Space Optimization:** Can we keep only the last 1 or 2 rows/variables instead of a full 2D array?`,
    time_complexity: "O(States * Transitions)",
    space_complexity: "O(States) reducible to O(1) in many 1D problems"
  }
];

export const problems = [
  // ARRAYS
  {
    id: "prob-two-sum",
    topic_id: "dsa-arrays",
    title: "Target Pair Sum",
    slug: "target-pair-sum",
    difficulty: "Beginner",
    description: `Write an efficient algorithm that receives a sequence of integers \`nums\` and an integer value \`target\`.

Identify two distinct positions in the sequence whose values sum up to \`target\`. Return their indices as a pair \`[i, j]\`.

Each test input guarantees a unique solution, and an index cannot be used twice.`,
    constraints: `2 <= nums.length <= 10^4
-10^9 <= nums[i] <= 10^9
-10^9 <= target <= 10^9
Only one valid answer exists.`,
    starter_code: {
      python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        # Write your solution here
        pass
`,
      java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[]{};
    }
}
`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        return {};
    }
};
`
    },
    solution_explanation: `### Optimal Solution: Hash Map O(N)
Instead of checking all pairs with an O(N^2) brute force nested loop, maintain a hash map of \`{value: index}\`.
For each number \`x\` at index \`i\`:
1. Calculate the complement: \`diff = target - x\`.
2. Check if \`diff\` already exists in your map.
3. If it exists, return \`[map[diff], i]\`.
4. Otherwise, record \`map[x] = i\`.

Time Complexity: O(N) single pass.
Space Complexity: O(N) to store up to N elements in the hash map.`,
    hints: [
      "Can you store numbers you have already visited in a data structure with O(1) lookup?",
      "For each element x, what other number would complete the sum to target?",
      "Use a hash map to map each number to its index."
    ],
    topic_tags: ["Arrays", "Hash Table", "Two Pointers"],
    acceptance_rate: 89.2
  },
  {
    id: "prob-max-subarray",
    topic_id: "dsa-arrays",
    title: "Maximum Subarray Sum",
    slug: "maximum-subarray-sum",
    difficulty: "Easy",
    description: `Given a numeric array \`nums\`, determine the highest possible cumulative sum that can be formed by any non-empty contiguous slice of numbers. Return this maximum summation value.`,
    constraints: `1 <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4`,
    starter_code: {
      python: `class Solution:
    def maxSubArray(self, nums: list[int]) -> int:
        # Kadane's Algorithm
        pass
`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        // Kadane's Algorithm
        return 0;
    }
}
`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        // Kadane's Algorithm
        return 0;
    }
};
`
    },
    solution_explanation: `### Kadane's Algorithm O(N)
Maintain two variables: \`current_sum\` and \`max_sum\`.
Iterate through the array. At each number \`num\`:
\`current_sum = max(num, current_sum + num)\`
\`max_sum = max(max_sum, current_sum)\`

If extending the previous subarray yields a sum less than the current number alone, reset the running subarray at this index.

Time Complexity: O(N)
Space Complexity: O(1)`,
    hints: [
      "If the running sum drops below zero, does it help to continue carrying it forward?",
      "At every step, you choose: add to the running sum, or start a new subarray from the current element.",
      "Initialize max_sum with the first element or negative infinity."
    ],
    topic_tags: ["Arrays", "Divide and Conquer", "Dynamic Programming"],
    acceptance_rate: 78.4
  },
  {
    id: "prob-move-zeroes",
    topic_id: "dsa-arrays",
    title: "Move Zeroes to End",
    slug: "move-zeroes-to-end",
    difficulty: "Beginner",
    description: `Given an integer array \`nums\`, relocate all \`0\` digits to the end of the collection in-place, without altering the relative sequencing of non-zero elements.`,
    constraints: `1 <= nums.length <= 10^4
-2^31 <= nums[i] <= 2^31 - 1`,
    starter_code: {
      python: `class Solution:
    def moveZeroes(self, nums: list[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        pass
`,
      java: `class Solution {
    public void moveZeroes(int[] nums) {
        // Modify nums in-place
    }
}
`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        // Modify nums in-place
    }
};
`
    },
    solution_explanation: `### Two Pointers In-Place O(N)
Use a pointer \`insert_pos = 0\`. Iterate through the array with \`i\`.
Whenever \`nums[i] != 0\`, swap or assign \`nums[insert_pos] = nums[i]\` and increment \`insert_pos\`.
After the loop, fill all remaining indices from \`insert_pos\` to the end with \`0\`.`,
    hints: [
      "Keep track of the position where the next non-zero element should go.",
      "After copying all non-zeros, fill the rest with zeroes."
    ],
    topic_tags: ["Arrays", "Two Pointers"],
    acceptance_rate: 85.1
  },
  {
    id: "prob-rotate-array",
    topic_id: "dsa-arrays",
    title: "Rotate Array by K Positions",
    slug: "rotate-array-by-k",
    difficulty: "Medium",
    description: `Shift all elements in an integer array \`nums\` forward by \`k\` steps in a circular fashion. Perform the element shifts in-place using O(1) auxiliary memory.`,
    constraints: `1 <= nums.length <= 10^5
-2^31 <= nums[i] <= 2^31 - 1
0 <= k <= 10^5`,
    starter_code: {
      python: `class Solution:
    def rotate(self, nums: list[int], k: int) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        pass
`,
      java: `class Solution {
    public void rotate(int[] nums, int k) {
        // Rotate in-place
    }
}
`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        // Rotate in-place
    }
};
`
    },
    solution_explanation: `### 3-Step Reversal Algorithm O(1) Space
1. Normalize \`k = k % n\`.
2. Reverse the entire array \`nums[0 ... n-1]\`.
3. Reverse the first \`k\` elements \`nums[0 ... k-1]\`.
4. Reverse the remaining \`n - k\` elements \`nums[k ... n-1]\`.

Time: O(N)
Space: O(1)`,
    hints: [
      "What happens if k is larger than the array length? (Use modulo).",
      "Think about reversing portions of the array."
    ],
    topic_tags: ["Arrays", "Math", "Two Pointers"],
    acceptance_rate: 62.3
  },
  {
    id: "prob-trapping-rainwater",
    topic_id: "dsa-arrays",
    title: "Trapping Rain Water",
    slug: "trapping-rain-water",
    difficulty: "Hard",
    description: `Given an array of non-negative values representing vertical terrain column elevations with unit width, compute the total cubic units of rainwater that can be trapped between higher boundaries.`,
    constraints: `n == height.length
1 <= n <= 2 * 10^4
0 <= height[i] <= 10^5`,
    starter_code: {
      python: `class Solution:
    def trap(self, height: list[int]) -> int:
        # Two pointer approach
        pass
`,
      java: `class Solution {
    public int trap(int[] height) {
        // Two pointer approach
        return 0;
    }
}
`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int trap(vector<int>& height) {
        // Two pointer approach
        return 0;
    }
};
`
    },
    solution_explanation: `### Two Pointers O(N) Time O(1) Space
Water trapped at any column \`i\` is given by: \`min(max_left, max_right) - height[i]\`.
With two pointers \`left = 0, right = n - 1\`:
If \`left_max < right_max\`, the bottleneck is guaranteed to be on the left side, so add \`left_max - height[left]\` to total water and advance \`left\`.
Otherwise, process from the right side.`,
    hints: [
      "What determines how much water a single pillar can hold?",
      "The trapped water above any bar is min(tallest_left, tallest_right) - height.",
      "Use two pointers from left and right maintaining left_max and right_max."
    ],
    topic_tags: ["Arrays", "Two Pointers", "Dynamic Programming", "Monotonic Stack"],
    acceptance_rate: 54.8
  },

  // STRINGS
  {
    id: "prob-valid-palindrome",
    topic_id: "dsa-strings",
    title: "Valid Palindrome",
    slug: "valid-palindrome",
    difficulty: "Beginner",
    description: `Determine whether a given text string reads identically in forward and reverse directions, considering solely alphanumeric characters and disregarding case differences.`,
    constraints: `1 <= s.length <= 2 * 10^5
s consists only of printable ASCII characters.`,
    starter_code: {
      python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        # Return True if s is a valid palindrome
        pass
`,
      java: `class Solution {
    public boolean isPalindrome(String s) {
        // Return true if s is a valid palindrome
        return false;
    }
}
`,
      cpp: `#include <string>
#include <cctype>
using namespace std;

class Solution {
public:
    bool isPalindrome(string s) {
        // Return true if s is a palindrome
        return false;
    }
};
`
    },
    solution_explanation: `### Two Pointers O(N) Time O(1) Space
Place \`left = 0\` and \`right = len(s) - 1\`.
Skip non-alphanumeric characters from both ends.
Compare lowercase versions: if they differ, return \`false\`.
If pointers cross without mismatch, return \`true\`.`,
    hints: [
      "Skip spaces and punctuation symbols.",
      "Convert characters to lowercase before comparing."
    ],
    topic_tags: ["Strings", "Two Pointers"],
    acceptance_rate: 88.0
  },
  {
    id: "prob-longest-common-prefix",
    topic_id: "dsa-strings",
    title: "Longest Common Prefix",
    slug: "longest-common-prefix",
    difficulty: "Easy",
    description: `Find the longest string of characters that appears as an identical starting prefix across all words within an array of strings. Return an empty string if no shared prefix exists.`,
    constraints: `1 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] consists of only lowercase English letters.`,
    starter_code: {
      python: `class Solution:
    def longestCommonPrefix(self, strs: list[str]) -> str:
        # Find longest common prefix
        pass
`,
      java: `class Solution {
    public String longestCommonPrefix(String[] strs) {
        return "";
    }
}
`,
      cpp: `#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        return "";
    }
};
`
    },
    solution_explanation: `### Vertical Scanning O(S)
Take the first string as the benchmark prefix.
Iterate column by column through each character index \`i\`.
Compare with character at index \`i\` of every other string.
If index exceeds length or character mismatches, return the substring up to \`i\`.`,
    hints: [
      "Compare characters column by column across all words.",
      "The common prefix cannot be longer than the shortest string."
    ],
    topic_tags: ["Strings", "Trie"],
    acceptance_rate: 76.2
  },
  {
    id: "prob-longest-substring-no-repeat",
    topic_id: "dsa-strings",
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating-characters",
    difficulty: "Medium",
    description: `Examine a string \`s\` to locate the length of the longest contiguous segment in which no character appears more than once.`,
    constraints: `0 <= s.length <= 5 * 10^4
s consists of English letters, digits, symbols and spaces.`,
    starter_code: {
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # Sliding window
        pass
`,
      java: `import java.util.*;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        return 0;
    }
}
`,
      cpp: `#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        return 0;
    }
};
`
    },
    solution_explanation: `### Sliding Window with Last-Seen Map O(N)
Maintain \`left\` boundary and a hash map of \`{character: last_seen_index}\`.
Expand \`right\` from 0 to \`len(s) - 1\`.
If \`s[right]\` is seen and inside current window (\`last_seen >= left\`), jump \`left = last_seen + 1\`.
Update max length: \`max_len = max(max_len, right - left + 1)\`.`,
    hints: [
      "Use two pointers to define a sliding window [left, right].",
      "Store the most recent index where each character appeared."
    ],
    topic_tags: ["Strings", "Sliding Window", "Hash Table"],
    acceptance_rate: 64.9
  },

  // SEARCHING
  {
    id: "prob-binary-search",
    topic_id: "dsa-searching",
    title: "Binary Search Classic",
    slug: "binary-search-classic",
    difficulty: "Beginner",
    description: `Given an array \`nums\` sorted in strictly non-decreasing order and a value \`target\`, implement a logarithmic time search to locate \`target\`. Return its zero-based position index, or -1 if absent.`,
    constraints: `1 <= nums.length <= 10^4
-10^4 < nums[i], target < 10^4
All integers in nums are unique.
nums is sorted in ascending order.`,
    starter_code: {
      python: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        pass
`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        return -1;
    }
}
`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        return -1;
    }
};
`
    },
    solution_explanation: `Standard logarithmic search maintaining low and high pointers.
Calculate mid = low + (high - low) / 2 to prevent integer overflow.`,
    hints: [
      "The array is already sorted.",
      "Check the middle element. If it matches, return. If it is smaller, search the right half."
    ],
    topic_tags: ["Binary Search", "Arrays"],
    acceptance_rate: 89.5
  },
  {
    id: "prob-search-rotated",
    topic_id: "dsa-searching",
    title: "Search in Rotated Sorted Array",
    slug: "search-in-rotated-sorted-array",
    difficulty: "Medium",
    description: `An ascending sorted array of unique integers was split at an unknown pivot index and rotated. Given this rotated collection and a lookup key \`target\`, locate the index of \`target\` in O(log N) time or return -1.`,
    constraints: `1 <= nums.length <= 5000
-10^4 <= nums[i] <= 10^4
All values of nums are unique.
nums is an ascending array that is possibly rotated.`,
    starter_code: {
      python: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        pass
`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        return -1;
    }
}
`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        return -1;
    }
};
`
    },
    solution_explanation: `### Modified Binary Search O(log N)
At least one half (\`[low ... mid]\` or \`[mid ... high]\`) is always strictly sorted.
Check which half is sorted:
- If left half is sorted (\`nums[low] <= nums[mid]\`): check if target lies within \`[nums[low], nums[mid]]\`.
- Else right half is sorted: check if target lies within \`[nums[mid], nums[high]]\`.`,
    hints: [
      "Even though rotated, if you divide the array into halves, at least one half is always normally sorted.",
      "Identify the sorted half first, then check if the target falls within its range."
    ],
    topic_tags: ["Binary Search", "Arrays"],
    acceptance_rate: 61.2
  },

  // SORTING
  {
    id: "prob-sort-colors",
    topic_id: "dsa-sorting",
    title: "Sort Colors (Dutch National Flag)",
    slug: "sort-colors-dutch-flag",
    difficulty: "Medium",
    description: `Given a list containing only categories represented by keys 0, 1, and 2, rearrange the elements in-place with a single linear pass so that all 0s appear first, followed by all 1s, and ending with all 2s.`,
    constraints: `n == nums.length
1 <= n <= 300
nums[i] is either 0, 1, or 2.`,
    starter_code: {
      python: `class Solution:
    def sortColors(self, nums: list[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        pass
`,
      java: `class Solution {
    public void sortColors(int[] nums) {
        // In-place 3-way partition
    }
}
`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void sortColors(vector<int>& nums) {
        // In-place 3-way partition
    }
};
`
    },
    solution_explanation: `### Dutch National Flag Algorithm O(N) Time O(1) Space
Maintain three pointers: \`low = 0\`, \`mid = 0\`, \`high = n - 1\`.
- If \`nums[mid] == 0\`: swap(\`nums[low]\`, \`nums[mid]\`), increment \`low++\` and \`mid++\`.
- If \`nums[mid] == 1\`: increment \`mid++\`.
- If \`nums[mid] == 2\`: swap(\`nums[mid]\`, \`nums[high]\`), decrement \`high--\`.`,
    hints: [
      "Use 3 pointers: low for 0s, mid for current element, high for 2s.",
      "When swapping with high, do not advance mid immediately since the newly swapped element needs evaluation."
    ],
    topic_tags: ["Sorting", "Two Pointers", "Arrays"],
    acceptance_rate: 74.5
  },
  {
    id: "prob-merge-intervals",
    topic_id: "dsa-sorting",
    title: "Merge Overlapping Intervals",
    slug: "merge-overlapping-intervals",
    difficulty: "Medium",
    description: `Given an array of numeric intervals where each item specifies start and end coordinates, collapse all overlapping segments into consolidated non-overlapping spans.`,
    constraints: `1 <= intervals.length <= 10^4
intervals[i].length == 2
0 <= starti <= endi <= 10^4`,
    starter_code: {
      python: `class Solution:
    def merge(self, intervals: list[list[int]]) -> list[list[int]]:
        pass
`,
      java: `import java.util.*;

class Solution {
    public int[][] merge(int[][] intervals) {
        return new int[][]{};
    }
}
`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        return {};
    }
};
`
    },
    solution_explanation: `Sort intervals by their start times: O(N log N).
Iterate through the sorted intervals. If current interval's start <= previous merged interval's end, merge them by setting \`prev_end = max(prev_end, cur_end)\`.
Otherwise, push the new non-overlapping interval.`,
    hints: [
      "Sort intervals by start time first.",
      "Compare the current interval's start with the last merged interval's end."
    ],
    topic_tags: ["Sorting", "Arrays"],
    acceptance_rate: 68.2
  },

  // STACKS
  {
    id: "prob-valid-parentheses",
    topic_id: "dsa-stacks",
    title: "Valid Parentheses Matcher",
    slug: "valid-parentheses-matcher",
    difficulty: "Beginner",
    description: `Determine if an input expression string containing bracket characters '()[]{}' has properly balanced pairs. Every opening token must match its partner closing token in strictly valid nested order.`,
    constraints: `1 <= s.length <= 10^4
s consists of parentheses only '()[]{}'.`,
    starter_code: {
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        pass
`,
      java: `import java.util.*;

class Solution {
    public boolean isValid(String s) {
        return false;
    }
}
`,
      cpp: `#include <string>
#include <stack>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        return false;
    }
};
`
    },
    solution_explanation: `Push opening brackets onto a stack. When encountering a closing bracket, check if the stack is non-empty and the top matches the corresponding open bracket.
If so, pop; otherwise return false.
At the end, return true only if the stack is empty.`,
    hints: [
      "Use a Last-In First-Out (LIFO) stack.",
      "Map each closing bracket to its corresponding opening bracket."
    ],
    topic_tags: ["Stack", "Strings"],
    acceptance_rate: 87.1
  },
  {
    id: "prob-min-stack",
    topic_id: "dsa-stacks",
    title: "Design Min Stack O(1)",
    slug: "design-min-stack",
    difficulty: "Medium",
    description: `Construct a custom Stack data structure supporting standard push, pop, and top operations, plus an additional getMin method that returns the minimum item in O(1) constant time.`,
    constraints: `-2^31 <= val <= 2^31 - 1
Methods pop, top and getMin operations will always be called on non-empty stacks.
At most 3 * 10^4 calls will be made to push, pop, top, and getMin.`,
    starter_code: {
      python: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val: int) -> None:
        pass

    def pop(self) -> None:
        pass

    def top(self) -> int:
        pass

    def getMin(self) -> int:
        pass
`,
      java: `import java.util.Stack;

class MinStack {
    private Stack<Integer> stack = new Stack<>();
    private Stack<Integer> minStack = new Stack<>();

    public MinStack() {}
    
    public void push(int val) {}
    public void pop() {}
    public int top() { return 0; }
    public int getMin() { return 0; }
}
`,
      cpp: `#include <stack>
using namespace std;

class MinStack {
    stack<int> s;
    stack<int> min_s;
public:
    MinStack() {}
    void push(int val) {}
    void pop() {}
    int top() { return 0; }
    int getMin() { return 0; }
};
`
    },
    solution_explanation: `Maintain a secondary stack \`min_stack\` that stores the minimum element seen so far at every height.
On push(val): push to main stack, and push \`min(val, current_min)\` to min_stack.
On pop(): pop from both stacks.
getMin(): return top of min_stack in O(1).`,
    hints: [
      "Can you keep a parallel stack tracking the minimum value at each state?",
      "Every push records both the value and the minimum at that point in time."
    ],
    topic_tags: ["Stack", "Design"],
    acceptance_rate: 72.0
  },

  // LINKED LISTS
  {
    id: "prob-reverse-linked-list",
    topic_id: "dsa-linked-lists",
    title: "Reverse a Singly Linked List",
    slug: "reverse-linked-list",
    difficulty: "Easy",
    description: `Given the entry node of a singly-linked chain, reverse the pointer links so the chain terminates at the original head and begins at the original tail.`,
    constraints: `The number of nodes in the list is the range [0, 5000].
-5000 <= Node.val <= 5000`,
    starter_code: {
      python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseList(self, head):
        prev = None
        curr = head
        while curr:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt
        return prev
`,
      java: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}
`,
      cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr != nullptr) {
            ListNode* next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
};
`
    },
    solution_explanation: `### Iterative 3-Pointer O(N) Time O(1) Space
Use three pointers: \`prev\`, \`curr\`, and \`next\`.
At each step, store \`next = curr.next\`, reverse \`curr.next = prev\`, shift \`prev = curr\`, and \`curr = next\`.
When \`curr\` becomes null, \`prev\` is the new head.`,
    hints: [
      "Before reversing the current node's pointer, save its original next node.",
      "Update pointers sequentially in a while loop."
    ],
    topic_tags: ["Linked List", "Recursion"],
    acceptance_rate: 85.0
  },

  // TREES
  {
    id: "prob-max-depth-tree",
    topic_id: "dsa-trees",
    title: "Maximum Depth of Binary Tree",
    slug: "maximum-depth-of-binary-tree",
    difficulty: "Beginner",
    description: `Determine the maximum path length from the root node to the deepest leaf node in a binary tree, returning the total count of nodes along that longest branch.`,
    constraints: `The number of nodes in the tree is in the range [0, 10^4].
-100 <= Node.val <= 100`,
    starter_code: {
      python: `class Solution:
    def maxDepth(self, root) -> int:
        if not root:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))
`,
      java: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}
`,
      cpp: `class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        return 1 + max(maxDepth(root->left), maxDepth(root->right));
    }
};
`
    },
    solution_explanation: `### Recursive DFS Post-Order
If node is null, depth is 0.
Otherwise, recursively calculate maximum depth of left and right subtrees:
\`depth = 1 + max(depth(left), depth(right))\`.
Time: O(N) visiting every node.
Space: O(H) call stack height.`,
    hints: [
      "What is the depth of an empty tree (null)?",
      "How does the depth of the parent node relate to the depth of its left and right children?"
    ],
    topic_tags: ["Binary Tree", "DFS", "BFS"],
    acceptance_rate: 89.9
  },

  // DYNAMIC PROGRAMMING
  {
    id: "prob-climbing-stairs",
    topic_id: "dsa-dp",
    title: "Climbing Stairs Ways",
    slug: "climbing-stairs-ways",
    difficulty: "Beginner",
    description: `You need to scale a flight of \`n\` stairs. At each movement, you can choose to step up by 1 stair or by 2 stairs. Calculate how many unique sequences of steps can reach the exact top.`,
    constraints: `1 <= n <= 45`,
    starter_code: {
      python: `class Solution:
    def climbStairs(self, n: int) -> int:
        pass
`,
      java: `class Solution {
    public int climbStairs(int n) {
        return 0;
    }
}
`,
      cpp: `class Solution {
public:
    int climbStairs(int n) {
        return 0;
    }
};
`
    },
    solution_explanation: `To reach step n, you must arrive from step n-1 (1 step) or step n-2 (2 steps).
Therefore: \`ways(n) = ways(n-1) + ways(n-2)\`.
This is exactly the Fibonacci sequence. Can be computed in O(N) time and O(1) space.`,
    hints: [
      "How many ways to reach step 1? How many for step 2?",
      "To reach step 3, you either take 1 step from step 2, or 2 steps from step 1."
    ],
    topic_tags: ["Dynamic Programming", "Math", "Memoization"],
    acceptance_rate: 86.4
  },
  {
    id: "prob-coin-change",
    topic_id: "dsa-dp",
    title: "Coin Change Minimum Coins",
    slug: "coin-change-minimum-coins",
    difficulty: "Medium",
    description: `Given a selection of coin denominations and a desired total amount, compute the smallest number of coins required to form that exact amount. If the total cannot be formed, return -1.`,
    constraints: `1 <= coins.length <= 12
1 <= coins[i] <= 2^31 - 1
0 <= amount <= 10^4`,
    starter_code: {
      python: `class Solution:
    def coinChange(self, coins: list[int], amount: int) -> int:
        pass
`,
      java: `import java.util.Arrays;

class Solution {
    public int coinChange(int[] coins, int amount) {
        return -1;
    }
}
`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        return -1;
    }
};
`
    },
    solution_explanation: `### Bottom-Up DP O(Amount * Coins)
Create \`dp\` array of size \`amount + 1\` initialized to infinity, with \`dp[0] = 0\`.
For \`i\` from 1 to \`amount\`:
  For each \`coin\` in coins:
    If \`i - coin >= 0\`:
      \`dp[i] = min(dp[i], 1 + dp[i - coin])\`
Return \`dp[amount]\` if not infinity, else \`-1\`.`,
    hints: [
      "Define dp[i] as the minimum coins needed to make amount i.",
      "Base case: dp[0] = 0.",
      "For each coin, dp[i] = min(dp[i], 1 + dp[i - coin])."
    ],
    topic_tags: ["Dynamic Programming", "BFS"],
    acceptance_rate: 59.8
  },

  // GRAPHS
  {
    id: "prob-number-of-islands",
    topic_id: "dsa-graphs",
    title: "Number of Connected Islands",
    slug: "number-of-connected-islands",
    difficulty: "Medium",
    description: `Given a 2D matrix where '1' designates land and '0' designates water, count the number of disjoint islands formed by connecting adjacent land cells horizontally or vertically.`,
    constraints: `m == grid.length
n == grid[i].length
1 <= m, n <= 300
grid[i][j] is '0' or '1'.`,
    starter_code: {
      python: `class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        pass
`,
      java: `class Solution {
    public int numIslands(char[][] grid) {
        return 0;
    }
}
`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        return 0;
    }
};
`
    },
    solution_explanation: `### Flood Fill DFS / BFS O(M * N)
Traverse the grid. Whenever encountering a \`'1'\`:
1. Increment island count.
2. Trigger DFS to sink all connected land cells by marking them \`'0'\` (or visited).
Visit all 4 neighbors recursively.`,
    hints: [
      "When you encounter a '1', that's a new island.",
      "Use DFS or BFS to visit and mark all connected land cells so you don't count them again."
    ],
    topic_tags: ["Graph", "BFS", "DFS", "Matrix"],
    acceptance_rate: 67.3
  }
];

export const testCases = [
  // Two Sum
  {
    id: "tc-two-sum-1",
    problem_id: "prob-two-sum",
    input: "nums = [2,7,11,15], target = 9",
    expected_output: "[0,1]",
    is_sample: true,
    explanation: "nums[0] + nums[1] == 9, so we return [0, 1]."
  },
  {
    id: "tc-two-sum-2",
    problem_id: "prob-two-sum",
    input: "nums = [3,2,4], target = 6",
    expected_output: "[1,2]",
    is_sample: true,
    explanation: "nums[1] + nums[2] == 6, so we return [1, 2]."
  },
  {
    id: "tc-two-sum-3",
    problem_id: "prob-two-sum",
    input: "nums = [3,3], target = 6",
    expected_output: "[0,1]",
    is_sample: false,
    explanation: "nums[0] + nums[1] == 6, so we return [0, 1]."
  },

  // Max Subarray
  {
    id: "tc-max-sub-1",
    problem_id: "prob-max-subarray",
    input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
    expected_output: "6",
    is_sample: true,
    explanation: "The subarray [4,-1,2,1] has the largest sum 6."
  },
  {
    id: "tc-max-sub-2",
    problem_id: "prob-max-subarray",
    input: "nums = [1]",
    expected_output: "1",
    is_sample: true,
    explanation: "Single element has sum 1."
  },
  {
    id: "tc-max-sub-3",
    problem_id: "prob-max-subarray",
    input: "nums = [5,4,-1,7,8]",
    expected_output: "23",
    is_sample: false,
    explanation: "The entire array has the maximum sum 23."
  },

  // Move Zeroes
  {
    id: "tc-move-zeroes-1",
    problem_id: "prob-move-zeroes",
    input: "nums = [0,1,0,3,12]",
    expected_output: "[1,3,12,0,0]",
    is_sample: true,
    explanation: "Zeroes moved to end while maintaining relative order of non-zero elements."
  },

  // Valid Palindrome
  {
    id: "tc-valid-pal-1",
    problem_id: "prob-valid-palindrome",
    input: 's = "A man, a plan, a canal: Panama"',
    expected_output: "true",
    is_sample: true,
    explanation: '"amanaplanacanalpanama" is a palindrome.'
  },
  {
    id: "tc-valid-pal-2",
    problem_id: "prob-valid-palindrome",
    input: 's = "race a car"',
    expected_output: "false",
    is_sample: true,
    explanation: '"raceacar" is not a palindrome.'
  },

  // Binary Search
  {
    id: "tc-bin-search-1",
    problem_id: "prob-binary-search",
    input: "nums = [-1,0,3,5,9,12], target = 9",
    expected_output: "4",
    is_sample: true,
    explanation: "9 exists in nums and its index is 4."
  },
  {
    id: "tc-bin-search-2",
    problem_id: "prob-binary-search",
    input: "nums = [-1,0,3,5,9,12], target = 2",
    expected_output: "-1",
    is_sample: true,
    explanation: "2 does not exist in nums so return -1."
  },

  // Valid Parentheses
  {
    id: "tc-valid-paren-1",
    problem_id: "prob-valid-parentheses",
    input: 's = "()"',
    expected_output: "true",
    is_sample: true,
    explanation: "Parentheses match properly."
  },
  {
    id: "tc-valid-paren-2",
    problem_id: "prob-valid-parentheses",
    input: 's = "()[]{}"',
    expected_output: "true",
    is_sample: true,
    explanation: "All brackets open and close in matching pairs."
  },
  {
    id: "tc-valid-paren-3",
    problem_id: "prob-valid-parentheses",
    input: 's = "(]"',
    expected_output: "false",
    is_sample: true,
    explanation: "Mismatched bracket types."
  },

  // Climbing Stairs
  {
    id: "tc-climb-1",
    problem_id: "prob-climbing-stairs",
    input: "n = 2",
    expected_output: "2",
    is_sample: true,
    explanation: "1 step + 1 step, or 2 steps."
  },
  {
    id: "tc-climb-2",
    problem_id: "prob-climbing-stairs",
    input: "n = 3",
    expected_output: "3",
    is_sample: true,
    explanation: "1+1+1, 1+2, or 2+1."
  },

  // Coin Change
  {
    id: "tc-coin-1",
    problem_id: "prob-coin-change",
    input: "coins = [1,2,5], amount = 11",
    expected_output: "3",
    is_sample: true,
    explanation: "11 = 5 + 5 + 1 (3 coins)."
  },
  {
    id: "tc-coin-2",
    problem_id: "prob-coin-change",
    input: "coins = [2], amount = 3",
    expected_output: "-1",
    is_sample: true,
    explanation: "Cannot make amount 3 with coin denomination 2."
  }
];

export const mockUsers = [
  {
    id: "user-admin-1",
    email: "admin@codepath.edu",
    username: "codepath_admin",
    password_hash: "$2a$10$w8kZvZ1tJ2HjT7F2uOQfveB1z5YQ1R2L3Q4W5E6R7T8Y9U0I1O2P3", // hashed 'admin123'
    full_name: "CodePath Lead Instructor",
    role: "admin",
    college: "Top Tech Institute",
    grad_year: 2023,
    streak: 42
  },
  {
    id: "user-student-1",
    email: "student@codepath.edu",
    username: "placement_aspirant",
    password_hash: "$2a$10$w8kZvZ1tJ2HjT7F2uOQfveB1z5YQ1R2L3Q4W5E6R7T8Y9U0I1O2P3", // hashed 'student123'
    full_name: "Alex Rivera",
    role: "student",
    college: "National Engineering College",
    grad_year: 2026,
    streak: 14
  }
];
