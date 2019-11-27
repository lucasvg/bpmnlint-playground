const { is } = require('bpmnlint-utils');

/**
 * Best practices: Exclusive Gateways should be named with an interrogative phrase
 */
module.exports = function() {
	function check(node, reporter) {
		if (is(node, 'ExclusiveGateway')) {
			let { name } = node;
			if (name && name[name.length - 1] !== '?') {
				reporter.report(
					node.id,
					'You should name diverging Exclusive Gateways with an interrogative phrase'
				);
			}
		}
	}

	return {
		check
	};
};
