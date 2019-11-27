const {
  is
} = require('bpmnlint-utils');


/**
 * Rule that reports when a conditional flow has less than one outgoing paths.
 */
module.exports = function() {

  function check(node, reporter) {
    if (is(node, 'SequenceFlow') && node.conditionExpression) {
      var outgoingFlows = node.sourceRef.outgoing || [];
      if(outgoingFlows.length < 2)
        reporter.report(node.id, 'Missing alternative sequence flow for conditional flow.');
    }
  }

  return {
    check: check
  };
};
