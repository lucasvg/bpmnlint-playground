const {
    is
  } = require('bpmnlint-utils');
  
  
  /**
   * B2
   * The end event indicates where a process will end. 
   * In terms of sequence flows, the EndEvent ends the flow of the process, 
   * and thus, will not have any outgoing sequence flows[BPM11, page 249].
   */
  module.exports = function() {
  
    function check(node, reporter) {
  
      const flowElements = node.flowElements || [];
  
      flowElements.forEach(function(flowElement) {

        if (is(flowElement, 'bpmn:EndEvent')) {
            var outgoing = flowElement.outgoing || [];
            if (outgoing != []){
                reporter.report(flowElement.id, 'Outgoing Sequence Flow not allowed in an End Event event must be blank');
            }
        }
      });

    }
  
    return {
      check
    };
  
  };