// Stand-in course catalog. The real course-discovery page (with a live DB)
// is a later build step — this exists so the hero chat has real data to
// search over and ground its answers in, instead of the model inventing
// course names/hours that don't exist.
export type Course = {
  callNumber: string;
  title: string;
  provider: string;
  category: string;
  hours: number;
  description: string;
};

export const COURSES: Course[] = [
  { callNumber: "005.133", title: "Python for Everybody", provider: "freeCodeCamp", category: "Programming", hours: 18, description: "A full beginner-to-intermediate Python course covering syntax, data structures, and web scraping." },
  { callNumber: "005.13", title: "JavaScript Algorithms and Data Structures", provider: "freeCodeCamp", category: "Programming", hours: 24, description: "Core JavaScript, ES6, algorithm scripting, and data structure fundamentals." },
  { callNumber: "004.6", title: "Computer Networking", provider: "MIT OpenCourseWare", category: "Programming", hours: 30, description: "How the internet actually works — TCP/IP, routing, and network architecture." },
  { callNumber: "006.31", title: "Machine Learning Foundations", provider: "MIT OpenCourseWare", category: "Data Science", hours: 42, description: "Supervised and unsupervised learning, from linear regression to neural networks." },
  { callNumber: "006.3", title: "Data Analysis with Python", provider: "freeCodeCamp", category: "Data Science", hours: 20, description: "Pandas, NumPy, and data visualization for real-world datasets." },
  { callNumber: "519.5", title: "Statistics and Probability", provider: "Khan Academy", category: "Data Science", hours: 15, description: "The statistics foundation every data course assumes you already have." },
  { callNumber: "745.4", title: "Design Systems in Practice", provider: "YouTube (curated)", category: "Design", hours: 6, description: "Building and maintaining a component design system for product teams." },
  { callNumber: "741.6", title: "Typography Fundamentals", provider: "YouTube (curated)", category: "Design", hours: 4, description: "Type anatomy, pairing, and hierarchy for UI and editorial design." },
  { callNumber: "658.4", title: "Product Strategy Basics", provider: "Khan Academy", category: "Business", hours: 9, description: "How companies decide what to build next, and why most roadmaps are wrong." },
  { callNumber: "330.1", title: "Principles of Microeconomics", provider: "MIT OpenCourseWare", category: "Business", hours: 28, description: "Supply, demand, markets, and the incentives behind everyday decisions." },
  { callNumber: "428", title: "English Grammar Deep Dive", provider: "Khan Academy", category: "Language", hours: 10, description: "Grammar rules that actually explain why English works the way it does." },
  { callNumber: "510.1", title: "Linear Algebra, Start to Finish", provider: "MIT OpenCourseWare", category: "Math", hours: 35, description: "Vectors, matrices, eigenvalues — the math underneath most of machine learning." },
  { callNumber: "515", title: "Calculus 1", provider: "Khan Academy", category: "Math", hours: 22, description: "Limits, derivatives, and integrals from the ground up." },
];

// Deliberately simple keyword matching, not embeddings/vector search — this
// is a mock catalog of 13 rows; the honest, right-sized tool for that is
// substring matching, not a search infrastructure investment.
export function searchCourses(query: string, limit = 4): Course[] {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 2);
  if (terms.length === 0) return [];

  return COURSES.map((course) => {
    const haystack = `${course.title} ${course.category} ${course.description}`.toLowerCase();
    const score = terms.reduce((acc, term) => acc + (haystack.includes(term) ? 1 : 0), 0);
    return { course, score };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.course);
}
