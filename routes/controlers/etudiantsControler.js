const etudiant_model = require("../../models/etudiant_model");

exports.signup = async (req, res, next) => {
  try {
    const etudiant = await etudiant_model.create({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      pays: req.body.pays,
      telephone: req.body.telephone,
      contactBy: req.body.contactBy,
      classe: req.body.classe,
      domaineCours: req.body.domaine,
    });
  } catch (error) {}
};
