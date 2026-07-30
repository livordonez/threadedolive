"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId, studioUrl } from "./sanity/lib/env";
import { singletonActions, singletonTypes, structure } from "./sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Threaded Olive",
  projectId: projectId || "placeholder",
  dataset,
  basePath: studioUrl,
  plugins: [
    structureTool({
      structure,
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (previousTemplates) =>
      previousTemplates.filter(
        (template) => !singletonTypes.has(template.schemaType),
      ),
  },
  document: {
    actions: (previousActions, context) =>
      singletonTypes.has(context.schemaType)
        ? previousActions.filter(
            (action) => action.action && singletonActions.has(action.action),
          )
        : previousActions,
    newDocumentOptions: (previousOptions, context) =>
      context.creationContext.type === "global"
        ? previousOptions.filter(
            (option) => !singletonTypes.has(option.templateId),
          )
        : previousOptions,
  },
});
