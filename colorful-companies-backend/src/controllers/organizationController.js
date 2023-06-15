import Organizations from "../models/organizationsModel.js";

const findAll = async (req, res) => {
  const organization = await Organizations.findAll();
  res.json(organization);
};

const findOrganizationById = async (req, res) => {
  const organizationById = await Organizations.findOne({
    where: { id: req.params.id },
  });
  res.json(organizationById);
};

const addOrganization = (req, res) => {
  Organizations.create({
    name: req.body.name,
    cnpj: req.body.cnpj,
    city: req.body.city,
    amountOfReviews: 0,
    points: 0,
  }).then((result) => res.json(result));
};

export default { findAll, addOrganization, findOrganizationById };
