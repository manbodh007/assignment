const Question = require("../models/question");
const { check, validationResult } = require('express-validator');
const Joi = require('joi');

module.exports.insertQuestion = async function(req,res){
    try{
        const value = await schema.validateAsync({query: req.body.query});
        
          let query = await Question.create({
              query:req.body.query,
              topic:req.body.topic,
          })
          let str = req.body.tags.split(" ").join("");
          let tags = str.split(',');
          for(i of tags){
            query.tags.push(i);
          }
          query.save();

          return res.json(200,{
              message:'query inserted into database',
              status:true,
              question:query,
          });
    }catch(error){
        console.log(error);
        return res.json(500,{
            message:error.details[0].message,
            success:false,
            error:error.details[0].message
        })
    }
}
// validation for query
const schema = Joi.object({
    query: Joi.string()
        .min(3)
        .max(300)
        .required(),
})