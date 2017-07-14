var gulp = require('gulp'),
	ftp = require('gulp-ftp'),
	vftp = require('vinyl-ftp'),
	build = require("./build/build.js"),
	ftpConfig = require("./ftp.json"),
	packageJson = require('./package.json');;
gulp.task("build", () => {
	build(() => {
		console.log("----------------------");
	})
})
gulp.task("ftp", () => {
	console.log();
	var conn = vftp.create({
		host: ftpConfig.host,
		port: ftpConfig.port,
		user: ftpConfig.user,
		password: ftpConfig.password,
		secure: true,
		secureOptions: {
			rejectUnauthorized: false
		}
	});
	return gulp.src([packageJson.name + "/static/**"], {
			base: '.',
			buffer: false
		})
		.pipe(conn.dest(packageJson.to));
})