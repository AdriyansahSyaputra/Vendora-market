import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const AgreementSection = ({ isLoading, form }) => {
  return (
    <div className="w-full space-y-6">
      <FormField
        control={form.control}
        name="terms"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-start space-x-3 p-4 border rounded-lg bg-background">
                <Checkbox
                  id="terms"
                  checked={field.value ?? false}
                  onCheckedChange={field.onChange}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="terms" className="font-medium">
                    I Agree to the Terms & Conditions
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    I hereby declare that all the data I have provided is true
                    and can be accounted for. I agree to follow all applicable{" "}
                    <a
                      href="/terms"
                      target="_blank"
                      className="text-primary hover:underline"
                    >
                      terms and conditions
                    </a>{" "}
                    as a seller on this platform.
                  </p>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button
        type="submit"
        className="w-full md:w-auto"
        size="lg"
        disabled={!form.watch("terms") || isLoading}
      >
        {isLoading ? "Submitting..." : "Submit Seller Application"}
      </Button>
    </div>
  );
};

export default AgreementSection;
