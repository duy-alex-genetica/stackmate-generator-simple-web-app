import { strings } from '@angular-devkit/core';
import { Rule, SchematicContext, Tree, apply, url, template, move, mergeWith, chain } from '@angular-devkit/schematics';

export function createPage(options: { name: string }): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const rawName = options.name;
    const name = strings.dasherize(rawName);
    const dasherize = strings.dasherize;
    const classify = strings.classify;

    const templateSource = apply(url('./files'), [
      template({ name, dasherize, classify }),
      move('.')
    ]);

    const updateStylesImport: Rule = (t, ctx) => {
      const path = 'styles/styles.scss';
      if (!t.exists(path)) {
        ctx.logger.warn(`⚠️ Styles file not found: ${path}`);
        return t;
      }
      const importLine = `@import "pages/${dasherize(name)}";`;
      const lines = t.read(path)!.toString('utf-8').split('\n');

      let idx = lines.findIndex(l => /^\/\/\s*Pages\b/i.test(l));
      if (idx === -1) idx = lines.length;
      else {
        idx++;
        while (idx < lines.length && /^\s*@import/.test(lines[idx])) {
          idx++;
        }
      }

      if (!lines.includes(importLine)) {
        lines.splice(idx, 0, importLine);
        t.overwrite(path, lines.join('\n'));
        ctx.logger.info(`✅ Inserted import into ${path} at line ${idx + 1}`);
      } else {
        ctx.logger.info(`ℹ️ Import already exists in ${path}`);
      }
      return t;
    };

    return chain([
      mergeWith(templateSource),
      updateStylesImport
    ])(tree, _context);
  };
}
