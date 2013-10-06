define(['jquery', 'twig'], function ($, twig) {
  var twigTemplates = {};

  return {
    get: function (templateName, object) {

      if (!twigTemplates[templateName]) {
        twigTemplates[templateName] = true
        twig.twig({
            id: templateName,
            href: 'templates/' + templateName + '.twig',
            async: false
        })
      }

      return twig.twig({ ref: templateName }).render(object);
    }
  }

});
