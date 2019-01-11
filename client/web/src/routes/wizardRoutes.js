import React from "react"
import UserSetupPage from "../pages/UserSetupPage"
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle"

const styles = {
  icon: {
    height: "100%",
    width: "100%",
    opacity: 0.4,
  },
}

const wizardRoutes = [
  {
    title: "Manage Users",
    path: "/wizard/users",
    icon: <SupervisedUserCircleIcon color="primary" style={styles.icon} />,
    panel: true,
    main: true,
    restricted: ["WIZARD", "PROJECT_MANAGER"],
    component: UserSetupPage,
  },
]

export default wizardRoutes