import React from "react"
// Pages
import HomePage from "../pages/HomePage"
import WizardPage from "../pages/WizardPage"
import CreatePatientPage from "../pages/CreatePatientPage"
import UsersPage from "../pages/UsersPage"
import PatientsPage from "../pages/PatientsPage"
import CreateRoomPage from "../pages/CreateRoomPage"
import AssignRoomingPage from "../pages/AssignRoomingPage"
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
  {
    title: "Create Patient",
    path: "/create/patient",
    icon: <DeveloperModeIcon color="primary" style={styles.icon} />,
    panel: true,
    main: true,
    // restricted: ["WIZARD"],
    restricted: ["WIZARD", "MANAGER", "NURSE"],
    component: CreatePatientPage,
  },
  {
    title: "Manage Users",
    path: "/org/users",
    icon: <DeveloperModeIcon color="primary" style={styles.icon} />,
    panel: true,
    main: true,
    // restricted: ["WIZARD"],
    restricted: ["WIZARD", "MANAGER"],
    component: UsersPage,
  },
  {
    title: "Manage Patients",
    path: "/org/patients",
    icon: <DeveloperModeIcon color="primary" style={styles.icon} />,
    panel: true,
    main: true,
    // restricted: ["WIZARD"],
    restricted: ["WIZARD", "MANAGER", "NURSE"],
    component: PatientsPage,
  },
  {
    title: "Create Room",
    path: "/create/room",
    icon: <DeveloperModeIcon color="primary" style={styles.icon} />,
    panel: true,
    main: true,
    // restricted: ["WIZARD"],
    restricted: ["WIZARD", "MANAGER"],
    component: CreateRoomPage,
  },
  {
    title: "Assign Rooming",
    path: "/assign-patient-rooms",
    icon: <DeveloperModeIcon color="primary" style={styles.icon} />,
    panel: true,
    main: true,
    // restricted: ["WIZARD"],
    restricted: ["WIZARD", "MANAGER"],
    component: AssignRoomingPage,
  },
]

export default rootRoutes
