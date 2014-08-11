var isomorphic = require('isomorphic');
module.exports.fetchIndex = function () {
  return new isomorphic.Promise(function (resolve, reject) {
    isomorphic.request.get('/posts.json', function (err, res) {
      // res.body
      res = {
        data: {
          todo_lists: [
            {
              id: 'groceries',
              todo_ids: [1,2]
            },
            {
              id: 'another',
              todo_ids: [3,4]
            }
          ],
          todos: [
            {
              id: 1,
              todo_list_id: 'groceries',
              complete: false,
              text: 'milk'
            },
            {
              id: 2,
              todo_list_id: 'groceries',
              complete: false,
              text: 'cereal'
            },
            {
              id: 3,
              todo_list_id: 'another',
              complete: false,
              text: 'sdkjhf'
            },
            {
              id: 4,
              todo_list_id: 'another',
              complete: false,
              text: 'iwuerywieury'
            }
          ]
        }
      };

      if (err) {
        reject(err);
      } else {
        resolve(res.data);
      }
    });
  });
};

module.exports.fetchShow = function (id) {
  return new isomorphic.Promise(function (resolve, reject) {
    isomorphic.request.get('/posts.json', function (err, res) {
      // res.body
      if (id === 'groceries') {
        res = {
          data: {
            todo_list: {
              id: 'groceries',
              todo_ids: [1,2]
            },
            todos: [
              {
                id: 1,
                todo_list_id: 'groceries',
                complete: false,
                text: 'milk'
              },
              {
                id: 2,
                todo_list_id: 'groceries',
                complete: false,
                text: 'cereal'
              }
            ]
          }
        };
      } else if (id === 'another') {
        res = {
          data: {
            todo_list: {
              id: 'another',
              todo_ids: [3,4]
            },
            todos: [
              {
                id: 3,
                todo_list_id: 'another',
                complete: false,
                text: 'sdkjhf'
              },
              {
                id: 4,
                todo_list_id: 'another',
                complete: false,
                text: 'iwuerywieury'
              }
            ]
          }
        };
      } else {
        res = {
          data: {
            todo_list: {
              id: id,
              todo_ids: []
            },
            todos: []
          }
        };
      }

      if (err) {
        reject(err);
      } else {
        resolve(res.data);
      }
    });
  });
};
