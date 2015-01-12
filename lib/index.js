var Fs = require("fs")
  , Path = require("path")
  , Exec = require("child_process").exec
  ;

var Gry = module.exports = function (options) {

    var self = this;

    if (typeof options === "string") {
        options = {
            path: options
        };
    }

    options.path = Path.resolve(options.path);

    self.options = options;
    self.cwd = options.path;
};

/**
 * exec
 * Executes a git command in the repository directory.
 *
 * @name exec
 * @function
 * @param {String} command The git command that should be executed in the repository directory.
 * @param {Function} callback The callback function.
 * @return {Gry} The `Gry` intance.
 */
Gry.prototype.exec = function (command, callback) {
    Exec("git " + command.trim(), { cwd: this.cwd }, function (err, stdout) {
        if (err) { return callback(err); }
        callback(null, stdout.trimRight());
    });
    return this;
};

/**
 * init
 * Inits the git repository.
 *
 * @name init
 * @function
 * @param {Function} callback The callback function.
 * @return {Gry} The `Gry` intance.
 */
Gry.prototype.init = function (callback) {
    return this.exec("init", callback);
};

/**
 * create
 * Creates a git repository.
 *
 * @name create
 * @function
 * @param {String} path The path of the repository.
 * @param {Function} callback The callback function
 * @return {Gry} The `Gry` intance.
 */
Gry.prototype.create = function (callback) {
    var self = this;
    Fs.exists(self.cwd, function (e) {
        if (e) {
            callback(new Error("A directory already exists."));
            return self;
        }
        Fs.mkdir(self.cwd, function (err) {
            if (err) {
                callback(err);
                return self;
            }
            self.init(callback);
        });
    });
    return self;
};

/**
 * commit
 * Creates a commit, providing the `message`.
 *
 * @name commit
 * @function
 * @param {String} message The commit message
 * @param {String} options Additional options passed to the commit command.
 * @param {Function} callback The callback function.
 * @return {Gry} The `Gry` intance.
 */
Gry.prototype.commit = function (message, options, callback) {
    message = message.replace(/\"/g, "\\");
    if (typeof options === "function") {
        callback = options;
        options = "";
    }
    return this.exec("commit -m \"" + message + "\" " + options, callback)
};

/**
 * pull
 * Runs `git pull`.
 *
 * @name pull
 * @function
 * @param {String} options Additional options passed to the `pull` command.
 * @param {Function} callback The callback function.
 * @return {Gry} The `Gry` intance.
 */
Gry.prototype.pull = function (options, callback) {
    if (typeof options === "function") {
        callback = options;
        options = "";
    }
    return this.exec("pull " + options, callback);
};

/**
 * add
 * Runs `git add`.
 *
 * @name add
 * @function
 * @param {String} options Additional options passed to the `add` command.
 * @param {Function} callback The callback function.
 * @return {Gry} The `Gry` intance.
 */
Gry.prototype.add = function (options, callback) {
    if (typeof options === "function") {
        callback = options;
        options = "";
    }
    return this.exec("add " + options, callback);
};

/**
 * branch
 * Runs `git branch`.
 *
 * @name branch
 * @function
 * @param {String} options Additional options passed to the `branch` command.
 * @param {Function} callback The callback function.
 * @return {Gry} The `Gry` intance.
 */
Gry.prototype.branch = function (options, callback) {
    if (typeof options === "function") {
        callback = options;
        options = "";
    }
    return this.exec("branch " + options, callback);
};

/**
 * checkout
 * Runs `git checkout`.
 *
 * @name checkout
 * @function
 * @param {String} options Additional options passed to the `checkout` command.
 * @param {Function} callback The callback function.
 * @return {Gry} The `Gry` intance.
 */
Gry.prototype.checkout = function (options, callback) {
    if (typeof options === "function") {
        callback = options;
        options = "";
    }
    return this.exec("checkout " + options, callback);
};

/**
 * clone
 * Runs `git clone`.
 *
 * @name clone
 * @function
 * @param {String} gitUrl The git url of the repository that should be cloned.
 * @param {String} options Additional options passed to the `checkout` command.
 * @param {Function} callback The callback function.
 * @return {Gry} The `Gry` intance.
 */
Gry.prototype.clone = function (gitUrl, options, callback) {
    if (typeof options === "function") {
        callback = options;
        options = "";
    }
    return this.exec("clone " + gitUrl + " " + options, callback);
};