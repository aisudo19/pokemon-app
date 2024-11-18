import './App.css';
import { useEffect, useState } from 'react';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import Card from './components/Card';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon/";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      let res = await getAllPokemon(initialURL);
      loadPokemon(res.results);
      setLoading(false);
    }
    fetchPokemonData();
  }, [])
  //useEffectの第二引数に空の配列を渡すことで、初回レンダリング時のみ実行される

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // console.log(pokemon);
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    )
    setPokemonData(_pokemonData);
  }
  // console.log(pokemonData);

  return (
    <div className="App">
      {loading ? (
        <h1>ロード中・・・</h1>
      ): (
        <div className="pokemonCardContainer">
          {pokemonData.map((pokemon, i) => {
            return <Card key={i} pokemon={pokemon}/>
          })}
        </div>
      )}
    </div>
  );
}

export default App;
