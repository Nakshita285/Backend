const express = require('express');
const portNumber = 8081;
const app = express();
app.use(express.json());

const planRouter = express.Router();
app.use('/api/plans', planRouter);

let plans = [
    {
        "id": 1,
        "name": "Premium",
        "ratings": 7,
        "price": 100,
        "delivery": true,
        "meals": 3,
        "description": "Provides the high quality food and services in very short time period"
    },
    {
        "id": 2,
        "name": "Vegan",
        "ratings": 8,
        "price": 200,
        "delivery": true,
        "meals": 3,
        "description": "Provides the high quality vegan food and best quality in very short time period"
    },
    {
        "id": 3,
        "name": "Protein",
        "ratings": 7,
        "price": 150,
        "delivery": true,
        "meals": 3,
        "description": "Provides the protein rich diet and great meals in very short time period"
    }
];
function getPlanDetails(request, response) {
    response.status(200).json({
        message: "Plans listed below:", 
        plans: plans
    })
}
function createPlans(request, response) {
    let planObj = request.body;
    plans.push(planObj);
    response.status(200).json({
        message: "Plan Created and add successfully",
        planCreated: planObj
    })
}
function updatePlans(request, response) {
    let planObj = request.body;
    for(let key in planObj) {
        plans[key] = planObj[key];
    }
    response.status(200).json({
        message: "Plan Updated",
        updated_plans: plans
    })
}
function deletePlans(request, response) {
    let plans = [];
    response.status(200).json({
        message: "Plans deleted"
    })
}
function getPlanById(request, response) {
    let planID = request.params.id;
    for(let i=0; i<plans.length; i++){
        if(plans[i].id == planID){
            let planObj = plans[i];
            response.status(200).json({
                message: "Plan obtained",
                obtainedPlan : planObj
            })
        }
    }
}


planRouter.route('/')
    .get(getPlanDetails)
    .post(createPlans)
    .patch(updatePlans)
    .delete(deletePlans)

planRouter.route('/:id')
    .get(getPlanById)

app.listen(8081, function(){
    console.log("Server connected on 8081 port.");
})