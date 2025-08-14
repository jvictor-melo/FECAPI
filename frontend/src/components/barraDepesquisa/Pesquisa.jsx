import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import "./styles.css";

const SearchBar = ({
  endpoint,
  searchFields = [],
  placeholder = 'Pesquisar...',
  debounceTime = 500,
  onResults,
  onError,
  onLoading,
  additionalParams = {},
  inputClassName = '',
  containerClassName = '',
  showLoading = true
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Função para construir os parâmetros de busca
  const buildSearchParams = () => {
    const params = { ...additionalParams };
    
    if (searchTerm && searchFields.length > 0) {
      params.search = searchTerm;
      params.searchFields = searchFields.join(',');
    }
    
    return params;
  };

  // Função para buscar dados
  const fetchData = async () => {
    setIsLoading(true);
    if (onLoading) onLoading(true);
    
    try {
      const params = buildSearchParams();
      const response = await axios.get(endpoint, { params });
      
      if (onResults) {
        onResults(response.data);
      }
    } catch (error) {
      console.error('Erro na pesquisa:', error);
      if (onError) {
        onError(error);
      }
    } finally {
      setIsLoading(false);
      if (onLoading) onLoading(false);
    }
  };

  // Debounce para evitar muitas requisições
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className={`search-container ${containerClassName}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`search-input ${inputClassName}`}
        disabled={isLoading}
      />
      
      {showLoading && isLoading && (
        <span className="loading-indicator">Carregando...</span>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  endpoint: PropTypes.string.isRequired,
  searchFields: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
  debounceTime: PropTypes.number,
  onResults: PropTypes.func.isRequired,
  onError: PropTypes.func,
  onLoading: PropTypes.func,
  additionalParams: PropTypes.object,
  inputClassName: PropTypes.string,
  containerClassName: PropTypes.string,
  showLoading: PropTypes.bool
};

export default SearchBar;