import Head from "next/head";
import { Card } from "../../components/Card";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Card as seen on Evervault's customer page</title>
      </Head>
      <main className="h-screen bg-black w-full flex items-center justify-center antialiased">
        <div className="border border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative">
          <Icon className="absolute h-6 w-6 -top-3 -left-3 text-white" />
          <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-white" />
          <Icon className="absolute h-6 w-6 -top-3 -right-3 text-white" />
          <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-white" />

          <Card />

          <h2 className="text-white mt-4 text-sm font-light">
            Humaans easily passes vendor audits from larger, more
            security-conscious customers.
          </h2>
          <p className="text-sm border font-light border-white/[0.2] rounded-full mt-4 text-white px-2 py-0.5">
            Credentials encryption
          </p>
        </div>
      </main>
    </div>
  );
}

export const Icon = ({ className, ...rest }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { FiSearch, FiCode, FiBook, FiClock } from "react-icons/fi";
// import "highlight.js/styles/github-dark.css";

// interface Snippet {
//   id: string;
//   title: string;
//   description: string;
//   content: string;
//   tags: string[];
//   lastUpdated: string;
//   language: string;
// }

// export default function Snippets() {
//   const [snippets, setSnippets] = useState<Snippet[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedTag, setSelectedTag] = useState<string | null>(null);

//   // Fetch snippets from GitHub
//   useEffect(() => {
//     const fetchSnippets = async () => {
//       try {
//         // Replace with your GitHub API call
//         // const response = await fetch('YOUR_GITHUB_API_ENDPOINT');
//         // const data = await response.json();

//         // Mock data for demonstration
//         setTimeout(() => {
//           setSnippets([
//             {
//               id: "1",
//               title: "React Hooks Guide",
//               description: "A comprehensive guide to React Hooks",
//               content:
//                 "## React Hooks\n\nHooks are functions that let you use state and other React features...",
//               tags: ["react", "hooks", "frontend"],
//               lastUpdated: "2023-05-20",
//               language: "markdown",
//             },
//             {
//               id: "2",
//               title: "TypeScript Generics",
//               description: "Understanding TypeScript generics with examples",
//               content:
//                 "## TypeScript Generics\n\nGenerics allow creating reusable components...",
//               tags: ["typescript", "generics", "webdev"],
//               lastUpdated: "2023-05-15",
//               language: "typescript",
//             },
//             {
//               id: "3",
//               title: "Next.js API Routes",
//               description: "How to create API routes in Next.js",
//               content:
//                 "## API Routes in Next.js\n\nAPI routes provide a solution to build your API with Next.js...",
//               tags: ["nextjs", "api", "backend"],
//               lastUpdated: "2023-05-10",
//               language: "javascript",
//             },
//           ]);
//           setIsLoading(false);
//         }, 1000);
//       } catch (error) {
//         console.error("Error fetching snippets:", error);
//         setIsLoading(false);
//       }
//     };

//     fetchSnippets();
//   }, []);

//   // Filter snippets based on search query and selected tag
//   const filteredSnippets = snippets.filter((snippet) => {
//     const matchesSearch =
//       snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       snippet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       snippet.content.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesTag = !selectedTag || snippet.tags.includes(selectedTag);

//     return matchesSearch && matchesTag;
//   });

//   // Get all unique tags
//   const allTags = Array.from(
//     new Set(snippets.flatMap((snippet) => snippet.tags))
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         <header className="mb-12 text-center">
//           <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//             Code Snippets
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             A collection of useful code snippets and explanations
//           </p>
//         </header>

//         {/* Search and Filter */}
//         <div className="mb-8">
//           <div className="relative max-w-2xl mx-auto mb-6">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <FiSearch className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search snippets..."
//               className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>

//           <div className="flex flex-wrap justify-center gap-2 mb-6">
//             <button
//               onClick={() => setSelectedTag(null)}
//               className={`px-4 py-2 rounded-full text-sm font-medium ${
//                 !selectedTag
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
//               }`}
//             >
//               All
//             </button>
//             {allTags.map((tag) => (
//               <button
//                 key={tag}
//                 onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium ${
//                   selectedTag === tag
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
//                 }`}
//               >
//                 {tag}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Snippets Grid */}
//         {isLoading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//           </div>
//         ) : filteredSnippets.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredSnippets.map((snippet) => (
//               <Link
//                 href={`/snippets/${snippet.id}`}
//                 key={snippet.id}
//                 className="group"
//               >
//                 <div className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 flex flex-col">
//                   <div className="p-6 flex-1 flex flex-col">
//                     <div className="flex items-center mb-3">
//                       <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-3">
//                         {snippet.language === "typescript" ||
//                         snippet.language === "javascript" ? (
//                           <FiCode className="h-5 w-5 text-blue-600 dark:text-blue-400" />
//                         ) : (
//                           <FiBook className="h-5 w-5 text-blue-600 dark:text-blue-400" />
//                         )}
//                       </div>
//                       <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
//                         {snippet.language}
//                       </span>
//                     </div>

//                     <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
//                       {snippet.title}
//                     </h3>

//                     <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
//                       {snippet.description}
//                     </p>

//                     <div className="mt-auto">
//                       <div className="flex flex-wrap gap-2 mb-4">
//                         {snippet.tags.slice(0, 3).map((tag) => (
//                           <span
//                             key={tag}
//                             className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                         {snippet.tags.length > 3 && (
//                           <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-400">
//                             +{snippet.tags.length - 3}
//                           </span>
//                         )}
//                       </div>

//                       <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
//                         <FiClock className="mr-1" />
//                         <span>Updated {snippet.lastUpdated}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <div className="text-6xl mb-4">📭</div>
//             <h3 className="text-xl font-medium mb-2">No snippets found</h3>
//             <p className="text-gray-500 dark:text-gray-400">
//               {searchQuery || selectedTag
//                 ? "Try adjusting your search or filter"
//                 : "No snippets available yet"}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
