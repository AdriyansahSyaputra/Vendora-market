import SettingsContentCard from "@/components/Elements/SettingsContentCard";

const PoliciesView = () => {
  return (
    <SettingsContentCard
      title="Vendora Policies"
      description="Read our terms, privacy, and other policies."
    >
      <div className="prose dark:prose-invert max-w-none">
        <h2>Terms of Service</h2>
        <p>
          Welcome to Vendora! These terms and conditions outline the rules and
          regulations for the use of Vendora's Website...
        </p>

        <h3>1. General Terms</h3>
        <p>
          By accessing this website we assume you accept these terms and
          conditions. Do not continue to use Vendora if you do not agree to take
          all of the terms and conditions stated on this page.
        </p>

        <h2>Privacy Policy</h2>
        <p>
          Your privacy is important to us. It is Vendora's policy to respect
          your privacy regarding any information we may collect from you across
          our website...
        </p>
        <h2>Return Policy</h2>
        <p>
          Items can be returned within 7 days of receipt. The item must be in
          its original condition, with all tags and packaging intact. Please
          contact customer service to initiate a return.
        </p>
      </div>
    </SettingsContentCard>
  );
};

export default PoliciesView;
