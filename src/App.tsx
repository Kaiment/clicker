import React, { Component } from 'react';
import Work from './components/Work/Work';
import './App.css';

interface IState {
  neuron_count: number;
  neuron_prod: number;
  work_count: number;
}

class App extends Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.add_neuron = this.add_neuron.bind(this);
  };

  public readonly state: Readonly<IState> = {
    neuron_count: 0,
    neuron_prod: 0,
    work_count: 0,
  };

  private add_neuron() {
    this.setState(state => ({
      neuron_count: state.neuron_count + 1,
    }))
  };

  private add_work(price: number) {
    this.setState(state => ({
      work_count: state.work_count + 1,
      neuron_count: state.neuron_count - price,
      neuron_prod: this.state.neuron_prod + 1,
    }))
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(state => ({
        neuron_count: state.neuron_count + state.neuron_prod,
      }))
    }, 1000);
  }

  render() {
    const { neuron_count, neuron_prod, work_count } = this.state;

    return (
      <div className="App">
        <div>
        <div>
          <div>{ neuron_count } neurons</div>
          <div>{ neuron_prod } per second</div>
          <h1 onClick={ this.add_neuron }>BRAIN</h1>
        </div>
        <div>
          <Work neuron_count={ neuron_count } work_count={ work_count } add_work={ this.add_work.bind(this) } />
        </div>
      </div>
      </div>
    );
  }
}

export default App;
