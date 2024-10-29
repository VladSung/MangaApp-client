// @ts-check
/** @type {import('eslint').Rule.RuleModule} */

module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'Enforce that components have only one direct text child',
        },
        schema: [], // No options
    },

    create: function (context) {
        return {
            JSXElement(node) {
                const children = node.children;

                // Filter out non-text children (JSXElement and JSXFragment)
                const textChildren = children.filter(
                    (child) => child.type === 'JSXText' && child.value.trim() !== ''
                );

                // Check if there's a JSXElement or JSXFragment
                const hasElementChildren = children.some(
                    (child) => child.type === 'JSXElement' || child.type === 'JSXFragment'
                );

                // Only report if there are multiple text children and no other elements
                if (textChildren.length > 1 && !hasElementChildren) {
                    context.report({
                        node,
                        message: 'Components should have only one direct text child.',
                    });
                }
            },
        };
    },
};
