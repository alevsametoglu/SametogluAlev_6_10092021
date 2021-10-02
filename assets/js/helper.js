export default class Helper {
  static getSearchParams() {
    const searchText = window.location.search.replace("?", "");
    const searchParamArray = searchText.split("&");
    const searchParams = {};

    searchParamArray.forEach((param) => {
      const [key, value] = param.split("=");
      if (!!key && !!value) searchParams[key] = value;
    });

    return searchParams;
  }
}
