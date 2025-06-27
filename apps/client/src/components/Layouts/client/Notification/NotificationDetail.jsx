const NotificationDetail = ({ notification }) => {
  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
          <notification.icon className="w-6 h-6 text-foreground" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">
            {notification.detailContent.header}
          </h2>
          <p className="text-sm text-muted-foreground">
            {notification.timestamp}
          </p>
        </div>
      </div>

      <p className="text-base leading-relaxed text-foreground/80 mb-8">
        {notification.detailContent.body}
      </p>

      {notification.detailContent.cta && (
        <a
          href={notification.detailContent.cta.link}
          className="w-full text-center bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors block"
        >
          {notification.detailContent.cta.text}
        </a>
      )}
    </div>
  );
};

export default NotificationDetail;
