
module.exports = function(grunt) {

grunt.initConfig({

  uglify: {
    my_target: {
      files: {
        'dist/SQolytes.min.js': [
          'dist/SQolytes.js'
        ]
      }
    }
  },

  cssmin: {
    options: {
      mergeIntoShorthands: false,
      roundingPrecision: -1
    },
    target: {
      files: {
        'dist/SQolytes.min.css': [
          'app/SQolytes.css'
        ]
      }
    }
  },

  concat: {
    options: {
      separator: '',
    },
    blog : {
      src : [
        'app/module.js',
        'app/controllers/*.js',
        'app/directives/*.js',
        'app/services/*.js',
        'app/typologies/**/**/*.js',
      ],
      dest : 'dist/SQolytes.js'
    }

  },

  watch: {

    scripts: {
      files: [
        'app/**/**/*.js',
        '!app/dist/**/*.js'
      ],
      tasks: ['modificationJs']
    },
    styles: {
      files: [
        'app/**/*.css',
        '!app/dist/**/*.css'
      ],
      tasks: ['modificationCss']
    }

  },

});


grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');

/* If not installed !
npm install grunt-contrib-copy --save-dev &&
npm install grunt-contrib-concat --save-dev &&
npm install grunt-contrib-cssmin --save-dev &&
npm install grunt-contrib-uglify --save-dev &&
npm install grunt-contrib-watch --save-dev
*/

grunt.registerTask('modificationJs', ['concat']);
grunt.registerTask('modificationCss', ['cssmin']);
grunt.registerTask('buildDist', ['uglify']);

};
