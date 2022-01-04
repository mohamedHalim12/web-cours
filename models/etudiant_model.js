const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");

const etudiantShema = mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, unique: true },
  pays: { type: String, required: true },
  telephone: { type: String, required: true },
  classe: { type: String, required: true },
  domaineCours: { type: String, required: true },
});
// etudiantShema.plugin(uniqueValidator);
module.exports = mongoose.model("etudiant_model", etudiantShema);
