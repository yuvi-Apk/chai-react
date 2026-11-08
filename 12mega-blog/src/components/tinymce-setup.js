// Self-hosted TinyMCE (GPL) bundled into the app, so no Tiny Cloud API key is needed.
// Importing these files registers tinymce, its theme, skins and plugins on window.tinymce,
// which <Editor> from @tinymce/tinymce-react picks up automatically.
import "tinymce/tinymce";
import "tinymce/models/dom/model";
import "tinymce/themes/silver";
import "tinymce/icons/default";

// Skins (UI + content) — dark theme
import "tinymce/skins/ui/oxide-dark/skin.js";
import "tinymce/skins/ui/oxide-dark/content.js";
import "tinymce/skins/content/dark/content.js";

// Plugins used in RTE.jsx
import "tinymce/plugins/advlist";
import "tinymce/plugins/autolink";
import "tinymce/plugins/lists";
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/charmap";
import "tinymce/plugins/preview";
import "tinymce/plugins/anchor";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/code";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/media";
import "tinymce/plugins/table";
import "tinymce/plugins/help";
import "tinymce/plugins/help/js/i18n/keynav/en.js";
import "tinymce/plugins/wordcount";
