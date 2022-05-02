const mongoose = require("mongoose");

const MachineSchema = new mongoose.Schema(
  {
    machineName: {
      type: String,
      required: true,
    },
    speed: {
      type: String,
      default: "-"
    },
    role: {
      type: String,
      default: "user",
    },
    machinePic: {
      type: String,
      default: "defaultmachineimage.jpg",
    },
    desc: {
      type: String,
      default: "-"
    },
    status: {
      type: String,
      default: "-"
    },
    priority: {
      type: String,
      default: "-"
    },
    equipment: {
      type: String,
      default: "-"
    },
    problem: {
      type: String,
      default: "Normal"
    },
  },
  { timestamps: true }
);

module.exports = Machine = mongoose.model("machine", MachineSchema);
