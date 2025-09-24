import React, {Component} from 'react';
import './style.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      seconds: 0,
      ativo: null
    }
  }

  fomatTimer(seconds){
    const intSeconds = Math.floor(seconds);

    // parte decimal (frações de segundo, 2 casas)
    const decimals = Math.floor((seconds - intSeconds) * 100)
    .toString()
    .padStart(2, '0');

    const getSeconds = String(intSeconds % 60).padStart(2, '0');
    const getMinutes = String(Math.floor(intSeconds / 60) % 60).padStart(2, '0');
    const getHours = String(Math.floor(intSeconds / 3600)).padStart(2, '0');

    return `${getHours}:${getMinutes}:${getSeconds}.${decimals}`;
  }

  iniciar = () => {
    if(this.state.ativo !== null) return;

    this.setState({ativo: setInterval(() => {
      this.setState({seconds: this.state.seconds + 0.01});
    }, 10)});
  }

  parar = () => {
    if(this.state.ativo === null) return;

    clearInterval(this.state.ativo);
    this.setState({ativo: null});
  }

  limpar = () => {
    this.parar();
    this.setState({seconds: 0});
  }

  render(){
    return(
      <div className='container'>
        <img src = {require('./assets/cronometro.png')} className='img'/>
        <a className='timer'>{this.fomatTimer(this.state.seconds)}</a>
        <div className='container-button'>
          <button className='botao' onClick={this.iniciar}>Iniciar</button>
          <button className='botao' onClick={this.parar}>Parar</button>
          <button className='botao' onClick={this.limpar}>Resetar</button> 
        </div>
      </div>
    );
  }
}

export default App;
