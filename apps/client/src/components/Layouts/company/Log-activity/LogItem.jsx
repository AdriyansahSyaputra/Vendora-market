import ActionIcon from "./ActionIcon";

const LogItem = ({ log, formatRelativeTime }) => {
  const roleColors = {
    Admin: "text-red-500 dark:text-red-400",
    Manager: "text-purple-500 dark:text-purple-400",
    Finance: "text-sky-500 dark:text-sky-400",
    Staff: "text-green-500 dark:text-green-400",
  };
  return (
    <div className="flex items-start space-x-4 p-4 ">
      <ActionIcon action={log.action} />
      <div className="flex-1">
        <p className="text-sm ">
          <span className="font-semibold">{log.user.name}</span>
          <span
            className={`mx-1 font-medium ${roleColors[log.user.role] || ""}`}
          >
            ({log.user.role})
          </span>
          {log.description.toLowerCase()}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          <span>{formatRelativeTime(log.timestamp)}</span> •{" "}
          <span className="font-mono">{log.target}</span>
        </p>
      </div>
      <img
        src={log.user.avatarUrl}
        alt={log.user.name}
        className="w-8 h-8 rounded-full"
      />
    </div>
  );
};

export default LogItem;
