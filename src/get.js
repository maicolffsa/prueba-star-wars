'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.DYNAMODB_TABLE

const getP = async (event) => {

  const { id } = event.pathParameters;

  const result = await dynamodb
    .get({
      TableName,
      Key: { id },
    })
    .promise();

  const task = result.Item;

  return {
    status: 200,
    body: task,
  };
};

module.exports = {
  getP,
};
