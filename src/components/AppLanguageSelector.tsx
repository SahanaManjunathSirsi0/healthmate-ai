import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'kn', label: 'KN', name: 'ಕನ್ನಡ' },
  { code: 'hi', label: 'HI', name: 'हिंदी' },
];

interface AppLanguageSelectorProps {
  variant?: 'default' | 'women';
}

const AppLanguageSelector = ({ variant = 'default' }: AppLanguageSelectorProps) => {
  const { i18n } = useTranslation();

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
    localStorage.setItem('app-language', value);
  };

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  const triggerClasses = variant === 'women' 
    ? "w-[80px] border-women-rose-light/30 bg-white/50 hover:bg-women-rose/10 focus:ring-women-rose/30"
    : "w-[80px] border-border/50 bg-card/50 hover:bg-muted focus:ring-primary/30";

  const contentClasses = variant === 'women'
    ? "bg-white border-women-rose-light/30"
    : "bg-card border-border";

  return (
    <Select value={i18n.language} onValueChange={handleChange}>
      <SelectTrigger className={`${triggerClasses} gap-1`}>
        <Globe className="w-3.5 h-3.5 opacity-70" />
        <SelectValue>{currentLang.label}</SelectValue>
      </SelectTrigger>
      <SelectContent className={`${contentClasses} z-50`}>
        {languages.map((lang) => (
          <SelectItem 
            key={lang.code} 
            value={lang.code}
            className="cursor-pointer"
          >
            <span className="font-medium">{lang.label}</span>
            <span className="text-muted-foreground ml-2 text-xs">{lang.name}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AppLanguageSelector;
