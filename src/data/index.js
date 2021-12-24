/*const { readFileSync } = require("fs");*/
import { readFileSync } from "fs";
export const data = {
	menu: JSON.parse(readFileSync("./src/data/menu.json", "utf8")),
	/*phone: JSON.parse(readFileSync("./src/data/phone.json", "utf8")),
	social: JSON.parse(readFileSync("./src/data/social.json", "utf8")),*/
};
