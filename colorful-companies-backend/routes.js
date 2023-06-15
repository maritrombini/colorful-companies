import express from "express";
import people from "./src/controllers/personController.js";
import organization from "./src/controllers/organizationController.js";
import rating from "./src/controllers/ratingController.js";

const routes = express.Router();

routes.post("/addPerson", people.addPerson);
routes.get("/people", people.findAll);
routes.get("/personById/:id", people.findPersonById);

routes.post("/addOrganization", organization.addOrganization);
routes.get("/organizations", organization.findAll);
routes.get("/organizationById/:id", organization.findOrganizationById);

routes.post("/addRating", rating.addRating);
routes.get("/ratings", rating.findAll);
routes.get("/ratingById/:id", rating.findRatingById);

export { routes as default };
