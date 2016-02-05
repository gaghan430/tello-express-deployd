/* 
* @Author: Dodik Gaghan
* @Date:   2016-02-05 10:57:36
* @Last Modified by:   Dodik Gaghan
* @Last Modified time: 2016-02-05 10:59:08
*/

module.exports = function(app) {
	var Ctrl = app.controllers;
	app.get('/', Ctrl.Home.index);
};