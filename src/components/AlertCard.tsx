import { AlertTriangle, Info, AlertCircle, LucideIcon } from "lucide-react";

interface AlertCardProps {
  type: "info" | "warning" | "alert";
  title: string;
  message: string;
  icon?: LucideIcon;
}

const alertStyles = {
  info: {
    bg: "bg-women-lavender/10",
    border: "border-women-lavender/30",
    icon: "text-women-lavender",
    title: "text-women-lavender",
    defaultIcon: Info,
  },
  warning: {
    bg: "bg-women-warning/10",
    border: "border-women-warning/30",
    icon: "text-women-warning",
    title: "text-women-warning",
    defaultIcon: AlertTriangle,
  },
  alert: {
    bg: "bg-women-alert/10",
    border: "border-women-alert/30",
    icon: "text-women-alert",
    title: "text-women-alert",
    defaultIcon: AlertCircle,
  },
};

const AlertCard = ({ type, title, message, icon }: AlertCardProps) => {
  const styles = alertStyles[type];
  const IconComponent = icon || styles.defaultIcon;

  return (
    <div className={`${styles.bg} border ${styles.border} rounded-2xl p-6 flex items-start gap-4`}>
      <div className={`w-10 h-10 rounded-full ${styles.bg} flex items-center justify-center flex-shrink-0`}>
        <IconComponent className={`w-5 h-5 ${styles.icon}`} />
      </div>
      <div>
        <h4 className={`font-semibold ${styles.title} mb-1`}>{title}</h4>
        <p className="text-muted-foreground text-sm leading-relaxed">{message}</p>
      </div>
    </div>
  );
};

export default AlertCard;
