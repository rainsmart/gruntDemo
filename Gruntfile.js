// 包装函数
module.exports = function(grunt){
	// 任务配置，所有插件的配置信息
	grunt.initConfig({
		//获取package.json的信息
		pkg: grunt.file.readJSON('package.json'),
		clean : {
		  css: {
	        src: ['build/css/']
	      },
	      html:{
	        src: ['build/*.html']
	      },
	      js:{
	          src:['build/js/']
	      }
		},
		uglify :{
			options : {

			},
			build : {
				src : 'src/js/*.js',
				dest : 'build/js/<%=pkg.name%>-<%=pkg.version%>.js'
			}
		},
		jshint : {
			build : ['Gruntfile.js','src/js/*.js'],
			options : {
				jshintrc : '.jshintrc'
			}
		},
		cssmin : {
			options : {
				beautify: {
		          ascii_only: true
		        },
		        compatibility : 'ie8', //设置兼容模式
		        noAdvanced : true //取消高级特性
			},
			minify : {
				expand: true,
				cwd : 'src/css/',
		        src: '*.css',
		        dest: 'build/css',
		        ext: '.min.css'
			}
		},
		csslint : {
			 strict: {
				 options: {
				    import: 2
				 },
				 src: ['path/to/**/*.css']
			}
		},
		watch : {
			css : {
		        files: ['src/css/*.css'],
			    tasks: ['csslint','clean:css','cssmin']
		    },
		    js : {
		        files: ['js/src/*.js'],
		        tasks: ['jshint','clean:js','uglify']
		    }
		}
	});
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	//运行grunt的时候需要做什么
	grunt.registerTask('default',['clean','jshint','uglify','csslint','cssmin','watch'])
}