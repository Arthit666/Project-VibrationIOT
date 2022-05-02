const Machine = require("../models/Machine");
const fs = require("fs");

//@route  POST http://localhost:8000/api/machine/create
exports.createMachine = async (req, res) => {
  const { machineName, status, equipment, priority, desc, filename } = req.body;
  try {
    // check machine
    let machine = await Machine.findOne({ machineName });
    if (machine) {
      return res.status(400).json({ msg: "Machine already exists" });
    }
    const newMachine = {
      machineName,
      status,
      equipment,
      priority,
      desc,
      machinePic: filename,
    };
    if (typeof req.file != "undefined") {
      newMachine.machinePic = req.file.filename;
    }
    res.json(await new Machine(newMachine).save());
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//@route  GET ALL http://localhost:8000/api/machine
exports.getAllMachine = async (req, res) => {
  try {
    const machines = await Machine.find();
    res.status(200).json(machines);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//@route  GET STATUS http://localhost:8000/api/machine/status
exports.getStatusMachine = async (req, res) => {
  try {
    const running = await Machine.find({status:"Running"})
    const stop = await Machine.find({status:"Stop"})
    const maintenance = await Machine.find({status:"Maintenance"})
    const pri1 = await Machine.find({priority:"1"})
    const pri2 = await Machine.find({priority:"2"})
    const pri3 = await Machine.find({priority:"3"})
    const pri4 = await Machine.find({priority:"4"})
    res.status(200).json({running,stop,maintenance,pri1,pri2,pri3,pri4});
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
//@route  GET ONE http://localhost:8000/api/machine/id
exports.getOneMachine = async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id);
    res.status(200).json(machine);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//@route  DELETE http://localhost:8000/api/machine/id
exports.deleteMachine = async (req, res) => {
  try {
    const machine = await Machine.findOneAndDelete({ _id: req.params.id });
    if (machine.machinePic != "defaultmachineimage.jpg") {
      await fs.unlink(`./public/uploads/${machine.machinePic}`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("remove file success");
        }
      });
    }
    res.status(200).json("User has been deleted..");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


//@route  PUT http://localhost:8000/api/machine/id
exports.updateMachine = async (req, res) => {

    console.log(req.body)
  try {
    const { equipment,status,speed,problem,priority,filenameold,machineName } = req.body
    var newData = {
      machineName,
      equipment,
      status,
      speed,
      problem,
      priority,
      machinePic:filenameold
    }
    if(typeof req.file != 'undefined'){
      newData.machinePic = req.file.filename;
      if(filenameold != 'defaultmachineimage.jpg'){
        await fs.unlink(`./public/uploads/${filenameold}`,(err)=>{
          if(err){
            console.log(err)
          }else{
            console.log('remove file success')
          }
        })
      }
    }
    const updated = await Machine.findOneAndUpdate({_id: req.params.id},
      newData,
      {new: true}
    )
    res.status(200).json(updated)
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
