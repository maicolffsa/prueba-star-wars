'use strict';

const uuid = require("uuid");
const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.DYNAMODB_TABLE

const updateP = async (event) => {
  const { id } = event.pathParameters;

  const {director, episode_id, opening_crawl, producer, title} = event.body

  await dynamodb
    .update({
      TableName,
      Key: { id },
      UpdateExpression: "set director= :director, episode_id= :episode_id, opening_crawl= :opening_crawl, producer= :producer,  title= :title ",
      ExpressionAttributeValues: {
        ":director":director, 
        ":episode_id":episode_id, 
        ":opening_crawl":opening_crawl, 
        ":producer":producer, 
        ":title":title
      },
      ReturnValues: "ALL_NEW",
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "updated",
    }),
  };
};

module.exports = {
  updateP,
};

