var AWS = require("aws-sdk");
var uuid = require('node-uuid');
var express = require('express');
var app = express();
var cors = require('cors');
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/add-student', function (req, res) {
  res.connection.setTimeout(0);
  addNewItem(req.body);
  res.send('200');
});

app.get('/view-all', function (req, res) {
  res.connection.setTimeout(0);
  viewAllItem(function (response) {
    res.send(response);
  });
});

var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;
AWS.config.update({
  region: "us-east-1",
  // endpoint: "dynamodb.us-east-1.amazonaws.com"
});

var dynamodb = new AWS.DynamoDB();

var docClient = new AWS.DynamoDB.DocumentClient();
var table = "Students";

var viewAllItem = function (callback) {
  var students = [];
  var params = {
    TableName: table
  };
  docClient.scan(params, onScan);

  function onScan(err, data) {
    if (err) {
      console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      // print all the movies
      console.log("Scan succeeded.");
      data.Items.forEach(function(student) {
        students.push(student);
        console.log(student);
      });

      // continue scanning if we have more movies
      if (typeof data.LastEvaluatedKey != "undefined") {
        console.log("Scanning for more...");
        params.ExclusiveStartKey = data.LastEvaluatedKey;
        docClient.scan(params, onScan);
      }
    }
    callback(students);
  }
};

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
var addNewItem = function (item) {
  var params = {
  TableName:table,
  Item: item
};
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

app.listen(7000, function () {
  console.log('Example app listening on port 7000!');
});
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