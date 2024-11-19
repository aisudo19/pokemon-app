import './App.css';
import { useEffect, useState } from 'react';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import Card from './components/Card';
import Navbar from './components/Navbar/Navbar';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon/";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState('');
  const [prevURL, setPrevURL] = useState('');

  useEffect(() => {
    const fetchPokemonData = async () => {
      let res = await getAllPokemon(initialURL);
      loadPokemon(res.results);
      setLoading(false);
      setNextURL(res.next);
      setPrevURL(res.previous);
    }
    fetchPokemonData();
  }, [])
  //useEffectの第二引数に空の配列を渡すことで、初回レンダリング時のみ実行される

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    )
    setPokemonData(_pokemonData);
  }

  const handlePrevPage = async () => {
    if(!prevURL) return;
    setLoading(true);
    let res = await getAllPokemon(prevURL);
    console.log("next, prev: ",res.next, res.previous)
    setPrevURL(res.previous);
    setNextURL(res.next);
    loadPokemon(res.results);
    setLoading(false);
  }

  const handleNextPage = async () => {
    if(!nextURL) return;
    setLoading(true);
    let res = await getAllPokemon(nextURL);
    setNextURL(res.next);
    setPrevURL(res.previous);
    loadPokemon(res.results);
    setLoading(false);
  }

  return (
    <>
      <Navbar/>
      <div className="App">
        {loading ? (
          <h1>ロード中・・・</h1>
        ): (
         <>
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon}/>
            })}
          </div>
          <div className="btn">
            <button onClick={handlePrevPage}>前へ</button>
            <button onClick={handleNextPage}>次へ</button>
          </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
