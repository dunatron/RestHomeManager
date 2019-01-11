import React from "react"
// Pages
import HomePage from "../pages/HomePage"
import WizardPage from "../pages/WizardPage"
// Icons
import DeveloperModeIcon from "@material-ui/icons/DeveloperMode"
// Weekend
// DeveloperMode

const styles = {
  icon: {
    height: "100%",
    width: "100%",
    opacity: 0.4,
  },
}

const rootRoutes = [
  {
    title: "Home",
    path: "/",
    panel: true,
    main: true,
    restricted: ["DEVELOPER", "PROJECT_MANAGER", "ONBOARDER"],
    component: HomePage,
  },
  {
    title: "Wizards Panel",
    path: "/wizard",
    icon: <DeveloperModeIcon color="primary" style={styles.icon} />,
    panel: true,
    main: true,
    // restricted: ["WIZARD"],
    restricted: ["WIZARD"],
    component: WizardPage,
  },
]

export default rootRoutes