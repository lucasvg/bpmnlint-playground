const {
  is
} = require('bpmnlint-utils');


/**
 * Rule that reports when a conditional flow has less than one outgoing paths.
 */
module.exports = function() {

  function check(node, reporter) {
    if (is(node, 'EventBasedGateway')) {
        var outgoing = node.outgoing || [];
        var targets = outgoing.map(i => i.targetRef);
        var hasTimer = targets.some(i => is(i, 'IntermediateCatchEvent') && i.eventDefinitions.some( 
            a => is(a, 'TimerEventDefinition')
        ));

        if(!hasTimer) reporter.report(node.id, 'Missing a Timer Event on Event Based Gateway');
    }
  }

  return {
    check: check
  };
};
