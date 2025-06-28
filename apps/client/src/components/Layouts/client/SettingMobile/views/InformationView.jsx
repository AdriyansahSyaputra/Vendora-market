import { ChevronRight } from "lucide-react";

const InfoItem = ({ label, value }) => (
  <div className="flex justify-between items-center p-4 border-b dark:border-slate-800 last:border-b-0">
    <p className="text-sm font-medium text-muted-foreground">{label}</p>
    <p className="text-sm font-medium">{value}</p>
  </div>
);

const InformationView = () => {
  return (
    <div className="animate-fade-in pt-4">
      <div className="bg-card border-y dark:border-slate-800">
        <InfoItem label="App Version" value="2.5.1 (240628)" />
        <InfoItem
          label="Rate Us"
          value={<ChevronRight className="w-5 h-5 text-muted-foreground" />}
        />
        <InfoItem
          label="Follow Us on Social Media"
          value={<ChevronRight className="w-5 h-5 text-muted-foreground" />}
        />
      </div>
    </div>
  );
};

export default InformationView;
