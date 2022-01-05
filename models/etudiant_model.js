const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");

const etudiantShema = mongoose.Schema({
  nom: { type: String },
  prenom: { type: String },
  email: { type: String },
  pays: { type: String },
  telephone: { type: String },
  contactBy: { type: String },
  classe: { type: String },
  domaineCours: { type: String },
});
// etudiantShema.plugin(uniqueValidator);
module.exports = mongoose.model("etudiant_model", etudiantShema);
