import { KeyboardEvent, useState } from "react";
import styles from "./styles.module.css";
import SearchIcon from './searchIcon.svg';
import { useAppContext } from "@/contexts/app";
type Props ={
  onSearch: (searchValue:string) => void;
}
export const SearchInput = ({ onSearch}:Props) => {
  const {liga} = useAppContext();
  const [focused, setFocused] = useState(false);  
  const[searchValue, setSeachValue] = useState('');
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter'){
      onSearch(searchValue);
    }
  }
  return (
    <div className={styles.container} style={{borderColor: focused ? liga?.mainColor:'#FFF'}}>
      <div 
      className={styles.button}
      onClick={() => onSearch(searchValue)}
      >
        <SearchIcon color={liga?.mainColor}/>
      </div>
      <input
        type="text"
        className={styles.input}
        placeholder="Buscar"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyUp={handleKeyUp}
        value={searchValue}
        onChange={(e) => setSeachValue(e.target.value)}
      />
    </div>
  );
};
