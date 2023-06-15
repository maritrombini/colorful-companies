import People from "../models/peopleModel.js";

const findAll = async (req, res) => {
  const people = await People.findAll();
  res.json(people);
};

const findPersonById = async (req, res) => {
  const personById = await People.findOne({
    where: {
      id: req.params.id
    }
  });
  res.json(personById);
};

const addPerson = async (req, res) => {
  People.create({
    name: req.body.name,
    cpf: req.body.cpf,
    email: req.body.email,
    amountOfContributions: 0,
  }).then((result) => res.json(result));
}

export default {
  findAll,
  addPerson,
  findPersonById
};