const {
    is
  } = require('bpmnlint-utils');

  /**
   * B10
   * It is highly recommended that the activities’ names be unique. 
   * If it is required an activityto be reused in a process, 
   * aGlobal Activityshould be used instead [Sil09].
   */
  module.exports = function() {
    function check(node, reporter) {
      const flowElements = node.flowElements || [];

      if (flowElements.length > 0) {
        let hasDuplicate = false;
        flowElements.forEach((elem, elemIndex) => {
          hasDuplicate = flowElements.some((elem1, elem1Index) => {
            if (elemIndex !== elem1Index) {
              return (
                elem1.name !== undefined && elem1.name === elem.name
              );
            }
          });
          if (hasDuplicate) {
            reporter.report(elem.id, 'Two with same name');
          }
        });
      }
    }

    return {
        check: check
    };
  };