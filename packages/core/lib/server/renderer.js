"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderFullPage = void 0;
var react_helmet_1 = require("react-helmet");
var utils_1 = require("./utils");
var staticPath = (0, utils_1.resolveApp)('build/browser');
var template = (0, utils_1.readHtml)(staticPath);
function renderFullPage(markup, state) {
    var helmet = react_helmet_1.Helmet.renderStatic();
    var regexp = / data-react-helmet="true"/g;
    var html = helmet.htmlAttributes.toString().replace(regexp, ''), head = [
        helmet.title.toString().replace(regexp, ''),
        helmet.meta.toString().replace(regexp, ''),
        helmet.link.toString().replace(regexp, '')
    ].join(''), body = helmet.bodyAttributes.toString().replace(regexp, ''), script = helmet.script.toString().replace(regexp, '');
    return template
        .replace('<html', "<html " + html)
        .replace('</head>', head + "</head>")
        //.replace('</head>', `<style type="text/css" id="server-side-styles">${sheets.toString()}</style></head>`)
        .replace('<body', "<body " + body)
        .replace('<div id="root"></div>', "<div id=\"root\">" + markup + "</div>\n  <script>\n    window.__INITIAL_STATE__ = " + JSON.stringify(state).replace(/</g, '\\u003c') + "\n  </script>\n  ")
        .replace('</body>', script + "</body>");
}
exports.renderFullPage = renderFullPage;
