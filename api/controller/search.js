const Question = require("../models/question");
const Joi = require('joi');
const { query } = require("express-validator");
module.exports.searchQuery = async function(req,res){
    try{
        // const value = await schema.validateAsync({query:req.query.keyword});
        // let qry2 = req.query.keyword.split('?')[0];
       
        let question = await Question.find({
            tags:req.query.keyword
        })
        let querys = await Question.find({
            query:req.query.keyword
        })
        
        if(question.length>0){
            return res.json(200,{
                message:'these are the matching results',
                success:true,
                result:question
            })
        }else if(querys.length>0){
            return res.json(200,{
                message:'these are the matching results',
                success:true,
                result:querys
            })
        }
        else{
            return res.json(400,{
                message:'not matched with any result',
                success:false
            })
        }
    }catch(error){
        console.log(error.details[0].message);
        return res.json(500,{
            message:error.details[0].message,
            success:false,
            error:error.details[0].message
        })
    }
}

// joi for validation of input data

// const schema = Joi.object({
//     query: Joi.string()
//         .min()
//         .max(300)
//         .required(),
// })