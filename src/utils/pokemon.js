export const getAllPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
    .then((res) => res.json())
    .then((data) => resolve(data));
  });
};

//resolve 成功時に呼び出される関数
//reject 失敗時に呼び出される関数
//fetchでurlを取得し、json形式に変換してresolve関数を呼び出す
//APIからデータを取得するのは時間がかかるので、Promiseを使って非同期処理を行う

export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
  fetch(url)
  .then((res) => res.json())
  .then((data) => {
      console.log(data);
      resolve(data);
    });
  });
};
