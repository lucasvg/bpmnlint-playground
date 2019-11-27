const {
	is
} = require('bpmnlint-utils');


/**
 * Rule that reports manual tasks being used.
 */
module.exports = function() {
	function check(node, reporter) {
		if (is(node, 'Process') || is(node, 'SubProcess')) {
			let flowElements = node.flowElements || [];
			let wrongElements = [];
			let foundStartOrEnd = false;

			console.log(flowElements[0]);
			for (let flowElement of flowElements){
				if (is(flowElement, 'StartEvent') || is(flowElement, 'EndEvent')){
					foundStartOrEnd = true;
				}
			}

			if (foundStartOrEnd) {
				for (let flowElement of flowElements){
					let passCondition = (is(flowElement, 'Task') && flowElement.isForCompensation)
									  || (is(flowElement, 'SubProcess') && flowElement.triggeredByEvent);

					let wrongCondition = is(flowElement, 'Task')
									  || is(flowElement, 'SendTask')
									  || is(flowElement, 'UserTask')
									  || is(flowElement, 'ManualTask')
									  || is(flowElement, 'ServiceTask')
									  || is(flowElement, 'ScriptTask')
									  || is(flowElement, 'ReceiveTask')
									  || is(flowElement, 'BusinessRuleTask')
									  || is(flowElement, 'CallActivityTask')
									  || is(flowElement, 'SubProcess')
									  || is(flowElement, 'ExclusiveGateway')
									  || is(flowElement, 'ParallelGateway')
									  || is(flowElement, 'InclusiveGateway')
									  || is(flowElement, 'ComplexGateway')
									  || is(flowElement, 'EventBasedGateway');


					if (!passCondition && wrongCondition){
						console.log(node);
						let incoming = flowElement.incoming || [];
						let outgoing = flowElement.outgoing || [];
						
						if (incoming.length * outgoing.length === 0){
							wrongElements.push(flowElement);
						}
					}
				}

				for (let wrongElement of wrongElements){
					reporter.report(wrongElement.id, "Element doesn't have incoming/outcoming sequence flows");
				}
			}
		}
	}

	return {
		check: check
	};
};