module.exports = {
	configs: {
		recommended: {
			rules: {
				'playground/target-namespace': 'error'
			}
		},
		all: {
			rules: {
				'playground/target-namespace': 'warn',
				'playground/no-manual-task': 'warn',
				'playground/exclusive-gateways-should-be-named-with-interrogative-sentences': 'warn',
				'playground/all-dataobjects-should-be-named': 'warn',
				'playground/end-event-outgoing': 'error',
				'playground/activities-with-samename': 'warn',
				'playground/message-flows-to-message-start': 'warn',
				'playground/no-incoming-outgoing-flows': 'error'
			}
		}
	}
};
