'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const TableName = process.env.DYNAMODB_TABLE

const deleteP = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  await dynamodb
    .delete({
      TableName,
      Key: {
        id
      },
    })
    .promise();

  return {
    status: 200,
    body: {
      message: 'Deleted'
    }
  };
};

module.exports = {
  deleteP
};