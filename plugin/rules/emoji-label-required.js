const {
  isAny
} = require('bpmnlint-utils');

const emojiRegex = require('emoji-regex');

/**
 * Detect and report missing emojis in element names.
 */
module.exports = function() {

  function check(node, reporter) {
    if (isAny(node, [
      'bpmn:FlowNode',
      'bpmn:SequenceFlow',
      'bpmn:Participant',
      'bpmn:Lane'
    ])) {

      const name = (node.name || '').trim();

      if (!emojiRegex().test(name)) {
        reporter.report(node.id, 'Element must have an emoji');
      }
    }
  }

  return {
    check
  };
};