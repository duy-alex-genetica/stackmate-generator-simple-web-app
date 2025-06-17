import { strings } from '@angular-devkit/core';
import { Rule, SchematicContext, Tree, chain } from '@angular-devkit/schematics';
import fs from "fs-extra";
import * as yaml from "yaml";
import { YAMLMap, parseDocument } from "yaml";
import { yamlGet } from "../../_utils/yaml";
import { AddEnvContext } from "../../types";

const injectEnvToDeployment = (
  {
    name,
    type = 'private',
  }: {
    name: string;
    type?: 'private' | 'public';
  }, namespaces: string[]): Rule => {
  return (tree: Tree, context: SchematicContext) => {
    const deploymentDir = `packages/deployment`;

    // 1. Update .env.template
    const tplPath = `${deploymentDir}/.env.template`;
    const prefix = type === 'public' ? 'NEXT_PUBLIC_' : '';

    if (tree.exists(tplPath)) {
      let content = tree.read(tplPath)!.toString('utf-8');

      namespaces.forEach(ns => {
        const namespace = ns.toUpperCase();
        const entry = `${namespace}_${prefix}${name}=`;

        if (!content.includes(entry)) {
          content += `\n${entry}`;
          context.logger.info(`✅ Added ${entry} to ${tplPath}`);
        } else {
          context.logger.info(`ℹ️ ${entry} already exists in ${tplPath}`);
        }
      });
      tree.overwrite(tplPath, content + '\n');
    } else {
      context.logger.warn(`⚠️ ${tplPath} not found`);
    }

    // 2. Update docker-compose.yml
    const composePath = `${deploymentDir}/docker-compose.yml`;
    if (tree.exists(composePath)) {
      const raw = tree.read(composePath)!.toString('utf-8');
      const doc: any = parseDocument(raw);


      namespaces.forEach(ns => {
        const namespace = ns.toUpperCase();
        const serviceEnvs = yamlGet(doc, "services.frontend.environment") as YAMLMap;
        const varEntry = `${prefix}${name}=\${${namespace}_${prefix}${name}}`;

        // set if not exists
        if (!serviceEnvs.has(varEntry)) {
          serviceEnvs.set(varEntry, '');
          context.logger.info(`✅ Added ${varEntry} to ${composePath}`);
        } else {
          context.logger.info(`ℹ️ ${varEntry} already exists in ${composePath}`);
        }
      });

      const newYaml = yaml.stringify(doc);

      tree.overwrite(composePath, newYaml);
    } else {
      context.logger.warn(`⚠️ ${composePath} not found`);
    }


    return tree;
  };
}

const injectEnvToFrontend = (
  {
    name,
    type = 'private',
  }: {
    name: string;
    type?: 'private' | 'public';
  }, namespaces: string[]): Rule => {
  return (tree: Tree, context: SchematicContext) => {
    // Update for all namespaces
    const prefix = type === 'public' ? 'NEXT_PUBLIC_' : '';

    namespaces.forEach((target) => {
      const pkgPath = `packages/${target}`;

      // 1. .env.template
      const envTemplatePath = `${pkgPath}/.env.template`;
      const envPath = `${pkgPath}/.env`;

      // Update for .env and .env.template
      [envTemplatePath, envPath].forEach(path => {
        if (!fs.existsSync(path)) {
          context.logger.warn(`⚠️ Missing ${path} at ${path}`);
          return;
        }

        const content = tree.read(path)!.toString('utf-8');

        const newEnvEntry = `${prefix}${name}=`;

        context.logger.info(`✅ Added ${newEnvEntry} to ${path}`);

        tree.overwrite(path, `${content}\n${newEnvEntry}`);
      })
    });
    return tree;
  };
};

export function addEnv(options: AddEnvContext): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const rawName = options.envName;
    const type = options.envType || 'private';
    const decamelize = strings.decamelize;

    const formattedName = decamelize(rawName).toUpperCase();

    context.logger.info(`✨ Add env: ${formattedName}`);

    const chainRules = []

    // Find package deployment under packages
    const deploymentPath = `packages/deployment`;
    const frontendPath = `packages/frontend`;
    const websitePath = `packages/website`;

    const hasDeployment = fs.existsSync(deploymentPath);
    const hasFrontend = fs.existsSync(frontendPath);
    const hasWebsite = fs.existsSync(websitePath);

    if (hasDeployment) {
      context.logger.info(`✅ Deployment path found: ${deploymentPath}`);
      chainRules.push(injectEnvToDeployment({
        name: formattedName,
        type,
      }, [
        hasFrontend ? 'frontend' : '',
        hasWebsite ? 'website' : '',
      ].filter(Boolean)));
    }

    if (hasFrontend) {
      context.logger.info(`✅ Frontend path found: ${frontendPath}`);
      chainRules.push(injectEnvToFrontend({
        name: formattedName,
        type,
      }, ['frontend']));
    }

    if (hasWebsite) {
      context.logger.info(`✅ Website path found: ${websitePath}`);
      chainRules.push(injectEnvToFrontend({
        name: formattedName,
        type,
      }, ['website']));
    }

    return chain(chainRules)(tree, context);
  };
}
