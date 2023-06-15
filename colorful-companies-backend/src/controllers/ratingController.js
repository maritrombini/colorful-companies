import People from "../models/peopleModel.js";
import Organizations from "../models/organizationsModel.js";
import Ratings from "../models/ratingModel.js";

const calculateOrganizationRating = async (organizationId) => {
  const organization = await Organizations.findByPk(organizationId, {
    include: Ratings,
  });
  const totalScore = organization.Ratings.reduce(
    (total, rating) => total + rating.score,
    0
  );
  const amountOfReviews = organization.Ratings.length;
  const points = Math.round((totalScore / amountOfReviews) * 10) / 10;
  await organization.update({ amountOfReviews, points });
};

const addRating = async (req, res) => {
  const { personId, organizationId, title, review, score, dateRate } = req.body;

  try {
    const rating = await Ratings.create({
      title,
      review,
      score,
      dateRate,
      organizationId,
      personId,
    });

    const person = await People.findByPk(personId);
    const organization = await Organizations.findByPk(organizationId);

    await organization.addRating(rating);
    await person.addRating(rating);

    await calculateOrganizationRating(organizationId);

    await person.increment("amountOfContributions");

    res.json(rating);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding rating" });
  }
};

const findAll = async (req, res) => {
  const order = req.query.order === "asc" ? "ASC" : "DESC";
  const sortBy = req.query.sortBy || "createdAt";
  const ratings = await Ratings.findAll({
    include: [
      {
        model: Organizations,
        attributes: ["name", "amountOfReviews"],
      },
    ],
    order: [[sortBy, order]],
  });
  res.json(ratings);
};


const findRatingById = async (req, res) => {
  const ratingById = await Ratings.findOne({ where: { id: req.params.id } });
  res.json(ratingById);
};

export default { addRating, findAll, findRatingById };
