const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  responsableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  equipeIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  dateDebut: {
    type: Date,
    required: true,
  },
  dateFin: {
    type: Date,
    required: true,
  },
});

const projectModel = mongoose.model("project", projectSchema);

module.exports = { projectModel };
