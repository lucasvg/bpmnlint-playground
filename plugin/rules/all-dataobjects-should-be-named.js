const { is } = require('bpmnlint-utils');

/**
 * Best practices: All Data Objects should be named
 */
module.exports = () => {
	function check(node, reporter) {
		if (is(node, 'DataObjectReference')) {
			if (!node.name) {
				reporter.report(node.id, 'All Data Objects should be named');
			}
		}
	}
	return {
		check
	};
};
