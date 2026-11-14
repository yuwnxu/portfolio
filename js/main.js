import { route, startRouter } from "./core/router.js";
import { startScreen } from "./ui/screens/start.js";
import { levelsScreen } from "./ui/screens/levels.js";
import { projectScreen } from "./ui/screens/project.js";
import { skillsScreen } from "./ui/screens/skills.js";
import { contactScreen } from "./ui/screens/contact.js";

route("/", startScreen);
route("/projects", levelsScreen);
route("/project/:id", projectScreen);
route("/skills", skillsScreen);
route("/contact", contactScreen);

startRouter(document.getElementById("app"));
