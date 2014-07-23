module.exports = function(grunt) {

  grunt.initConfig({
    host_config: grunt.file.readJSON('.host_config'),
    compass: {
      dist: {
        options: {
          sassDir: 'sass',
          cssDir: 'css',
          environment: 'production'
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          protocol: 'https'
        }
      }
    },
    'ftp-deploy': {
      build: {
        auth: {
          host: '<%- host_config.host %>',
          port: '<%- host_config.port %>'
        },
        src: '.',
        dest: '<%- host_config.directory %>',
        exclusions: [
          '.DS_Store',
          '.sass-cache',
          '.git*',
          '.host_config',
          '.ftppass',
          'node_modules',
          'sass',
          'Gruntfile.js',
          'package.json',
          'README.markdown'
        ]
      }
    },
    jshint: {
      files: ['js/**/*.js']
    },
    uglify: {
      options: {
        preserveComments: 'some',
        sourceMap: true
      },
      dist: {
        files: {
          'js/lightbox.min.js': ['js/lightbox.js']
        }
      }
    },   
    watch: {
      sass: {
        files: ['sass/**/*.sass'],
        tasks: ['compass'],
        options: {
          livereload: true,
          spawn: false
        },
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ftp-deploy');

  grunt.registerTask('default', ['connect', 'compass', 'watch']);
  grunt.registerTask('build', ['compass', 'jshint', 'uglify']);
};