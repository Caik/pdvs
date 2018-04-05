var gulp = require("gulp");
var ts = require("gulp-typescript");
var clean = require("gulp-clean");
var nodemon = require("gulp-nodemon");
const mocha = require("gulp-mocha");

var tsProject = ts.createProject("tsconfig.json");

gulp.task("default", ["serve"]);

gulp.task("clean", () => {
	return gulp
		.src("dist/*", {
			read: false
		})
		.pipe(clean());
});

gulp.task("compile", ["clean"], () => {
	var tsResult = tsProject.src().pipe(tsProject());
	return tsResult.js.pipe(gulp.dest("dist"));
});

gulp.task("watch", ["compile"], () => {
	gulp.watch("src/**/*.ts", ["compile"]);
});

gulp.task("serve", ["watch"], () => {
	nodemon({
		script: "dist/server.js",
		env: { NODE_ENV: "development" }
	}).on("restart", () => {
		console.log("Application restarted");
	});
});

gulp.task("test", ["integrationTest"], () => {
	return gulp.src(["test/**/*.test.ts", "!test/**/Postman.test.ts"]).pipe(
		mocha({
			reporter: "spec",
			require: ["ts-node/register"],
			exit: true
		}).once("error", () => {
			process.exit(1);
		})
	);
});

gulp.task("integrationTest", () => {
	return gulp.src("test/**/Postman.test.ts").pipe(
		mocha({
			reporter: "spec",
			require: ["ts-node/register"]
		}).once("error", () => {
			process.exit(1);
		})
	);
});
