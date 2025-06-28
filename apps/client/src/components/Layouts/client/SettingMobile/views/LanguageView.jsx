import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const LanguageView = () => {
  const languages = [
    { id: "en", label: "English" },
    { id: "id", label: "Indonesian" },
    { id: "zh", label: "Mandarin" },
    { id: "ja", label: "Japanese" },
  ];

  return (
    <div className="animate-fade-in pt-4">
      <div className="bg-card border-y dark:border-slate-800">
        <RadioGroup defaultValue="en">
          {languages.map((lang, index) => (
            <Label
              key={lang.id}
              htmlFor={`lang-${lang.id}`}
              className={`flex items-center justify-between p-4 cursor-pointer hover:bg-accent dark:hover:bg-slate-800 ${
                index !== languages.length - 1
                  ? "border-b dark:border-slate-800"
                  : ""
              }`}
            >
              <span className="font-medium text-sm">{lang.label}</span>
              <RadioGroupItem value={lang.id} id={`lang-${lang.id}`} />
            </Label>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default LanguageView;
