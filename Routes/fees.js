const express = require('express')
const router = express.Router()
const Fees = require('./../Models/feesModel')
const auth = require('../Middleware/auth')
const Student = require('./../Models/studentReg')


router.post('/addFees',  async function (req,res){
try{
  console.log("inside addFees")
const feesObj = new Fees()
const classS = req.body.classS

/*const year = req.body.fees.year

feesObj.fees.amount=amount
feesObj.fees.year=year
feesObj.fees.createdBy.adminId=req.id
feesObj.fees.createdBy.name=req.name
console.log("year "+req.body.fees[0].year)
let fee = await feesObj.findOne(  { classS:classS});
console.log(':::fee:::', fee);

fee.fees.push({year:req.body.fees[0].year,amount:req.body.fees[0].amount})
let result = fee.save()*/
let res = await feesObj.findOneAndUpdate(
  { classS:classS},
    {$push: {fees:{year:req.body.fees[0].year,amount:req.body.fees[0].amount} }
  }
)

//let result = await feesObj.save()
console.log(" addfees "+ res)
/*let res = await studentObj.bulkWrite([
    {
      updateMany: {
        filter: { classS: classS },
        update: {  $push: {feeDetails:feeDetails }}
      } 
    }
  ])*/

if(result){
    res.status(200).send(result)
}
else
res.status(401)
}
catch(e){
res.status(300).send(e)
}
})


router.post('/updateFees', auth, async function (req,res){
  try{
    console.log("inside updateFees")
  const studentObj = new Student()
  const classS = req.body.classS
  const amount = req.body.fees.amount 
  console.log('inside updateFees : '+amount)
  const year = req.body.fees.year
  
  let fees={}
  fees["year"]=year
  fees["amount"]=amount
  fees["createdBy.adminId"]=req.id
  fees["createdBy.name"]=req.name
  //let result = await 
  /*let res = await Fees.bulkWrite([
      {
        updateMany: {
          filter: { classS: classS },
          update: { $push: {fees:feeDetails }}
        } 
      } 
    ])*/
    console.log('::fees::', fees)
  const result = await Fees.findOneAndUpdate(
     { classS: classS },
        { $push: {fees:fees }
   } );
  
  if(result){
      res.status(200).send(result)
  }
  else
  res.status(401)
  }
  catch(e){
  res.status(300).send(e)
  }
  })
  

module.exports = router