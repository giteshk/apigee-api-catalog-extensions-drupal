(function ($, Drupal) {
  Drupal.behaviors.smartdocs_sdk_generation = {
    attach: function (context, settings) {
      $("article.apidoc app-root", context).prepend("<div class='smartdocs-sdk-buttons text-right'><span class='field__label'>SDKs:</span> </div>");
      SDKGenerator.init(settings.smartdocsFieldFormatter.spec.openApiFiles[0].fileUrl, ".smartdocs-sdk-buttons", $('.page__title').text().toLowerCase(), context);
    }
  }
})(jQuery, Drupal);
