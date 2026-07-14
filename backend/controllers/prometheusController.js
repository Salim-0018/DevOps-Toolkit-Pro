const prometheusService = require("../services/prometheusService");


async function pods(req,res){

try{

const data = await prometheusService.getPods();

res.json(data);

}
catch(err){

res.status(500).json({
error:err.message
});

}

}



async function runningPods(req,res){

try{

const data = await prometheusService.getRunningPods();

res.json(data);

}
catch(err){

res.status(500).json({
error:err.message
});

}

}


module.exports={
pods,
runningPods
};
