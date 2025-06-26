const HoverPreviewCard = ({ trigger, title, children }) => {
  return (
    <div className="relative group">
      {trigger}
      <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-50">
        <div className="p-4">
          <h4 className="font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </h4>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoverPreviewCard;
