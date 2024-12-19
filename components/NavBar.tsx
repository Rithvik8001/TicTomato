import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/app/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export function Navbar() {
  const { user } = useUser();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className={`flex justify-between items-center p-4 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-extrabold">TicTomato</h1>
      </div>
      <div className="flex mr-2">
        {user && (
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={user.imageUrl} />
              <AvatarFallback>
                {user.firstName?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <span>{user.firstName}</span>
          </div>
        )}
        <Button
          onClick={toggleTheme}
          variant="ghost"
          size="icon"
          className={
            theme === "dark"
              ? "text-gray-300 hover:text-white hover:bg-gray-700"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
          }
        >
          {theme === "dark" ? (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>
      </div>
    </nav>
  );
}
