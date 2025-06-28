import SettingsContentCard from "@/components/Elements/SettingsContentCard";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const LanguageSettingsView = () => {
  const languages = [
    { id: "en", label: "English" },
    { id: "id", label: "Indonesian" },
    { id: "zh", label: "Mandarin" },
    { id: "ja", label: "Japanese" },
  ];

  return (
    <SettingsContentCard
      title="Language"
      description="Choose the language for the application."
    >
      <RadioGroup defaultValue="en" className="space-y-1">
        {languages.map((lang) => (
          <Label
            key={lang.id}
            htmlFor={`lang-${lang.id}`}
            className="flex items-center space-x-3 p-3 rounded-md hover:bg-accent cursor-pointer"
          >
            <RadioGroupItem value={lang.id} id={`lang-${lang.id}`} />
            <span className="w-full font-medium">{lang.label}</span>
          </Label>
        ))}
      </RadioGroup>
    </SettingsContentCard>
  );
};

export default LanguageSettingsView;
