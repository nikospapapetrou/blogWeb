const dictionaries = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  el: () => import("../dictionaries/el.json").then((module) => module.default),
};

export const getDictionary = async (locale) => dictionaries[locale]();
