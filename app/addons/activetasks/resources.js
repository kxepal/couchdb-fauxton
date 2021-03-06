// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

define([
  'app',
  'api',
  'addons/activetasks/actions'
],

function (app, FauxtonAPI, Actions) {
  var Active = {};

  Active.AllTasks = Backbone.Collection.extend({

    url: function () {
      return app.host + '/_active_tasks';
    },

    pollingFetch: function () { //still need this for the polling
      this.fetch({reset: true, parse: true});
      Actions.setActiveTaskIsLoading(true);
      return this;
    },

    parse: function (resp) {
      //no more backbone models, collection is converted into an array of objects
      Actions.setActiveTaskIsLoading(false);
      var collectionTable = [];

      _.each(resp, function (item) {
        collectionTable.push(item);
      });

      //collection is an array of objects
      this.table = collectionTable;
      return resp;
    },

    table: []

  });

  return Active;
});
