import React from "react";
import TeamSwitcher from "./components/team-switcher";
import { UserNav } from "./components/user-nav";

const Header: React.FC = () => {
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          {/* <TeamSwitcher /> */}
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
