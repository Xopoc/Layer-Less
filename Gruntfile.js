module.exports = function (grunt) {

	var globalOptions = {
		browsers: ['> 1%', 'last 3 versions', 'ie 9', 'ie 10'],
		less: {
			srcPath: 'lib/less/sandbox/',
			srcFiles: [
				'**/*.init.less'
			],
			destPath: 'dist/css/'
		}
	};

	// Project configuration.
	grunt.initConfig({
		// Task configuration.
		pkg: grunt.file.readJSON('package.json'),
		// Compile LESS files to CSS.
		less: {
			noMap: {
				options: {
					sourceMap: false,
					outputSourceFiles: false
				},
				files: [
					{
						expand: true,           // Enable dynamic expansion.
						cwd: globalOptions.less.srcPath,    // Src matches are relative to this path.
						src: globalOptions.less.srcFiles,   // Actual pattern(s) to match.
						dest: globalOptions.less.destPath,  // Destination path prefix.
						ext: '.css',            // Dest filepaths will have this extension.
						extDot: 'first',         // Extensions in filenames begin after the first dot
						flatten: true,
						rename: function(dest, matchedSrcPath, options) {
							//grunt.log.writeln(matchedSrcPath);
							return dest + matchedSrcPath.replace('sandbox.', '');
						}
					}
				]
			}
		},



		// Run predefined tasks whenever watched file changed or deleted
		watch: {
			css: {
				options: {
					atBegin: true
				},
				files: ['lib/less/**/*.less'],
				tasks: [
					'build-css'
				]
			}
		}
	});

	// These plugins provide necessary tasks.
	require('load-grunt-tasks')(grunt);

	// Default task.
	grunt.registerTask('default', ['watch:css']);
	//
	//// Custom tasks
	grunt.registerTask('build-css', ['less:noMap']);
};
