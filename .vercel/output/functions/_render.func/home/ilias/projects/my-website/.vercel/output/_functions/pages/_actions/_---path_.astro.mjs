import { h as hasContentType, f as formContentTypes } from '../../chunks/utils_DjK6_1cM.mjs';
import { getAction } from '../../chunks/get-action_DHq2hZ7F.mjs';
import { s as serializeActionResult } from '../../chunks/shared_BeRyZHeE.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async (context) => {
  const { request, url } = context;
  const baseAction = await getAction(url.pathname);
  if (!baseAction) {
    return new Response(null, { status: 404 });
  }
  const contentType = request.headers.get("Content-Type");
  const contentLength = request.headers.get("Content-Length");
  let args;
  if (!contentType || contentLength === "0") {
    args = void 0;
  } else if (contentType && hasContentType(contentType, formContentTypes)) {
    args = await request.clone().formData();
  } else if (contentType && hasContentType(contentType, ["application/json"])) {
    args = await request.clone().json();
  } else {
    return new Response(null, { status: 415 });
  }
  const action = baseAction.bind(context);
  const result = await action(args);
  const serialized = serializeActionResult(result);
  if (serialized.type === "empty") {
    return new Response(null, {
      status: serialized.status
    });
  }
  return new Response(serialized.body, {
    status: serialized.status,
    headers: {
      "Content-Type": serialized.contentType
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
