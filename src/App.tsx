import React, { Component } from 'react';
import Producer from './components/Work/Producer';
import helpers from './helpers';
import './App.css';

interface producer {
  key: number,
  name: string,
  work_count: number,
  prod: number,
  price: number,
}

interface IState {
  neuron_count: number;
  neuron_prod: number;
  producers: [producer, producer, producer, producer, producer, producer, producer],
}

class App extends Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.add_neuron = this.add_neuron.bind(this);
  };

  public readonly state: Readonly<IState> = {
    neuron_count: 0,
    neuron_prod: 0,
    producers: [
      { key: 0, name: 'Work', work_count: 0, prod: 1, price: 2 },
      { key: 1, name: 'Book', work_count: 0, prod: 16, price: 42 },
      { key: 2, name: 'Youtube video', work_count: 0, prod: 32, price: 101 },
      { key: 3, name: 'Github and Stack Overflow', work_count: 0, prod: 375, price: 4004 },
      { key: 4, name: 'Attend to a Flat earther conference', work_count: 0, prod: 3600, price: 84000 },
      { key: 5, name: 'Using Google', work_count: 0, prod: 400413, price: 1040404 },
      { key: 6, name: 'Cerebral chip', work_count: 0, prod: 5120000, price: 36021666 },
    ]
  };

  private add_neuron() {
    this.setState(state => ({
      neuron_count: state.neuron_count + 1,
    }))
  };

  private add_work(id: number, price: number, prod: number) {
    this.state.producers.map(p => p.key === id ? p.work_count += 1 : p.work_count);
    this.setState(state => ({
      neuron_count: state.neuron_count - price,
      neuron_prod: this.state.neuron_prod + prod,
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
    const { neuron_count, neuron_prod } = this.state;
    const producers_list = this.state.producers.map((p) =>
      <Producer key={ p.key } id={ p.key } name={ p.name } neuron_count={ neuron_count } work_count={ p.work_count } add_work={ this.add_work.bind(this) } prod={p.prod} price={p.price} />
    )

    return (
      <div className="App">
        <div>
        <div>
          <div>{ helpers.numberWithCommas(neuron_count) } neurons</div>
          <div>{ helpers.numberWithCommas(neuron_prod) } per second</div>
          <h1 onClick={ this.add_neuron } className='brain noselect'>BRAIN</h1>
        </div>
        <div>
          <div></div>
          {producers_list}
        </div>
      </div>
      </div>
    );
  }
}

export default App;
