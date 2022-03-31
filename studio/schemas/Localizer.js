import appConfig from "../../app.config.json";

const supportedLanguages = appConfig.locales;

// [
//   { id: "de_DE", title: "Deutsch", isDefault: true },
//   { id: "da_DK", title: "Dansk" },
//   { id: "en_US", title: "English" },
// ];

const getLocalizer = () => {
  const items = [];

  const localize = (defaultField) => {
    items.push(defaultField);
    return Object.entries(supportedLanguages).map(([key, lang]) => {
      if (lang.isDefault) {
        return defaultField;
      }

      return {
        ...defaultField,
        name: `${defaultField.name}_${key}`,
        title: `${lang.flag} ${defaultField.title} ${lang.title}`,
        fieldset: `${defaultField.name}translations`,
      };
    });
  };

  const getFieldSets = () => {
    return items.map((item) => {
      return {
        title: `${item.title} Translations`,
        name: `${item.name}translations`,
        options: { collapsible: true },
      };
    });
  };
  return { localize, getFieldSets };
};

export const withLocalization = (doc) => {
  const { localize, getFieldSets } = getLocalizer();
  const newDoc = {
    ...doc,

    fields: doc.fields.reduce((acc, field) => {
      if (field.localize) {
        return [...acc, ...localize(field)];
      }
      return [...acc, field];
    }, []),
  };

  (newDoc.fieldsets = doc.fieldsets
    ? [...doc.fieldsets, ...getFieldSets()]
    : [...getFieldSets()]),
    getFieldSets();

  return newDoc;
};
