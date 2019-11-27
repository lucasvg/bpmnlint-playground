const {
	is
} = require('bpmnlint-utils');


/**
 * Rule that reports manual tasks being used.
 */
module.exports = function() {
	function check(node, reporter) {
		if (is(node, 'MessageFlow')) {
			let catchNode = node.targetRef;
			if (is(catchNode, 'StartEvent')) {
				let events = catchNode.eventDefinitions || [];
				if (
					!events.some(event => {
						is(event, 'MessageEventDefinition')
				}))
				{
					reporter.report(catchNode.id, 'Start Event is not of type Message');
				}
			}
		}
	}

	return {
		check: check
	};
};