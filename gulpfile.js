var gulp = require("gulp");
var ts = require("gulp-typescript");
var clean = require("gulp-clean");
var nodemon = require("gulp-nodemon");

var tsProject = ts.createProject("tsconfig.json");

gulp.task("default", ["serveDev"]);

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

gulp.task("serveDev", ["watch"], () => {
	nodemon({
		script: "dist/server.js",
		env: { NODE_ENV: "development" }
	}).on("restart", () => {
		console.log("restarted");
	});
});
