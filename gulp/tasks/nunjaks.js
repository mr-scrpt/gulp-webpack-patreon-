import fileInclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import nunjucksRender from "gulp-nunjucks-render";
import gulpData from "gulp-data";
/*const { data } = require("../data/index");*/
import { data } from "../../src/data/index.js";
//import pug from "gulp-pug";

export const nunjaks = () => {
	return app.gulp
		.src(app.path.src.nunjaks)
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: "NUNJACKS",
					message: "Error: <%= error.message %>",
				})
			)
		)
		.pipe(fileInclude())

		.pipe(gulpData(() => data))
		.pipe(
			nunjucksRender({
				path: ["src/views"],
			})
		)
		.pipe(app.plugins.replace(/@img\//g, "img/"))
		.pipe(app.plugins.ifCustom(app.isBuild, webpHtmlNosvg()))
		.pipe(
			app.plugins.ifCustom(
				app.isBuild,
				versionNumber({
					value: "%DT%",
					append: {
						key: "_v",
						cover: 0,
						to: ["css", "js"],
					},
					output: {
						file: "gulp/version.json",
					},
				})
			)
		)
		.pipe(app.gulp.dest(app.path.build.nunjaks))
		.pipe(app.plugins.browsersync.stream());
};
