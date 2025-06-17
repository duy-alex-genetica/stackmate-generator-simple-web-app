import { strings } from '@angular-devkit/core';
import { Rule, SchematicContext, Tree, apply, url, move, mergeWith, chain, template } from '@angular-devkit/schematics';

/**
 * Schematic to generate a reusable UI component and its styles.
 * Structure:
 * - Component: packages/frontend/components/ui/<name>.tsx
 * - Style: styles/components/<name>.scss
 */

function updateStyles(options: any): Rule {
  const name = options.name;

  return (host: Tree, ctx: SchematicContext) => {
    const stylePath = 'styles/styles.scss';
    if (!host.exists(stylePath)) {
      ctx.logger.warn(`⚠️ Styles file not found: ${stylePath}`);
      return host;
    }

    const importLine = `@import "components/${name}";`;
    const lines     = host.read(stylePath)!.toString('utf-8').split('\n');

    // find the "// Components" marker or append at end:
    let idx = lines.findIndex(line => /^\/\/\s*Components\b/i.test(line));
    if (idx === -1) {
      idx = lines.length;
    } else {
      idx++;
      while (idx < lines.length && /^\s*@import/.test(lines[idx])) {
        idx++;
      }
    }

    if (!lines.includes(importLine)) {
      lines.splice(idx, 0, importLine);
      host.overwrite(stylePath, lines.join('\n'));
      ctx.logger.info(`✅ Inserted import into ${stylePath} at line ${idx + 1}`);
    } else {
      ctx.logger.info(`ℹ️ Import already exists in ${stylePath}`);
    }

    return host;
  };
}

export function createComponent(options: { name: string }): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const rawName = options.name;
    const dasherize = strings.dasherize;
    const classify = strings.classify;
    const name = dasherize(rawName);
    const className = classify(rawName);

    context.logger.info(`✨ Generating component: ${name}`);

    const templateSource = apply(url('./files'), [
      template({ name, dasherize, classify  }),
      move('.')
    ]);

    return chain([
      mergeWith(templateSource),
      updateStyles(options)
    ])(tree, context);
  };
}
