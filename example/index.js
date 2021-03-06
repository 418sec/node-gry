"use strict";

// Dependencies
const Repo = require("../lib")
    , fs = require("fs")
    , oneByOne = require("one-by-one")
    ;

// Create the repository
var myRepo = new Repo("./foo");
oneByOne([
    myRepo.create.bind(myRepo)
  , cb => {
        console.log("> Created the repository.");
        fs.writeFile("./foo/README", "Hello World!", cb);
    }
  , cb => {
        console.log("> Created README.md");
        myRepo.exec(['add', '.'], cb);
    }
  , cb => {
        console.log("> Added the files.");
        myRepo.commit("Initial commit.", cb);
    }
  , cb => {
        console.log("> Created the initial commit.");
        cb();
    }
], function (err) {
    console.log(err ? "An error appeared: " + err.stack : "Successfully done.");
});
