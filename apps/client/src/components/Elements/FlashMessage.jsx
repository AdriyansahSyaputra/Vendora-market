import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleCheck, TriangleAlert } from "lucide-react";

const FlashMessage = ({
  variant,
  title,
  description,
  onDismiss,
  duration = 1000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, [onDismiss, duration]);

  const isSuccess = variant === "success";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="w-full max-w-sm animate-in slide-in-from-top">
        <Alert variant={isSuccess ? "default" : "destructive"}>
          {isSuccess ? (
            <CircleCheck className="h-4 w-4" />
          ) : (
            <TriangleAlert className="h-4 w-4" />
          )}
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default FlashMessage;
