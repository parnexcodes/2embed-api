import * as Express from 'express';

import home from "./api/home";
import details from "./api/details";
import search from "./api/search";
import episodes from "./api/episodes";
import getSource from "./api/get_source";

export const initRoutes = (app: Express.Application) => {
	app.use("/api", home);
	app.use("/api", details);
	app.use("/api", search);
	app.use("/api", episodes);
	app.use("/api", getSource);
};

