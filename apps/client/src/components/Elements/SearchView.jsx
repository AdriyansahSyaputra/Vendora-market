import { ArrowLeft } from "lucide-react";

const SearchView = ({ onBack }) => (
  <div className="pt-20 p-4 animate-fade-in">
    <div className="relative w-full">
      <button
        onClick={onBack}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <input
        type="search"
        placeholder="Search for products..."
        className="w-full h-12 pl-12 pr-4 rounded-lg bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
        autoFocus
      />
    </div>
    <p className="text-center text-muted-foreground mt-8">
      Start typing to see results.
    </p>
  </div>
);

export default SearchView;