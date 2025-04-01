import { useState, useEffect } from "react";
import { Tooltip, UnstyledButton, Stack, ScrollArea } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  IconHome2,
  IconCode,
  IconFilePlus,
  IconUser,
  IconSettings,
  IconBook,
  IconClipboardCheck,
  IconLogout,
  IconLogin,
} from "@tabler/icons-react";
import classes from "../Style/NavbarMinimal.module.css";

function NavbarLink({
  icon: Icon,
  label,
  active,
  onClick,
  color,
  glowColor,
  linkClicked,
}) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <Link to={linkClicked} className={classes.linkWrapper}>
        <UnstyledButton
          onClick={onClick}
          className={classes.link}
          data-active={active || undefined}
        >
          <Icon
            style={{
              width: "20px",
              height: "20px",
              color: color,
              filter: `drop-shadow(0 0 6px ${glowColor})`,
            }}
            stroke={1.5}
          />
        </UnstyledButton>
      </Link>
    </Tooltip>
  );
}

const mockdata = [
  {
    icon: IconHome2,
    label: "Home",
    color: "rgb(56 189 248)", // Light Blue
    glowColor: "#00ffff", // Cyan Glow
    linkClicked: "/workspace",
  },
  {
    icon: IconCode,
    label: "Code Editor",
    color: "rgb(244 114 182)", // Pink
    glowColor: "#ff4500", // Orange Glow
    linkClicked: "/code-editor",
  },

  {
    icon: IconUser,
    label: "Account",
    color: "rgb(255 159 64)", // Orange
    glowColor: "#ffa500", // Orange Glow
    linkClicked: "/account",
  },
  {
    icon: IconSettings,
    label: "Settings",
    color: "rgb(52 211 153)", // Mint Green
    glowColor: "#ff6347", // Tomato Glow
    linkClicked: "/settings",
  },
  {
    icon: IconLogout,
    label: "Logout",
    color: "rgb(255 69 0)", // Red-Orange
    glowColor: "#ff4800", // Orange Red Glow
    linkClicked: "/logout",
  },
  {
    icon: IconClipboardCheck,
    label: "Task Manager",
    color: "rgb(147 51 234)", // Purple
    glowColor: "#da70d6", // Orchid Glow
    linkClicked: "/task-manager",
  },
  {
    icon: IconBook,
    label: "User Guide",
    color: "rgb(240 128 128)", // Light Coral
    glowColor: "#ff4500", // Orange Red Glow
    linkClicked: "/user-guide",
  },
  {
    icon: IconLogin,
    label: "Login",
    color: "rgb(255 69 0)", // Red-Orange
    glowColor: "#ff4500", // Orange Red Glow
    linkClicked: "/auth",
  },
];

export function NavbarMinimal() {
  const location = useLocation();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const currentPath = location.pathname;

    const activeIndex = mockdata.findIndex((link) => {
      const isActive =
        currentPath === link.linkClicked ||
        currentPath.startsWith(link.linkClicked + "/");
      return isActive;
    });
    setActive(activeIndex);
  }, [location.pathname]);

  const links = mockdata
    .filter((link) => {
      if (!isLoggedIn) {
        return (
          link.label === "Home" ||
          link.label === "Code Editor" ||
          link.label === "Login"
        );
      } else {
        return link.label !== "Login";
      }
    })
    .map((link, index) => (
      <NavbarLink
        {...link}
        key={link.label}
        active={index === active}
        onClick={() => setActive(index)}
      />
    ));

  return (
    <div className="pb-28">
      <nav className={classes.navbar}>
        <ScrollArea
          className="md:h-[29rem] h-[40rem]"
          scrollbarSize={2}
          style={{ width: "88px" }}
        >
          <div className={classes.navbarMain}>
            <Stack justify="center" className="gap-7 md:gap-5 ">
              {links}
            </Stack>
          </div>
        </ScrollArea>
      </nav>
    </div>
  );
}
