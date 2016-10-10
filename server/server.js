var AWS = require("aws-sdk");
var uuid = require('node-uuid');

var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;
AWS.config.update({
  region: "us-east-1",
  // endpoint: "dynamodb.us-east-1.amazonaws.com"
});

var dynamodb = new AWS.DynamoDB();

var docClient = new AWS.DynamoDB.DocumentClient();
var table = "Students";

var readItem = function (student_id) {
  var params = {
    TableName: table,
    Key:{
      "student_ID": student_id,
    }
  };

  docClient.get(params, function(err, data) {
    if (err) {
      console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    }
  });
};
var deleteItem = function (student_id) {
  var params = {
    TableName:table,
    Key:{
      "student_ID":student_id
    }
  };
  console.log("Attempting a conditional delete...");
  docClient.delete(params, function(err, data) {
    if (err) {
      console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
  });
};

var updateItem = function (item) {
  var params = {
    TableName:table,
    Key:{
      "student_ID": item.student_ID
    },
    UpdateExpression: "set first_name=:fn, last_name=:ln, email=:e, address.address_line_1=:af, address.address_line_2=:as, address.city=:ci," +
    " address.current_state=:st, address.country=:ac, address.zip_code=:az, GPA=:gpa",
    ExpressionAttributeValues:{
      ":fn":item.first_name,
      ":ln":item.last_name,
      ":e":item.email,
      ":af":item.address.address_line_1,
      ":as":item.address.address_line_2,
      ":ci":item.address.city,
      ":st":item.address.current_state,
      ":ac":item.address.country,
      ":az":item.address.zip_code,
      ":gpa":item.GPA
    },
    ReturnValues:"UPDATED_NEW"
  };

  console.log("Updating the item...");
  docClient.update(params, function(err, data) {
    if (err) {
      console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
  });
};
var addNewItem = function (params) {
  console.log("Adding a new item...");
  docClient.put(params, function(err, data) {
    if (err) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Added item:", JSON.stringify(data, null, 2));
    }
  });
};

var createTable = function () {
  var params = {
    TableName : table,
    KeySchema: [
      { AttributeName: "student_ID", KeyType: "HASH"}  //Partition key
    ],
    AttributeDefinitions: [
      { AttributeName: "student_ID", AttributeType: "N" }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10
    }
  };

  dynamodb.createTable(params, function(err, data) {
    if (err) {
      console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
  });
};

// var params = {
//   TableName:table,
//   Item:{
//     "student_ID": 916400061,
//     "first_name": 'Kartik',
//     "last_name" : 'Bholla',
//     "email"     : 'kbholla@mail.sfsu.edu',
//     "address"   : {
//       "address_line_1": '150 Font Blvd',
//       "address_line_2": 'Parkmerced',
//       "city"          : 'San Francisco',
//       "current_state"         : 'CA',
//       "country"       : 'USA',
//       "zip_code"      : '94132'
//     },
//     "GPA"       : 4
//   }
// };
//
// var item = {
//   "student_ID": 915600053,
//   "first_name": 'Abhilash',
//   "last_name" : 'Shrivastava',
//   "email"     : 'kbholla@mail.sfsu.edu',
//   "address"   : {
//     "address_line_1": '150 Font Blvd',
//     "address_line_2": 'Parkmerced',
//     "city"          : 'San Francisco',
//     "current_state"         : 'CA',
//     "country"       : 'USA',
//     "zip_code"      : '94132'
//   },
//   "GPA"       : 4
// };
//
// addNewItem(params);
// // updateItem(item);
// // deleteItem(915600053);
// // readItem(915600053);