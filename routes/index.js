var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");
const fs = require("fs");
const hogan = require("hogan.js");
const path = require("path");
const etudiant_model = require("../models/etudiant_model");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Cours de Soutient | Mohamed Halim",
    secret: process.env.SECRET,
  });
});
router.post("/", function (req, res, next) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mohamedhalim.cours@gmail.com",
      pass: process.env.SECRET,
    },
  });

  // var mailOptions = {
  //   from: "mohamedhalim.cours@gmail.com",
  //   to: req.body.email,
  //   subject: "Cours de soutient | Mohamed Halim",
  //   html: "<h1> Merci pour votre enregistrement</h1> Nous vous recontacterons dans les prochaines 48 heures afin de programmer un cours de soutien dans les plus brefs délais. Merci pour votre accompagnement.",
  // };

  // transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Email1 sent: " + info.response);
  //   }
  // });
  (async function () {
    try {
      var templateFile2 = fs.readFileSync(
        path.join(__dirname, "../views") + "/template2.html",
        "utf8",
      );
      const templateCompiled2 = hogan.compile(templateFile2);
      var content = {
        nomParent: req.body.nomTuteur,
        firstName: req.body.nom,
        lastName: req.body.prenom,
      };
      const templateRendered2 = templateCompiled2.render(content);
      var mailOptions3 = {
        from: "mohamedhalim.cours@gmail.com",
        to: req.body.email,
        subject: "Cours de soutien | Mohamed Halim",
        html: templateRendered2,
      };
      transporter.sendMail(mailOptions3, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email2 sent: " + info.response);
        }
      });
    } catch (error) {
      console.log(error);
    }
  })();
  (async function () {
    try {
      var templateFile = fs.readFileSync(
        path.join(__dirname, "../views") + "/template.html",
        "utf8",
      );
      const templateCompiled = hogan.compile(templateFile);
      var content = {
        nomParent: req.body.nomTuteur,
        firstName: req.body.nom,
        lastName: req.body.prenom,
        userEmail: req.body.email,
        userPays: req.body.pays,
        userContact: req.body.contactBy,
        userPhone: req.body.telephone,
        userClasse: req.body.classe,
        userDomaine: req.body.domaine,
      };
      const templateRendered = templateCompiled.render(content);
      var mailOptions2 = {
        from: "mohamedhalim.cours@gmail.com",
        to: "mohamedhalim.cours@gmail.com",
        subject: "Cours de soutient | Inscription",
        html: templateRendered,
      };
      transporter.sendMail(mailOptions2, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email2 sent: " + info.response);
        }
      });
      const etudiant = await etudiant_model.create({
        nomParent: req.body.nomTuteur,
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        pays: req.body.pays,
        telephone: req.body.telephone,
        contactBy: req.body.contactBy,
        classe: req.body.classe,
        domaineCours: req.body.domaine,
      });
    } catch (error) {
      console.log(error);
    }
  })();
  // sendEmail().catch(console.error);
  console.log("vous etes passez ici");
  res.render("thanks", {
    title: "Cours de Soutient | Mohamed Halim",
    nom: req.body.nom,
    prenom: req.body.prenom.toUpperCase(),
  });
});

module.exports = router;
