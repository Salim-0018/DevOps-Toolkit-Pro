const express = require("express");

const router = express.Router();

const {
  getPods,
  getRunningPods,
  getNodeCPU
} = require("../services/prometheusService");


router.get("/pods", async (req, res) => {
  try {
    res.json(await getPods());
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});


router.get("/running-pods", async (req, res) => {
  try {
    res.json(await getRunningPods());
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});


router.get("/summary", async (req,res)=>{
    try{

        const pods = await getPods();

        res.json({
            totalPods: pods.length,
            pods: pods
        });

    }catch(err){
        res.status(500).json({
            error: err.message
        });
    }
});


router.get("/cpu", async (req, res) => {
  try {
    res.json(await getNodeCPU());
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});


router.get("/test", (req, res) => {
  res.json({
    message: "prometheus route working"
  });
});


module.exports = router;











