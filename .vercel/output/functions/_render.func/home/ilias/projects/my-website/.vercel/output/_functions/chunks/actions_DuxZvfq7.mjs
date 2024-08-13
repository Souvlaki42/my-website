import { c as callSafely, A as ActionError, a as ActionInputError, g as getActionQueryString, b as ACTION_QUERY_PARAMS } from './shared_BeRyZHeE.mjs';
import { g as getCollection, a as getEntry } from './_astro_content_tDVG2pza.mjs';
import { z } from 'zod';
import { A as AstroError, g as ActionCalledFromServerError } from './astro/assets-service_D4XaVjzb.mjs';

function defineAction({
  accept,
  input: inputSchema,
  handler
}) {
  const serverHandler = accept === "form" ? getFormServerHandler(handler, inputSchema) : getJsonServerHandler(handler, inputSchema);
  async function safeServerHandler(unparsedInput) {
    if (typeof this === "function") {
      throw new AstroError(ActionCalledFromServerError);
    }
    return callSafely(() => serverHandler(unparsedInput, this));
  }
  Object.assign(safeServerHandler, {
    orThrow(unparsedInput) {
      if (typeof this === "function") {
        throw new AstroError(ActionCalledFromServerError);
      }
      return serverHandler(unparsedInput, this);
    }
  });
  return safeServerHandler;
}
function getFormServerHandler(handler, inputSchema) {
  return async (unparsedInput, context) => {
    if (!(unparsedInput instanceof FormData)) {
      throw new ActionError({
        code: "UNSUPPORTED_MEDIA_TYPE",
        message: "This action only accepts FormData."
      });
    }
    if (!(inputSchema instanceof z.ZodObject)) return await handler(unparsedInput, context);
    const parsed = await inputSchema.safeParseAsync(formDataToObject(unparsedInput, inputSchema));
    if (!parsed.success) {
      throw new ActionInputError(parsed.error.issues);
    }
    return await handler(parsed.data, context);
  };
}
function getJsonServerHandler(handler, inputSchema) {
  return async (unparsedInput, context) => {
    if (unparsedInput instanceof FormData) {
      throw new ActionError({
        code: "UNSUPPORTED_MEDIA_TYPE",
        message: "This action only accepts JSON."
      });
    }
    if (!inputSchema) return await handler(unparsedInput, context);
    const parsed = await inputSchema.safeParseAsync(unparsedInput);
    if (!parsed.success) {
      throw new ActionInputError(parsed.error.issues);
    }
    return await handler(parsed.data, context);
  };
}
function formDataToObject(formData, schema) {
  const obj = {};
  for (const [key, baseValidator] of Object.entries(schema.shape)) {
    let validator = baseValidator;
    while (validator instanceof z.ZodOptional || validator instanceof z.ZodNullable) {
      validator = validator._def.innerType;
    }
    if (validator instanceof z.ZodBoolean) {
      obj[key] = formData.has(key);
    } else if (validator instanceof z.ZodArray) {
      obj[key] = handleFormDataGetAll(key, formData, validator);
    } else {
      obj[key] = handleFormDataGet(key, formData, validator, baseValidator);
    }
  }
  return obj;
}
function handleFormDataGetAll(key, formData, validator) {
  const entries = Array.from(formData.getAll(key));
  const elementValidator = validator._def.type;
  if (elementValidator instanceof z.ZodNumber) {
    return entries.map(Number);
  } else if (elementValidator instanceof z.ZodBoolean) {
    return entries.map(Boolean);
  }
  return entries;
}
function handleFormDataGet(key, formData, validator, baseValidator) {
  const value = formData.get(key);
  if (!value) {
    return baseValidator instanceof z.ZodOptional ? void 0 : null;
  }
  return validator instanceof z.ZodNumber ? Number(value) : value;
}

function toActionProxy(actionCallback = {}, aggregatedPath = "") {
  return new Proxy(actionCallback, {
    get(target, objKey) {
      if (objKey in target || typeof objKey === "symbol") {
        return target[objKey];
      }
      const path = aggregatedPath + objKey.toString();
      function action(param) {
        return handleAction(param, path, this);
      }
      Object.assign(action, {
        queryString: getActionQueryString(path),
        toString: () => action.queryString,
        // Progressive enhancement info for React.
        $$FORM_ACTION: function() {
          const searchParams = new URLSearchParams(action.toString());
          searchParams.set(ACTION_QUERY_PARAMS.actionRedirect, "false");
          return {
            method: "POST",
            // `name` creates a hidden input.
            // It's unused by Astro, but we can't turn this off.
            // At least use a name that won't conflict with a user's formData.
            name: "_astroAction",
            action: "?" + searchParams.toString()
          };
        },
        // Note: `orThrow` does not have progressive enhancement info.
        // If you want to throw exceptions,
        //  you must handle those exceptions with client JS.
        async orThrow(param) {
          const { data, error } = await handleAction(param, path, this);
          if (error) throw error;
          return data;
        }
      });
      return toActionProxy(action, path + ".");
    }
  });
}
async function handleAction(param, path, context) {
  {
    const { getAction } = await import('./get-action_DHq2hZ7F.mjs');
    const action = await getAction(path);
    if (!action) throw new Error(`Action not found: ${path}`);
    return action.bind(context)(param);
  }
}
toActionProxy();

const server = {
  getPosts: defineAction({
    accept: "json",
    input: z.object({
      searchQuery: z.string().optional(),
      page: z.number().default(0),
      perPage: z.number().default(12)
    }),
    handler: async (input) => {
      const { searchQuery, page, perPage } = input;
      let posts = await getCollection("blog");
      posts = posts.sort((a, b) => {
        return new Date(b.data.modifiedDate).getTime() - new Date(a.data.modifiedDate).getTime();
      });
      if (page === 0) {
        return { posts, hasNext: void 0, hasPrevious: void 0 };
      } else if (page > 0) {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const entries = posts.slice(start, end);
        return {
          posts: entries,
          hasNext: end < posts.length,
          hasPrevious: start > 0
        };
      } else {
        throw new Error(
          "Something went wrong. Page should be greater or equal to 0."
        );
      }
    }
  }),
  getPost: defineAction({
    accept: "json",
    input: z.object({ slug: z.string().min(1, "Slug is required!") }),
    handler: async (input) => {
      const post = await getEntry("blog", input.slug);
      return post;
    }
  })
};

export { server as s };
