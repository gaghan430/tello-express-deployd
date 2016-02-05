/* 
 * @Author: Dodik Gaghan
 * @Date:   2016-02-04 16:08:03
 * @Last Modified by:   Dodik Gaghan
 * @Last Modified time: 2016-02-04 16:17:35
 */

'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname);
var env = process.env.NODE_ENV || 'development';

var config = {
	development: {
		env: env,
		root: rootPath,
		app: {
			name: 'documents'
		},
		port: 3000,
		db: {
			host: 'localhost',
			port: 27017,
			name: 'mozzoo'
		}
	},

	test: {
		env: env,
		root: rootPath,
		app: {
			name: 'documents'
		},
		port: 3000,
		db: {
			host: 'localhost',
			port: 27017,
			name: 'mozzoo'
		}
	},

	production: {
		env: env,
		root: rootPath,
		app: {
			name: 'documents'
		},
		port: 3000,
		db: {
			host: 'localhost',
			port: 27017,
			name: 'mozzoo'
		}
	}
};

module.exports = config[env];