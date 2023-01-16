const checkCache = (enteredNm?: string) => {
  const key = process.env.REACT_APP_LOCALSTORAGE_KEY;
  const cache = localStorage.getItem(key!);

  if (typeof cache === 'string') {
    const now = new Date().getTime();
    const isExpired = now > JSON.parse(cache).exp;

    if (isExpired) localStorage.removeItem(key!);

    if (JSON.parse(cache).text === enteredNm) return JSON.parse(cache).names;
  }
};

export default checkCache;
