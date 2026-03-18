import { Menu } from "lucide-react"; // Import the burger icon
import { Button } from "@/components/ui/button"; // Adjust path to your Button file

export function MobileNavToggle({ onClick }: { onClick?: () => void }) {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="md:hidden" // Only shows on mobile screens
      onClick={onClick}
      aria-label="Toggle Menu"
    >
      <Menu className="size-6" /> 
    </Button>
  );
}