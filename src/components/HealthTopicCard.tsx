import { LucideIcon } from "lucide-react";

interface HealthTopicCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: "rose" | "lavender" | "peach" | "blush";
  onClick: () => void;
  delay?: number;
}

const colorStyles = {
  rose: {
    bg: "bg-women-rose/10",
    icon: "text-women-rose",
    border: "border-women-rose/20",
    hover: "hover:border-women-rose/40 hover:shadow-women",
  },
  lavender: {
    bg: "bg-women-lavender/10",
    icon: "text-women-lavender",
    border: "border-women-lavender/20",
    hover: "hover:border-women-lavender/40",
  },
  peach: {
    bg: "bg-women-peach/20",
    icon: "text-women-warning",
    border: "border-women-peach/30",
    hover: "hover:border-women-peach/50",
  },
  blush: {
    bg: "bg-women-blush/15",
    icon: "text-women-rose-light",
    border: "border-women-blush/25",
    hover: "hover:border-women-blush/45",
  },
};

const HealthTopicCard = ({ 
  icon: Icon, 
  title, 
  description, 
  color, 
  onClick, 
  delay = 0 
}: HealthTopicCardProps) => {
  const styles = colorStyles[color];

  return (
    <button
      onClick={onClick}
      className={`text-left bg-card p-6 rounded-3xl border ${styles.border} ${styles.hover} shadow-sm transition-all duration-300 animate-slide-up group`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={`w-14 h-14 rounded-2xl ${styles.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <Icon className={`w-7 h-7 ${styles.icon}`} />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </button>
  );
};

export default HealthTopicCard;
