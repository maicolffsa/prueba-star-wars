'use strict';

const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const middy = require("@middy/core");
const httpJSONBodyParser = require("@middy/http-json-body-parser");

  const createPI = async (event) => {

  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const id = v4();
  const {director, episode_id, opening_crawl, producer, title} = event.body
  if (director == null) {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 301,
      body: 'Director no puede estar vacío',
    });
    return;
  }

  if (episode_id == null) {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 302,
      body: 'episodio no puede estar vacío',
    });
    return;
  }

  if (opening_crawl== null) {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 303,
      body: 'opening_crawl no puede estar vacío',
    });
    return;
  }

  if (producer == null) {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 304,
      body: 'producer no puede estar vacío',
    });
    return;
  }

  if (title == null) {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 305,
      body: 'title no puede estar vacío',
    });
    return;
  }


  
    const datarecept = {
     
        id,
        director,
        episode_id,
        opening_crawl,
        producer,
        title,
      
    };
  
    dynamoDb.put({
      TableName: process.env.DYNAMODB_TABLE,
      Item: datarecept
      
    }).promise()
  
      return{
      statusCode: 200,
        body: JSON.stringify(datarecept),
    }
    
    

  // write the todo to the database
 
};
module.exports = {
  createPI: middy(createPI).use(httpJSONBodyParser()),
};
